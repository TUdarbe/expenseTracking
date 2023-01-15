import { useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import database from "../util/Fbdatabase";
import {
  getDocs,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { ColDef } from "ag-grid-community";

interface IExpense {
  date: Date;
  category: any;
  description: string;
  amount: number;
  note: string;
}

interface Props {
  year: number;
  uid: string;
}

function ExpenseTable({ year, uid }: Props) {
  const [rowData, setRowData] = useState<IExpense[]>([]);

  const gridRef = useRef<AgGridReact<IExpense>>(null);

  const expensesRef = collection(database, "expenses");

  useEffect(() => {
    const q = query(
      expensesRef,
      where("year", "==", year),
      where("uid", "==", uid),
      orderBy("date", "desc")
    );

    onSnapshot(q, (querySnapshot) => {
      const expenseData: IExpense[] = [];

      querySnapshot.forEach((doc) => {
        expenseData.push(doc.data() as IExpense);

        setRowData(expenseData);
      });
    });
  }, [year]);

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
