import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getFirestore(app);

export default database;
