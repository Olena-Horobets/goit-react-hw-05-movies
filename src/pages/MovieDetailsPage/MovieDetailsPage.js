import s from './MovieDetailsPage.module.css';
import fallbackPhoto from 'images/fallbackPhoto.jpg';

import { useState, useEffect, lazy, Suspense } from 'react';
import { NavLink, useParams, useRouteMatch } from 'react-router-dom';
import { Route, Switch, useLocation, useHistory } from 'react-router';

import { fetchMovieById } from 'services/serviceAPI';
import { parseSlug } from 'services/serviceSlugify';

import { IMG_URL } from 'utils/constants';
import { STATUS } from 'utils/constants';
import Loader from 'components/Loader';

const Cast = lazy(() =>
  import('components/Cast/Cast.js' /* webpackChunkName: "cast-page" */),
);
const Reviews = lazy(() =>
  import(
    'components/Reviews/Reviews.js' /* webpackChunkName: "reviews-page" */
  ),
);

function MovieDetailsPage() {
  const location = useLocation();
  const history = useHistory();
  const pastHistory = location?.state?.from;
  const keyWord = location?.state?.keyWord;

  const { url, path } = useRouteMatch();
  const { slug } = useParams();
  const movieId = parseSlug(slug);

  const [status, setStatus] = useState(STATUS.IDLE);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    setStatus(STATUS.PENDING);
    fetchMovieById({ movieId })
      .then(data => setMovie(data), setStatus(STATUS.RESOLVED))
      .catch(err => setStatus(STATUS.REJECTED));
  }, [movieId]);

  const onGoBackClick = e => {
    history.push(pastHistory);
  };

  const getGradient = data => {
    return `#ff4c29 0deg ${data * 36}deg, #ffffff77 ${data * 36}deg 360deg`;
  };

  if (status === STATUS.RESOLVED) {
    return (
      <div className={s.movieCard}>
        {pastHistory && (
          <button className={s.backBtn} type="button" onClick={onGoBackClick}>
            {`back to ${keyWord}`}
          </button>
        )}

        <h2 className="title">{movie.title}</h2>
        <div className={s.wrapper}>
          <img
            className={s.movieImage}
            src={
              movie.poster_path
                ? `${IMG_URL}${movie.poster_path}`
                : `${fallbackPhoto}`
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

            {movie.vote_average > 0 && (
              <>
                <h3>Movie rating:</h3>
                <div
                  className={s.rating}
                  style={{
                    background: `conic-gradient(${getGradient(
                      movie.vote_average,
                    )})`,
                  }}
                >
                  <p className={s.ratingNumber}>{`${
                    movie.vote_average * 10
                  } %`}</p>
                </div>
              </>
            )}
          </div>

          <div className={s.additional}>
            <NavLink
              to={{
                pathname: `${url}/cast`,
                state: { from: pastHistory, keyWord },
              }}
              className={s.castBtn}
              activeClassName={s.activeBtn}
            >
              CAST
            </NavLink>
            <NavLink
              to={{
                pathname: `${url}/reviews`,
                state: { from: pastHistory, keyWord },
              }}
              className={s.reviewsBtn}
              activeClassName={s.activeBtn}
            >
              REVIEWS
            </NavLink>

            <div className={s.infoWrapper}>
              <Suspense fallback={Loader}>
                <Switch>
                  <Route path={`${path}/cast`}>{movie && <Cast />}</Route>
                  <Route path={`${path}/reviews`}>{movie && <Reviews />}</Route>
                </Switch>
              </Suspense>
            </div>
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

  if (status === STATUS.PENDING) {
    return <Loader></Loader>;
  }
}

export default MovieDetailsPage;