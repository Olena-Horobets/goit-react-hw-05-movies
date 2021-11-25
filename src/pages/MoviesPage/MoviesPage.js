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
    <div>
      <input
        value={query}
        onChange={e => {
          setQuery(e.target.value);
        }}
      ></input>
      {movies.length ? (
        <ul className="gallery">
          {movies.map(el => (
            <li className="galleryItem" key={el.id}>
              <Link
                to={{
                  pathname: `/movies/${getSlug(el)}`,
                  state: { from: location },
                }}
              >
                <MovieCard movie={el} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>...enter your query</p>
      )}
    </div>
  );
}

export default MoviesPage;
