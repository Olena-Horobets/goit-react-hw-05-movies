import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as fetchMoviesAPI from '../services/serviceAPI';

import { MovieCard } from '../components/MovieCard/MovieCard';

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMoviesAPI
      .fetchPopular({ period: 'day' })
      .then(data => setMovies(data.results));
  }, []);

  return (
    <div>
      <h2 className="title">HOMEVIEW</h2>
      {movies && (
        <ul>
          {movies.map(el => (
            <li key={el.id}>
              <Link to={`/movies/${el.id}`}>
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
