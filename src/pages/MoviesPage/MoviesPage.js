import s from './MoviesPage.module.css';

import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';

import { fetchMovieByQuery } from 'services/serviceAPI';
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

function MoviesPage() {
  const history = useHistory();
  const location = useLocation();

  const [query, setQuery] = useState(
    () => new URLSearchParams(location?.search)?.get('query') || '',
  );
  const [page, setPage] = useState(
    () => Number(new URLSearchParams(location?.search)?.get('page')) || 1,
  );
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!location.search) return;
    setQuery(new URLSearchParams(location.search).get('query'));
    setPage(Number(new URLSearchParams(location.search).get('page')));
  }, [location]);

  useEffect(() => {
    if (!query.trim().length) {
      setMovies([]);
      return;
    }

    fetchMovieByQuery({ query, page })
      .then(data => {
        setMovies(data.results);
        smoothScrollingTo(data.results[0].id);
        setTotalPages(data.total_pages);
      })
      .catch(err => console.log(err));
  }, [page, query]);

  const onInputChange = e => {
    setQuery(e.target.value);
    setPage(1);
    const query = e.target.value.trim().toLowerCase();

    history.push({
      ...location,
      search: `query=${query}&page=1`,
    });
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
      search: `query=${query}&page=${newPage}`,
    });
  };

  const onClearBtnClick = () => {
    setQuery('');
    history.push({
      ...location,
      search: `query=&page=1`,
    });
  };

  return (
    <>
      <form className={s.form}>
        <input
          className={s.input}
          value={query}
          onChange={onInputChange}
          autoComplete="off"
          autoFocus
        ></input>
        <div className={s.wrapper}>
          <button
            type="button"
            className={!query.length ? s.clearBtn : s.activeClearBtn}
            onClick={onClearBtnClick}
          >
            clear
          </button>
        </div>
      </form>
      {movies.length ? (
        <>
          <Gallery
            movies={movies}
            location={location}
            keyWord={'search'}
          ></Gallery>
          <Pagination
            page={page}
            totalPages={totalPages}
            onClick={handlePageChange}
            movies={movies}
          />
        </>
      ) : (
        <p className={s.searchRequest}>...enter your query</p>
      )}
    </>
  );
}

export default MoviesPage;
