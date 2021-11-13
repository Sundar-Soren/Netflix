import React from "react";

import "./listItem.scss";
import { Link } from "react-router-dom";

const ListItem = ({ movie }) => {
  return (
    <Link to={`/movie/${movie._id}`} className="link">
      <div className="list-content">
        <img src={movie.imgThumb} alt="movie poster" />
      </div>
    </Link>
  );
};

export default ListItem;
