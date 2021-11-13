import React from "react";
import "./watch.scss";
import List from "../../components/list/List";
import { useLocation, useParams } from "react-router-dom";

const Watch = ({ wvideo }) => {
  const video = useLocation();
  return (
    <>
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
