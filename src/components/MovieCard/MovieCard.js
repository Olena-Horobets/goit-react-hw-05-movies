import 'components/MovieCard/MovieCard.css';

import { IMG_URL } from '../../services/serviceAPI';

function MovieCard({ movie }) {
  return (
    <div className="movieCard">
      <h3>{movie.title || movie.name}</h3>
      <img
        className="movieImg"
        src={`${IMG_URL}${movie.poster_path}`}
        alt={movie.title}
      ></img>
    </div>
  );
}

export { MovieCard };
