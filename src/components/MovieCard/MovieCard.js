import s from 'components/MovieCard/MovieCard.module.css';

import { IMG_URL } from '../../utils/constants';

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
            : '../../images/fallback-photo.jpg'
        }
        alt={movie.title}
      ></img>
    </div>
  );
}

export { MovieCard };
