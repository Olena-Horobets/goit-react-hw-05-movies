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
    <>
      <h2 className="title">Popular movies</h2>
      {movies && (
        <ul className="gallery">
          {movies.map(el => (
            <li className="galleryItem" key={el.id}>
              <Link
                className="galleryLink"
                to={{
                  pathname: `/movies/${getSlug(el)}`,
                  state: { from: location, keyWord: 'home' },
                }}
              >
                <MovieCard movie={el} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default HomePage;
