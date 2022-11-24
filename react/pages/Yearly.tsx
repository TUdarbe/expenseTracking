import Header from "../components/Header";

import YearlyStackedBar from "../components/stackedBars/YearlyStackedBar";
import YearlyPieChart from "../components/pieCharts/YearlyPieChart";
import YearlyColumnChart from "../components/columnCharts/YearlyColumnChart";
import ExpenseTable from "../components/ExpenseTable";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function Yearly() {
  const navigation = [
    { name: "Daily", href: "/", current: false },
    { name: "Monthly", href: "/monthly", current: false },
    { name: "Yearly", href: "/yearly", current: true },
  ];

  return (
    <>
      <div className="App">
        <Header navigationArray={navigation}></Header>
        <div id="chartContainer">
          <div id="pieChartContainer">
            <YearlyPieChart></YearlyPieChart>
          </div>
          <div id="barGraphContainer">
            <YearlyStackedBar></YearlyStackedBar>
          </div>
          <div id="columnChartContainer">
            <YearlyColumnChart></YearlyColumnChart>
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

export default Yearly;
