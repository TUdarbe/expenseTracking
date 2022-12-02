import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import DailyColumnChart from "../components/columnCharts/DailyColumnChart";
import DailyPieChart from "../components/pieCharts/DailyPieChart";
import DailyStackedBar from "../components/stackedBars/DailyStackedBar";
import ExpenseTable from "../components/ExpenseTable";
import CategoryDropdown from "../components/CategoryDropdown";
import ExpenseForm from "../components/ExpenseForm";

import React, { useEffect, useState } from "react";
import database from "../util/Fbdatabase";
import { doc, getDocs, collection } from "firebase/firestore";

interface DailyExpenses {
  amount: Number;
  category: string;
  date: Date;
  description: string;
}

function Daily() {
  const [data, setData] = useState<DailyExpenses[]>([]);

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
            <DailyPieChart></DailyPieChart>
          </div>
          <div id="barGraphContainer">
            <DailyStackedBar></DailyStackedBar>
          </div>
          <div id="columnChartContainer">
            <DailyColumnChart></DailyColumnChart>
          </div>
        </div>

        <div id="expenseTable">
          <button
            id="addButton"
            className="bg-green-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Expense
          </button>

          <div className="expenseInfoContainer">
            <ExpenseForm />
          </div>

          <ExpenseTable></ExpenseTable>
        </div>
      </div>
    </>
  );
}

export default Daily;
