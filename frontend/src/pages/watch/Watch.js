import React from "react";
import "./watch.scss";
import List from "../../components/list/List";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const Watch = () => {
  const video = useLocation();
  return (
    <>
      <Navbar />
      {video && (
        <div>
          <div className="watch">
            <div className="videoContainer">
              <video src={video.state} autoPlay controls></video>
            </div>
          </div>
          <List />
        </div>
      )}
    </>
  );
};

export default Watch;
