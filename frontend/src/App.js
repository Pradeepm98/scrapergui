import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CsvViewer from "./CsvViewer";
import SignIn from "./SignIn";
import Header from "./Header";
import DataGridDemo from "./DataGridDemo";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <br />
        <br />
        <br />
        <Routes>
          <Route path="/csvviewer" element={<CsvViewer />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin" element={<DataGridDemo />} />
          {/* Add more routes as necessary */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
