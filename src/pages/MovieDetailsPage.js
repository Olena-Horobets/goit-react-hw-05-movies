import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as fetchMoviesAPI from '../services/serviceAPI';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetchMoviesAPI.fetchMovieById({ movieId }).then(setMovie);
  }, [movieId]);

  return (
    <div className="movieCard">
      <h1 style={{ color: 'darkviolet' }}>MOVIE TITLE: {movie.title}</h1>
    </div>
  );
}

export default MovieDetailsPage;
