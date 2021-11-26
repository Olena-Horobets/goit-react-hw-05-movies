import s from './HomePage.module.css';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

import * as fetchMoviesAPI from 'services/serviceAPI';
import { Gallery } from 'components/Gallery/Gallery';

function HomePage() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [searchPeriod, setSearchPeriod] = useState('day');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMoviesAPI
      .fetchPopular({ period: searchPeriod, page })
      .then(data => {
        page === 1
          ? setMovies(data.results)
          : setMovies(prev => [...prev, ...data.results]);
      })
      .catch(err => console.log(err));
  }, [page, searchPeriod]);

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
        <>
          <Gallery
            movies={movies}
            location={location}
            keyWord={'home'}
          ></Gallery>
          <button></button>
        </>
      )}
    </>
  );
}

export default HomePage;
