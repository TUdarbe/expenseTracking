import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Daily from "../pages/Daily";
import Authentication from "../pages/Authentication";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/dashboard" element={<Daily />} />
      </Routes>
    </>
  );
}

export default App;
