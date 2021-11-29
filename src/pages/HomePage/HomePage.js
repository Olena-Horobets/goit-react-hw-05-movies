import s from './HomePage.module.css';

import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';

import { fetchTrending } from 'services/serviceAPI';
import { Gallery } from 'components/Gallery/Gallery';

function HomePage() {
  const history = useHistory();
  const location = useLocation();

  const [movies, setMovies] = useState([]);
  const [searchPeriod, setSearchPeriod] = useState(() =>
    new URLSearchParams(location.search).get('trending'),
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTrending({ period: searchPeriod, page })
      .then(data => {
        page === 1
          ? setMovies(data.results)
          : setMovies(prev => [...prev, ...data.results]);
      })
      .catch(err => console.log(err));
  }, [page, searchPeriod]);

  const handleParamsChange = e => {
    history.push({
      ...location,
      search: `trending=${e.target.value}`,
    });
    setSearchPeriod(e.target.value);
  };

  return (
    <>
      <h2 className="title">Trending movies</h2>
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
          onChange={handleParamsChange}
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
          onChange={handleParamsChange}
        ></input>
      </div>

      {movies && (
        <>
          <Gallery
            movies={movies}
            location={location}
            keyWord={'trending'}
          ></Gallery>
          <button></button>
        </>
      )}
    </>
  );
}

export default HomePage;
