import 'components/MovieCard/MovieCard.css';

function MovieCard({ movie }) {
  return (
    <div className="movieCard">
      {/* <img src={movie.imgUrl} alt={movie.title}></img> */}
      <h3>{movie.title || movie.name}</h3>
    </div>
  );
}

export { MovieCard };
