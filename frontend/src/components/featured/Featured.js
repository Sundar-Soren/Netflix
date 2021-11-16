import React, { useEffect, useState } from "react";
import "./featured.scss";
import { Link } from "react-router-dom";
import { PlayArrow, InfoOutlined } from "@material-ui/icons";
import Navbar from "../navbar/Navbar";
import List from "../list/List";
import axios from "axios";
import Loading from "../loading/Loading";
const Featured = ({ clickedItem }) => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getRandomMovies = async () => {
      try {
        const res = await axios(`/random`);
        setContent(res.data[0]);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(true);
      }
    };
    getRandomMovies();
  }, []);

  return (
    <>
      <Navbar />
      {loading && (
        <div>
          <Loading />
        </div>
      )}
      <div className="featured">
        {clickedItem ? (
          <>
            <img src={clickedItem.imgThumb} alt="Backgroud poster pic" />

            <div className="info">
              <img src={clickedItem.imgTitle} alt="movie name " />
              <h2 className="movie-title">{clickedItem.title}</h2>
              <span className="desc">{clickedItem.desc}</span>
              <div className="buttons">
                <Link
                  to={{
                    pathname: `/watch/${clickedItem._id}`,
                    state: `${clickedItem.video}`,
                  }}
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
          </>
        ) : (
          <>
            <img src={content.imgThumb} alt="Backgroud poster pic" />

            <div className="info">
              <img src={content.imgTitle} alt="movie name " />
              <h2 className="movie-title">{content.title}</h2>

              <span className="desc">{content.desc}</span>
              <div className="buttons">
                <Link
                  to={`/movie/watch/${content._id}`}
                  state={content.video}
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
          </>
        )}
      </div>
      <List />
    </>
  );
};

export default Featured;
