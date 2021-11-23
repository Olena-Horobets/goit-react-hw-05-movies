import { useState, useEffect } from 'react';
import { Route, NavLink, useRouteMatch } from 'react-router-dom';
import * as fetchMoviesAPI from '../services/serviceAPI';

import { MovieCard } from '../components/MovieCard/MovieCard';

function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!query.trim().length) {
      setMovies([]);
      return;
    }

    fetchMoviesAPI
      .fetchByQuery({ query })
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
        <ul>
          {movies.map(el => (
            <li key={el.id}>
              <MovieCard movie={el} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MoviesPage;
