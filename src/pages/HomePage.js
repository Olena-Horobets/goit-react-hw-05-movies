import { useState, useEffect } from 'react';
import { Route, NavLink, useRouteMatch } from 'react-router-dom';
import * as fetchMoviesAPI from '../services/serviceAPI';

import { MovieCard } from '../components/MovieCard/MovieCard';

function HomePage() {
  const [movies, setmovies] = useState([]);

  useEffect(() => {
    fetchMoviesAPI.fetchPopular().then(data => setmovies(data.results));
  }, []);
  console.log(movies);
  return (
    <div>
      <h2 className="title">HOMEVIEW</h2>
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

export default HomePage;
