import React from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import List from "./components/list/List";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Featured from "./components/featured/Featured";
import ClickedFeatured from "./components/featured/ClickedFeatured";
import Watch from "./pages/watch/Watch";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Featured />} />
        <Route exact path="/movie/:id" element={<ClickedFeatured />} />
        <Route exact path="/movie/watch/:movieid" element={<Watch />} />
      </Routes>
    </>
  );
};

export default App;
