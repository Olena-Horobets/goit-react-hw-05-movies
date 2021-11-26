import s from './MovieDetailsPage.module.css';

import { useState, useEffect } from 'react';
import { NavLink, useParams, useRouteMatch } from 'react-router-dom';
import { Route, Switch, useLocation, useHistory } from 'react-router';

import { fetchMovieById } from '../../services/serviceAPI';
import { parseSlug } from '../../services/serviceSlugify';

import { IMG_URL } from '../../utils/constants';
import { STATUS } from '../../utils/constants';

import Cast from 'components/Cast/Cast';
import Reviews from 'components/Reviews/Reviews';

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
    fetchMovieById({ movieId })
      .then(data => setMovie(data), setStatus(STATUS.RESOLVED))
      .catch(err => setStatus(STATUS.REJECTED));
  }, [movieId]);

  const onGoBackClick = e => {
    history.push(pastHistory);
  };
  console.log(movie);
  if (status === STATUS.RESOLVED) {
    return (
      <div className={s.movieCard}>
        {pastHistory && (
          <button className={s.backBtn} type="button" onClick={onGoBackClick}>
            {`back to ${location.state.keyWord}`}
          </button>
        )}
        <h2 className={s.title}>MOVIE TITLE: {movie.title}</h2>
        <div className={s.wrapper}>
          <img
            className={s.movieImage}
            src={
              movie.poster_path
                ? `${IMG_URL}${movie.poster_path}`
                : '../../images/fallback-photo.jpg'
            }
            alt={movie.title}
          ></img>
          <div className={s.overview}>
            <p>{movie.overview}</p>
            {movie.genres && (
              <ul className={s.genres}>
                {movie.genres.map(el => (
                  <li key={el.name} className={s.genresItem}>
                    {el.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={s.additional}>
            <NavLink
              to={{ pathname: `${url}/cast`, state: { from: pastHistory } }}
              className={s.castBtn}
              activeClassName={s.activeBtn}
            >
              CAST
            </NavLink>
            <NavLink
              to={{ pathname: `${url}/reviews`, state: { from: pastHistory } }}
              className={s.reviewsBtn}
              activeClassName={s.activeBtn}
            >
              REVIEWS
            </NavLink>
            <Switch>
              <Route path={`${path}/cast`}>{movie && <Cast />}</Route>
              <Route path={`${path}/reviews`}>{movie && <Reviews />}</Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
  if (status === STATUS.IDLE) {
    return <p>enter something</p>;
  }
  if (status === STATUS.REJECTED) {
    return <div className="errorImage"></div>;
  }
}

export default MovieDetailsPage;
