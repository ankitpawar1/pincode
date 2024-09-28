import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import PincodeDetailsPage from "./PincodeDetailsPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pincode/:pincode" element={<PincodeDetailsPage />} />
    </Routes>
  </Router>
);
