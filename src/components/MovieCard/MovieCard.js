import s from 'components/MovieCard/MovieCard.module.css';
import fallbackPhoto from 'images/fallbackPhoto.jpg';

import { IMG_URL } from 'utils/constants';
import PropTypes from 'prop-types';

function MovieCard({ movie }) {
  return (
    <div className={s.movieCard}>
      <h3 className={s.movieTitle}>{movie.title || movie.name}</h3>
      <div className={s.boxEffect}></div>
      <img
        className={s.movieImg}
        src={
          movie.poster_path
            ? `${IMG_URL}${movie.poster_path}`
            : `${fallbackPhoto}`
        }
        alt={movie.title || movie.name}
      ></img>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    poster_path: PropTypes.string,
  }),
};

export { MovieCard };
