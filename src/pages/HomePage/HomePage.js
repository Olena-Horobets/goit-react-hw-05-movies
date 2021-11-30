import s from './HomePage.module.css';

import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';

import { fetchTrending } from 'services/serviceAPI';
import { Gallery } from 'components/Gallery/Gallery';
import { Pagination } from 'components/Pagination/Pagination';

function smoothScrollingTo(id) {
  const element = document.getElementById(id);
  element.scrollIntoView({
    alignToTop: true,
    behavior: 'smooth',
    block: 'end',
  });
}

function HomePage() {
  const history = useHistory();
  const location = useLocation();

  const [searchPeriod, setSearchPeriod] = useState(
    () => new URLSearchParams(location?.search)?.get('trending') || 'day',
  );
  const [page, setPage] = useState(
    () => Number(new URLSearchParams(location?.search)?.get('page')) || 1,
  );
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!location.search) return;
    setSearchPeriod(new URLSearchParams(location.search).get('trending'));
    setPage(Number(new URLSearchParams(location.search).get('page')));
  }, [location]);

  useEffect(() => {
    fetchTrending({ period: searchPeriod, page })
      .then(data => {
        setMovies(data.results);
        smoothScrollingTo(data.results[0].id);
        setTotalPages(data.total_pages);
      })
      .catch(err => console.log(err));
  }, [page, searchPeriod]);

  const handleParamsChange = e => {
    history.push({
      ...location,
      search: `trending=${e.target.value}&page=1`,
    });
    setSearchPeriod(e.target.value);
    setPage(1);
  };

  const handlePageChange = e => {
    const action = e.target.dataset.action;
    let newPage;
    action === 'decrement'
      ? (newPage = Number(page) - 1)
      : (newPage = Number(page) + 1);

    setPage(newPage);
    history.push({
      ...location,
      search: `trending=${searchPeriod}&page=${newPage}`,
    });
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

      {movies && movies.length && (
        <>
          <Gallery
            movies={movies}
            location={location}
            keyWord={'trending'}
          ></Gallery>
          <Pagination
            page={page}
            totalPages={totalPages}
            onClick={handlePageChange}
            movies={movies}
          />
        </>
      )}
    </>
  );
}

export default HomePage;
