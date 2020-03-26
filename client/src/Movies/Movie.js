import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory, useParams } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const {push} = useHistory();
  const {id} = useParams();
  
  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const routeToEditForm = e => {
    e.preventDefault();
    push(`/update-movies/${movie.id}`);
  }

  const deleteMovie = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
          .then(res => {
            console.log(res)
            getMovieList()
            push('/')
          })
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='edit-button' onClick={routeToEditForm}>
        <button>Edit</button>
      </div>
      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <div className='delete-button' onClick={deleteMovie}>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default Movie;
