import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

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

const gridOptions: GridOptions<IExpense> = {};

function ExpenseTable() {
  const gridRef = useRef<AgGridReact<IExpense>>(null);

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

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

  const [rowData, setRowData] = useState<IExpense[]>([
    {
      date: new Date(),
      category: "Food",
      description: "",
      amount: 90.0,
      note: "",
    },
    {
      date: new Date(),
      category: "Food",
      description: "",
      amount: 50.3,
      note: "",
    },
    {
      date: new Date(),
      category: "Food",
      description: "",
      amount: 20.45,
      note: "",
    },
  ]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: "Date", field: "date" },
    { headerName: "Category", field: "category" },
    { headerName: "Description", field: "description" },
    { headerName: "Amount", field: "amount" },
    { headerName: "Note", field: "note" },
    {
      headerName: "Price",
      field: "price",
    },
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
