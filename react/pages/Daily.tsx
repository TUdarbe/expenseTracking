import Header from "../components/Header";
import StackedBar from "../components/StackedBar";
import PieChart from "../components/PieChart";
import ColumnChart from "../components/ColumnChart";
import ExpenseTable from "../components/ExpenseTable";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function Daily() {
  const navigation = [
    { name: "Daily", href: "/", current: true },
    { name: "Monthly", href: "/monthly", current: false },
    { name: "Yearly", href: "/yearly", current: false },
  ];

  return (
    <>
      <div className="App">
        <Header navigationArray={navigation}></Header>
        <div id="chartContainer">
          <div id="pieChartContainer">
            <PieChart></PieChart>
          </div>
          <div id="barGraphContainer">
            <StackedBar></StackedBar>
          </div>
          <div id="columnChartContainer">
            <ColumnChart></ColumnChart>
          </div>
        </div>

        <div id="expenseTable">
          <button
            id="addButton"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Expense
          </button>
          <ExpenseTable></ExpenseTable>
        </div>
      </div>
    </>
  );
}

export default Daily;
