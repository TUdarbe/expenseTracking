import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import DailyColumnChart from "../components/columnCharts/DailyColumnChart";
import DailyPieChart from "../components/pieCharts/DailyPieChart";
import DailyStackedBar from "../components/stackedBars/DailyStackedBar";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseForm from "../components/ExpenseForm";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import Dropdown from "react-dropdown";
import { useNavigate } from "react-router-dom";
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

const firebaseConfig = {
  apiKey: "AIzaSyBkZ-THNMtH6oTgfMfsR3x1sMzcb-GwXbA",

  authDomain: "expensetracking-ab09e.firebaseapp.com",

  databaseURL: "https://expensetracking-ab09e-default-rtdb.firebaseio.com",

  projectId: "expensetracking-ab09e",

  storageBucket: "expensetracking-ab09e.appspot.com",

  messagingSenderId: "145886862144",

  appId: "1:145886862144:web:e5b004a00fbe087e9938a5",

  measurementId: "G-1232C36XL9",
};

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

  // const navigate = useNavigate();

  useEffect(() => {}, [year]);
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
          <div id="chartContainer">
            <div id="pieChartContainer">
              <DailyPieChart year={parseInt(year)} uid={uid}></DailyPieChart>
            </div>
            <div id="barGraphContainer">
              <DailyStackedBar
                year={parseInt(year)}
                uid={uid}
              ></DailyStackedBar>
            </div>
            <div id="columnChartContainer">
              <DailyColumnChart
                year={parseInt(year)}
                uid={uid}
              ></DailyColumnChart>
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
              {showForm ? <ExpenseForm uid={uid} /> : null}
            </div>
            <ExpenseTable year={parseInt(year)} uid={uid}></ExpenseTable>
          </div>
        </div>
      </>
    );
  } else {
    return <SignIn />;
  }
}

export default Daily;
