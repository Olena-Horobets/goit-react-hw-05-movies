import s from './Gallery.module.css';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getSlug } from 'services/serviceSlugify';
import { MovieCard } from 'components/MovieCard/MovieCard';

function Gallery({ movies, location, keyWord }) {
  return (
    <>
      <ul className={s.gallery}>
        {movies.map(el => (
          <li className={s.galleryItem} id={el.id} key={el.id}>
            <Link
              className={s.galleryLink}
              to={{
                pathname: `/movies/${getSlug(el)}`,
                state: { from: location, keyWord },
              }}
            >
              <MovieCard movie={el} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

Gallery.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })),
  location: PropTypes.shape({}),
  keyWord: PropTypes.string,
};

export { Gallery };
