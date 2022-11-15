import { useState } from "react";
import Header from "../components/Header";
import StackedBar from "../components/StackedBar";
import PieChart from "../components/PieChart";
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
          <div id="horizontalGraphContainer"></div>
        </div>
        <div id="expenseTable"></div>
      </div>
    </>
  );
}

export default App;
