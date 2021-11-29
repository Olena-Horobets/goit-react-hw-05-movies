import s from './Pagination.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Loader from 'react-loader-spinner';

function Pagination({ page, totalPages, onClick }) {
  return (
    <div className={s.pagination}>
      <button
        type="button"
        className={s.btn}
        data-action="decrement"
        disabled={page === 1}
        onClick={onClick}
      >
        prev page
      </button>
      {page ? (
        <span className={s.text}>{page}</span>
      ) : (
        <Loader type="Circles" color="#FFFFFFbb" height={30} width={30} />
      )}

      <button
        type="button"
        className={s.btn}
        data-action="increment"
        disabled={page >= totalPages}
        onClick={onClick}
      >
        next page
      </button>
    </div>
  );
}

export { Pagination };
