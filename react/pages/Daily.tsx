import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import DailyColumnChart from "../components/columnCharts/DailyColumnChart";
import DailyPieChart from "../components/pieCharts/DailyPieChart";
import DailyStackedBar from "../components/stackedBars/DailyStackedBar";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseForm from "../components/ExpenseForm";
import { useState, useEffect } from "react";
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
  const [year, setYear] = useState(defaultOption);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {}, [year]);

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
            <DailyPieChart year={parseInt(year)}></DailyPieChart>
          </div>
          <div id="barGraphContainer">
            <DailyStackedBar year={parseInt(year)}></DailyStackedBar>
          </div>
          <div id="columnChartContainer">
            <DailyColumnChart year={parseInt(year)}></DailyColumnChart>
          </div>
        </div>

        <div id="expenseTable">
          <div className="expenseInfoContainer">
            <FontAwesomeIcon
              className="fa-2x"
              id={showForm ? "hideFormButton" : "showFormButton"}
              onClick={() => setShowForm(!showForm)}
              icon={showForm ? faMinusCircle : faPlusCircle}
            />
            {showForm ? <ExpenseForm /> : null}
          </div>
          <ExpenseTable year={parseInt(year)}></ExpenseTable>
        </div>
      </div>
    </>
  );
}

export default Daily;
