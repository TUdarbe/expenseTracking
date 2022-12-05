import { useState } from "react";
import Header from "../components/Header";
import StackedBar from "../components/StackedBar";
import PieChart from "../components/PieChart";
import ColumnChart from "../components/ColumnChart";
import ExpenseTable from "../components/ExpenseTable";
import reactLogo from "./assets/react.svg";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Daily from "../pages/Daily";
import Monthly from "../pages/Monthly";
import "./App.css";
import Yearly from "../pages/Yearly";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Daily />} />
        <Route path="/monthly" element={<Monthly />} />
        <Route path="/yearly" element={<Yearly />} />
      </Routes>
    </>
  );
}

export default App;
