import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Daily from "../pages/Daily";
import Authentication from "../pages/Authentication";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Daily />} />
        <Route path="/authentication" element={<Authentication />} />
      </Routes>
    </>
  );
}

export default App;
