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
