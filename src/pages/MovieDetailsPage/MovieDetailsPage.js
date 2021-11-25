import { useState, useEffect } from 'react';
import { NavLink, useParams, useRouteMatch } from 'react-router-dom';
import { Route, Switch, useLocation, useHistory } from 'react-router';
import * as fetchMoviesAPI from '../../services/serviceAPI';
import { Cast } from '../../components/Cast/Cast';
import { Reviews } from '../../components/Reviews/Reviews';
import { IMG_URL } from '../../services/serviceAPI';

function MovieDetailsPage() {
  const location = useLocation();
  const history = useHistory();
  const pastHistory = location?.state?.from;

  const { url, path } = useRouteMatch();
  const { slug } = useParams();
  const movieId = slug.match(/[a-zA-Z0-9]+$/)[0];

  const [movie, setMovie] = useState({});

  console.log(movieId);
  useEffect(() => {
    fetchMoviesAPI
      .fetchMovieById({ movieId })
      .then(setMovie)
      .catch(err => console.log(err));
  }, [movieId]);

  const onGoBackClick = e => {
    history.push(pastHistory);
  };

  return (
    <div className="movieCard">
      <h1 style={{ color: 'darkviolet' }}>MOVIE TITLE: {movie.title}</h1>
      {pastHistory && (
        <button type="button" onClick={onGoBackClick}>
          back
        </button>
      )}
      <img src={`${IMG_URL}${movie.poster_path}`} alt={movie.title}></img>
      <NavLink to={{ pathname: `${url}/cast`, state: { from: pastHistory } }}>
        CAST
      </NavLink>{' '}
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
