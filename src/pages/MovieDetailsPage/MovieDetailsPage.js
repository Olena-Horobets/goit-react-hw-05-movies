import { useState, useEffect } from 'react';
import { NavLink, useParams, useRouteMatch } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import * as fetchMoviesAPI from '../../services/serviceAPI';
import { Cast } from '../../components/Cast/Cast';
import { Reviews } from '../../components/Reviews/Reviews';
import { IMG_URL } from '../../services/serviceAPI';

function MovieDetailsPage() {
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetchMoviesAPI.fetchMovieById({ movieId }).then(setMovie);
  }, [movieId]);
  console.log(movie);
  return (
    <div className="movieCard">
      <h1 style={{ color: 'darkviolet' }}>MOVIE TITLE: {movie.title}</h1>
      <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title}></img>
      <NavLink to={`${url}/cast`}>CAST</NavLink>{' '}
      <NavLink to={`${url}/reviews`}>REVIEWS</NavLink>
      <hr />
      <Switch>
        <Route path={`${path}/cast`}>{movie && <Cast />}</Route>
        <Route path={`${path}/reviews`}>{movie && <Reviews />}</Route>
      </Switch>
    </div>
  );
}

export default MovieDetailsPage;
