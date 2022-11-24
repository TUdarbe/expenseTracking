import Header from "../components/Header";

import MonthlyColumnChart from "../components/columnCharts/MonthlyColumnChart";
import MonthlyPieChart from "../components/pieCharts/MonthlyPieChart";
import MonthlyStackedBar from "../components/stackedBars/MonthlyStackedBar";

import ExpenseTable from "../components/ExpenseTable";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function Monthly() {
  const navigation = [
    { name: "Daily", href: "/", current: false },
    { name: "Monthly", href: "monthly", current: true },
    { name: "Yearly", href: "/yearly", current: false },
  ];

  return (
    <>
      <div className="App">
        <Header navigationArray={navigation}></Header>
        <div id="chartContainer">
          <div id="pieChartContainer">
            <MonthlyPieChart></MonthlyPieChart>
          </div>
          <div id="barGraphContainer">
            <MonthlyStackedBar></MonthlyStackedBar>
          </div>
          <div id="columnChartContainer">
            <MonthlyColumnChart></MonthlyColumnChart>
          </div>
        </div>

        <div id="expenseTable">
          <button
            id="addButton"
            className="bg-green-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Expense
          </button>
          <ExpenseTable></ExpenseTable>
        </div>
      </div>
    </>
  );
}

export default Monthly;
