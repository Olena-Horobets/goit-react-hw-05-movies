import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link, useRouteMatch } from 'react-router-dom';
import * as fetchMoviesAPI from '../../services/serviceAPI';

import { MovieCard } from '../../components/MovieCard/MovieCard';

function MoviesPage() {
  const location = useLocation();
  const { url } = useRouteMatch();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!query.trim().length) {
      setMovies([]);
      return;
    }
    console.log(location);
    fetchMoviesAPI
      .fetchMovieByQuery({ query })
      .then(data => setMovies(data.results))
      .catch(err => console.log(err));
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
            <li className="galleryItem" key={el.id}>
              <Link
                to={{ pathname: `/movies/${el.id}`, state: { from: location } }}
              >
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
