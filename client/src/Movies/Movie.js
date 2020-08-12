import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, deleteFromList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5001/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = e => {
    axios.delete(`http://localhost:5001/api/movies/${params.id}`)
      .then(res => {
        console.log(res)
        deleteFromList(params.id)
        history.push('/')
      })
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className='movie-button-container'>
        <div className="movie-button" onClick={saveMovie}>
          Save
        </div>
        <div className='movie-button' onClick={e => history.push(`/update-movie/${params.id}`)}>
          Edit
        </div>
        <div className='movie-button' onClick={deleteMovie}>
          Delete
        </div>
      </div>
    </div>
  );
}

export default Movie;
