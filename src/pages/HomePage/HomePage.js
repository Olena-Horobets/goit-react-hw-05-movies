import s from './HomePage.module.css';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import * as fetchMoviesAPI from 'services/serviceAPI';
import { getSlug } from 'services/serviceSlugify';

import { MovieCard } from 'components/MovieCard/MovieCard';

function HomePage() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [searchPeriod, setSearchPeriod] = useState('day');

  useEffect(() => {
    fetchMoviesAPI
      .fetchPopular({ period: searchPeriod })
      .then(data => setMovies(data.results))
      .catch(err => console.log(err));
  }, [searchPeriod]);

  return (
    <>
      <h2 className="title">Popular movies</h2>
      <div className={s.homeControls}>
        <label
          htmlFor="day"
          className={searchPeriod === 'day' ? s.labelCheked : s.label}
        >
          DAY
        </label>
        <input
          id="day"
          className={s.input}
          type="radio"
          value="day"
          checked={searchPeriod === 'day'}
          onChange={e => {
            setSearchPeriod(e.target.value);
          }}
        ></input>
        <label
          htmlFor="week"
          className={searchPeriod === 'week' ? s.labelCheked : s.label}
        >
          WEEK
        </label>
        <input
          id="week"
          className={s.input}
          type="radio"
          value="week"
          checked={searchPeriod === 'week'}
          onChange={e => {
            setSearchPeriod(e.target.value);
          }}
        ></input>
      </div>

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
