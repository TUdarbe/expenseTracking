import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import database from "../util/Fbdatabase";
import { doc, getDocs, collection } from "firebase/firestore";

import {
  ColDef,
  ColGroupDef,
  GetRowIdFunc,
  GetRowIdParams,
  Grid,
  GridOptions,
  RowSelectedEvent,
  ValueFormatterParams,
} from "ag-grid-community";

interface IExpense {
  date: Date;
  category: any;
  description: string;
  amount: number;
  note: string;
}

interface Props {
  expenses: {
    date: Date;
    category: any;
    description: string;
    amount: number;
    note: string;
  };
}

const gridOptions: GridOptions<IExpense> = {};

function ExpenseTable() {
  const [rowData, setRowData] = useState<IExpense[]>([]);

  const gridRef = useRef<AgGridReact<IExpense>>(null);

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  useEffect(() => {
    const fetchData = async () => {
      const expenseData: IExpense[] = [];
      const querySnapshot = await getDocs(collection(database, "expenses"));

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.data());
        expenseData.push(doc.data() as IExpense);

        setRowData(expenseData);
      });
    };

    fetchData();
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      enableValue: true,
      sortable: true,
      resizable: true,

      flex: 1,
      minWidth: 100,
    };
  }, []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: "Date", field: "date" },
    { headerName: "Category", field: "category" },
    { headerName: "Description", field: "description" },
    { headerName: "Amount", field: "amount" },
    { headerName: "Note", field: "note" },
  ]);

  return (
    <div
      id="expenseGrid"
      className="ag-theme-alpine-dark"
      style={{ width: "100%" }}
    >
      <AgGridReact<IExpense>
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        defaultColDef={defaultColDef}
        domLayout={"autoHeight"}
        paginationPageSize={10}
      ></AgGridReact>
    </div>
  );
}

export default ExpenseTable;
