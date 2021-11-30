import s from './Pagination.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { Button } from 'components/Button/Button';

function Pagination({ page, totalPages, onClick }) {
  return (
    <div className={s.pagination}>
      <Button
        type="button"
        styledClass="btn"
        dataAction="decrement"
        disabled={page === 1}
        onClick={onClick}
        text="prev page"
      />
      {page ? (
        <span className={s.text}>{page}</span>
      ) : (
        <Loader type="Circles" color="#FFFFFFbb" height={30} width={30} />
      )}

      <Button
        type="button"
        styledClass="btn"
        dataAction="increment"
        disabled={page >= totalPages}
        onClick={onClick}
        text="next page"
      />
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export { Pagination };
