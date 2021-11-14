import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Featured from "./components/featured/Featured";
import ClickedFeatured from "./components/featured/ClickedFeatured";
import Watch from "./pages/watch/Watch";
import Login from "./pages/registerHome/login/Login";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./context/action/userAction";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Featured />} />
        <Route exact path="/movie/:id" element={<ClickedFeatured />} />
        <Route
          exact
          path="/movie/watch/:movieid"
          element={
            isAuthenticated ? <Watch /> : <Navigate replace to="/login" />
          }
        />
        <Route
          exact
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate replace to="/" />}
        />
      </Routes>
    </>
  );
};

export default App;
