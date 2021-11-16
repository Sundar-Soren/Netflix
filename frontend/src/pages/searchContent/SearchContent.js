import React, { useEffect, useState } from "react";
import "./searchContent.scss";
import ListItem from "../../components/list/listItem/ListItem";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loading/Loading";
const SearchContent = () => {
  const [sMovies, setSMovies] = useState([]);
  const { search } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getSearchMovies = async () => {
      try {
        const res = await axios.get(`/movies/?search=${search}`);
        setSMovies(res.data.movies);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    getSearchMovies();
  }, [search]);

  return (
    <>
      {loading && (
        <div>
          <Loading />
        </div>
      )}
      <div className="searchContent">
        <h2>Movies</h2>
        <p>
          Movies move us like nothing else can, whether they’re scary, funny,
          dramatic, romantic or anywhere in-between. So many titles, so much to
          experience.
        </p>
        <div className="search-container">
          {sMovies &&
            sMovies.map((movie, index) => (
              <ListItem key={index} movie={movie} />
            ))}
        </div>
      </div>
    </>
  );
};

export default SearchContent;
