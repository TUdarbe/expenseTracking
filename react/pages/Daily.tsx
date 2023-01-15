import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import ColumnChart from "../components/columnCharts/ColumnChart";
import PieChart from "../components/pieCharts/PieChart";
import StackedBar from "../components/stackedBars/StackedBar";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseForm from "../components/ExpenseForm";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import Dropdown from "react-dropdown";
import { useNavigate } from "react-router-dom";
import firebaseConfig from "../util/Fbconfig";
import SignIn from "./SignIn";

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

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);

function Daily() {
  const [year, setYear] = useState(defaultOption);
  const [showForm, setShowForm] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  let navigate = useNavigate();

  const handleSignOut = async () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/");
      });
  };

  if (user) {
    const uid = user.uid;
    return (
      <>
        <div className="App">
          <Header onClick={handleSignOut}></Header>
          <div className="yearAndMonthSelector">
            <Dropdown
              options={options}
              value={year}
              onChange={(e) => setYear(e.value)}
              placeholder="Select an option"
            />
          </div>
          <div id="wrapper">
            <div id="chartContainer">
              <div id="pieChartContainer">
                <PieChart year={parseInt(year)} uid={uid}></PieChart>
              </div>
              <div id="barGraphContainer">
                <StackedBar year={parseInt(year)} uid={uid}></StackedBar>
              </div>
              <div id="columnChartContainer">
                <ColumnChart year={parseInt(year)} uid={uid}></ColumnChart>
              </div>
            </div>

            <div id="expenseTable">
              <div className="expenseInfoContainer"></div>
              <ExpenseTable year={parseInt(year)} uid={uid}></ExpenseTable>
            </div>
            <div id="addBtnContainer">
              <FontAwesomeIcon
                className="fa-xl"
                id={showForm ? "hideFormButton" : "showFormButton"}
                onClick={() => setShowForm(!showForm)}
                icon={showForm ? faMinusCircle : faPlusCircle}
              />
            </div>
            <div id="formContainer">
              {showForm ? <ExpenseForm uid={uid} /> : null}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <SignIn />;
  }
}

export default Daily;
