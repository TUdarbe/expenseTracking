import { useState } from "react";
import Header from "../components/Header";
import StackedBar from "../components/StackedBar";
import PieChart from "../components/PieChart";
import ColumnChart from "../components/ColumnChart";
import ExpenseTable from "../components/ExpenseTable";
import reactLogo from "./assets/react.svg";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Daily from "../pages/Daily";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Daily />} />
      </Routes>
    </>
  );
}

export default App;
