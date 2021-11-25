import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import * as fetchMoviesAPI from '../../services/serviceAPI';
import { getSlug } from '../../services/serviceSlugify';

import { MovieCard } from '../../components/MovieCard/MovieCard';

function HomePage() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMoviesAPI
      .fetchPopular({ period: 'day' })
      .then(data => setMovies(data.results))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2 className="title">HOMEVIEW</h2>
      {movies && (
        <ul className="gallery">
          {movies.map(el => (
            <li key={el.id}>
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
      )}
    </div>
  );
}

export default HomePage;
