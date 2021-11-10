import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Featured from "./components/featured/Featured";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Featured />
    </Router>
  );
};

export default App;
