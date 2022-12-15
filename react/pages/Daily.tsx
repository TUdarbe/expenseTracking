import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import DailyColumnChart from "../components/columnCharts/DailyColumnChart";
import DailyPieChart from "../components/pieCharts/DailyPieChart";
import DailyStackedBar from "../components/stackedBars/DailyStackedBar";
import ExpenseTable from "../components/ExpenseTable";
import CategoryDropdown from "../components/CategoryDropdown";
import ExpenseForm from "../components/ExpenseForm";
import Select from "react-select";

import React, { useEffect, useState } from "react";
import database from "../util/Fbdatabase";
import { doc, getDocs, collection } from "firebase/firestore";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

interface DailyExpenses {
  amount: Number;
  category: string;
  date: Date;
  description: string;
}

const navigation = [
  { name: "Daily", href: "/", current: true },
  { name: "Monthly", href: "/monthly", current: false },
  { name: "Yearly", href: "/yearly", current: false },
];

const options = ["2022", "2023", "2024"];

const monthOptions = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];
const defaultOption = options[0];

const monthDefaultOption = monthOptions[0];

function Daily() {
  const [data, setData] = useState<DailyExpenses[]>([]);
  const [year, setYear] = useState(defaultOption);
  const [showForm, setShowForm] = useState(false);

  const changeLanguage = (e: any) => {
    console.log(e.value);
  };

  return (
    <>
      <div className="App">
        <Header navigationArray={navigation}></Header>

        <div className="yearAndMonthSelector">
          <Dropdown
            options={options}
            value={year}
            onChange={(e) => setYear(e.value)}
            placeholder="Select an option"
          />
        </div>
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
