import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import List from "../list/List";
import Loading from "../loading/Loading";
import Navbar from "../navbar/Navbar";
import "./featured.scss";

const ClickedFeatured = () => {
  const params = useParams();
  const [clickedItem, setClickedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getClickedMovie = async () => {
      try {
        const res = await axios(`/movie/${params.id}`);
        setClickedItem(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getClickedMovie();
  }, [params]);

  return (
    <>
      <Navbar />
      {loading && (
        <div>
          <Loading />
        </div>
      )}
      {clickedItem && (
        <div className="clickedFeatured">
          <img src={clickedItem.imgThumb} alt="Backgroud poster pic" />

          <div className="info">
            <img src={clickedItem.imgTitle} alt="movie name " />
            <h2 className="movie-title">{clickedItem.title}</h2>
            <span className="desc">{clickedItem.desc}</span>
            <div className="buttons">
              <Link
                to={`/movie/watch/${clickedItem._id}`}
                state={clickedItem.video}
                className="link"
              >
                <button className="play">
                  <PlayArrow /> <span>play</span>
                </button>
              </Link>
              <button className="more">
                <InfoOutlined /> <span>info</span>
              </button>
            </div>
          </div>
        </div>
      )}
      <List rParams={params.id} />
    </>
  );
};

export default ClickedFeatured;
