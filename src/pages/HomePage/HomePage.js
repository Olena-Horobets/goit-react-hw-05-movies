import slugify from 'slugify';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import * as fetchMoviesAPI from '../../services/serviceAPI';

import { MovieCard } from '../../components/MovieCard/MovieCard';

const getSlug = string => {
  return slugify(string, {
    lower: true,
    strict: true,
  });
};

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
                  pathname: `/movies/${getSlug(
                    `${el.title || el.name} ${el.id}`,
                  )}`,
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
