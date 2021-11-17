import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import "./list.scss";
import ListItem from "./listItem/ListItem";

const List = ({ rParams }) => {
  const [sMovies, setSMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getSuggetionMovies = async () => {
      try {
        const res = await axios.get("/related");
        setSMovies(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    getSuggetionMovies();
  }, [rParams]);
  return (
    <>
      {loading && (
        <div>
          <Loading />
        </div>
      )}
      <div className="list">
        <p className="list-title">More Like This</p>

        <div className="container">
          {error && <h1>{error}</h1>}
          {sMovies &&
            sMovies.map((movie, index) => (
              <ListItem key={index} movie={movie} />
            ))}
        </div>
      </div>
    </>
  );
};

export default List;
