import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import { useEffect, useState } from "react";
import "firebaseui/dist/firebaseui.css";
import { SignInMethod } from "firebase/auth";

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

firebase.initializeApp(firebaseConfig);

var uiConfig = {
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
      requireDisplayName: true,
    },
  ],
  signInFlow: "popup",
  signInSuccessUrl: "/dashboard",
};

function Authentication() {
  useEffect(() => {
    let ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);

  return (
    <>
      <div id="signInContainer">
        <h1 id="signInTitle">Welcome</h1>
        <div id="firebaseui-auth-container"></div>
      </div>
    </>
  );
}

export default Authentication;
