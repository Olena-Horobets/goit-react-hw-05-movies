import s from './MoviesPage.module.css';

import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';

import { fetchMovieByQuery } from 'services/serviceAPI';
import { Gallery } from 'components/Gallery/Gallery';

function MoviesPage() {
  const history = useHistory();
  const location = useLocation();

  const [query, setQuery] = useState(
    () => new URLSearchParams(location.search).get('query') || '',
  );
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

  const onInputChange = e => {
    setQuery(e.target.value);
    const query = e.target.value.trim().toLowerCase();
    history.push({
      ...location,
      search: `query=${query}`,
    });
  };

  return (
    <>
      <input
        className={s.input}
        value={query}
        onChange={onInputChange}
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
