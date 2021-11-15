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
import Signup from "./pages/registerHome/signup/Signup";
import Signup1 from "./pages/registerHome/signup/Signup1";
import Signup2 from "./pages/registerHome/signup/Signup2";
import Signup3 from "./pages/registerHome/signup/Signup3";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <>
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
        <Route
          exact
          path="/signup"
          element={!isAuthenticated ? <Signup3 /> : <Navigate replace to="/" />}
        />
      </Routes>
    </>
  );
};

export default App;
