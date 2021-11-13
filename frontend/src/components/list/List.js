import axios from "axios";
import React, { useEffect, useState } from "react";
import "./list.scss";
import ListItem from "./listItem/ListItem";

const List = ({ rParams }) => {
  const [sMovies, setSMovies] = useState([]);
  useEffect(() => {
    const getSuggetionMovies = async () => {
      try {
        const res = await axios.get("/related");
        setSMovies(res.data);
        console.log(res.data);
      } catch (error) {}
    };
    getSuggetionMovies();
  }, [rParams]);
  return (
    <>
      <div className="list">
        <p className="list-title">More Like This</p>

        <div className="container">
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
