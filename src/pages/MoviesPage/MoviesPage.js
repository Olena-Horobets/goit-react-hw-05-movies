import s from './MoviesPage.module.css';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

import { fetchMovieByQuery } from 'services/serviceAPI';
import { Gallery } from 'components/Gallery/Gallery';

function MoviesPage() {
  const location = useLocation();

  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!query.trim().length) {
      setMovies([]);
      return;
    }

    fetchMovieByQuery({ query })
      .then(data => setMovies(data.results))
      .catch(err => console.log(err));
  }, [query]);

  return (
    <>
      <input
        className={s.input}
        value={query}
        onChange={e => {
          setQuery(e.target.value);
        }}
        autoComplete="off"
        autoFocus
      ></input>
      {movies.length ? (
        <>
          <Gallery
            movies={movies}
            location={location}
            keyWord={'search'}
          ></Gallery>
          <button></button>
        </>
      ) : (
        <p className={s.searchRequest}>...enter your query</p>
      )}
    </>
  );
}

export default MoviesPage;
