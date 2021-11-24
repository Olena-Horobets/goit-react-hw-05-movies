import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import * as fetchMoviesAPI from '../../services/serviceAPI';

import { MovieCard } from '../../components/MovieCard/MovieCard';

function MoviesPage() {
  const { url } = useRouteMatch();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!query.trim().length) {
      setMovies([]);
      return;
    }

    fetchMoviesAPI
      .fetchMovieByQuery({ query })
      .then(data => setMovies(data.results));
  }, [query]);

  return (
    <div>
      <h2 className="title">search</h2>
      <input
        value={query}
        onChange={e => {
          setQuery(e.target.value);
        }}
      ></input>
      {movies && (
        <ul className="gallery">
          {movies.map(el => (
            <li key={el.id}>
              <Link to={`${url}/${el.id}`}>
                <MovieCard movie={el} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MoviesPage;
