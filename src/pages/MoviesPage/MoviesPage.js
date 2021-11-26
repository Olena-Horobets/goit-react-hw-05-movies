import s from './MoviesPage.module.css';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { fetchMovieByQuery } from '../../services/serviceAPI';
import { getSlug } from '../../services/serviceSlugify';

import { MovieCard } from '../../components/MovieCard/MovieCard';

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
        <ul className="gallery">
          {movies.map(el => (
            <li className="galleryItem" key={el.id}>
              <Link
                className="galleryLink"
                to={{
                  pathname: `/movies/${getSlug(el)}`,
                  state: { from: location, keyWord: 'search' },
                }}
              >
                <MovieCard movie={el} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className={s.searchRequest}>...enter your query</p>
      )}
    </>
  );
}

export default MoviesPage;
