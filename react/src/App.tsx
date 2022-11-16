import { useState } from "react";
import Header from "../components/Header";
import StackedBar from "../components/StackedBar";
import PieChart from "../components/PieChart";
import ColumnChart from "../components/ColumnChart";
import ExpenseTable from "../components/ExpenseTable";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        <Header></Header>
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
          <ExpenseTable></ExpenseTable>
        </div>
      </div>
    </>
  );
}

export default App;
