import { useState, useEffect } from 'react';
import { NavLink, useParams, useRouteMatch } from 'react-router-dom';
import { Route, Switch, useLocation, useHistory } from 'react-router';
import * as fetchMoviesAPI from '../../services/serviceAPI';
import { parseSlug } from '../../services/serviceSlugify';

import { Cast } from '../../components/Cast/Cast';
import { Reviews } from '../../components/Reviews/Reviews';
import { IMG_URL } from '../../utils/constants';
import { STATUS } from '../../utils/constants';
import errorImage from '../../images/errorImage.jpg';

function MovieDetailsPage() {
  const location = useLocation();
  const history = useHistory();
  const pastHistory = location?.state?.from;

  const { url, path } = useRouteMatch();
  const { slug } = useParams();
  const movieId = parseSlug(slug);

  const [status, setStatus] = useState(STATUS.IDLE);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetchMoviesAPI
      .fetchMovieById({ movieId })
      .then(data => setMovie(data), setStatus(STATUS.RESOLVED))
      .catch(err => setStatus(STATUS.REJECTED));
  }, [movieId]);

  const onGoBackClick = e => {
    history.push(pastHistory);
  };

  if (status === STATUS.RESOLVED) {
    return (
      <div className="movieCard">
        <h1 style={{ color: 'darkviolet' }}>MOVIE TITLE: {movie.title}</h1>
        {pastHistory && (
          <button type="button" onClick={onGoBackClick}>
            back
          </button>
        )}
        <img
          src={
            movie.poster_path
              ? `${IMG_URL}${movie.poster_path}`
              : '../../images/fallback-photo.jpg'
          }
          alt={movie.title}
        ></img>
        <NavLink to={{ pathname: `${url}/cast`, state: { from: pastHistory } }}>
          CAST
        </NavLink>{' '}
        <NavLink
          to={{ pathname: `${url}/reviews`, state: { from: pastHistory } }}
        >
          REVIEWS
        </NavLink>
        <hr />
        <Switch>
          <Route path={`${path}/cast`}>{movie && <Cast />}</Route>
          <Route path={`${path}/reviews`}>{movie && <Reviews />}</Route>
        </Switch>
      </div>
    );
  }
  if (status === STATUS.IDLE) {
    return <p>enter something</p>;
  }
  if (status === STATUS.REJECTED) {
    return <img src={errorImage} alt="error message" className="errorImage" />;
  }
}

export default MovieDetailsPage;
