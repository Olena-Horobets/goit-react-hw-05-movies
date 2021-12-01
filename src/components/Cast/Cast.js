import s from './Cast.module.css';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link, useParams } from 'react-router-dom';

import { fetchMovieCast } from 'services/serviceAPI';
import { getSlug, parseSlug } from 'services/serviceSlugify';
import { Button } from 'components/Button/Button';

function Cast() {
  const location = useLocation();

  const { slug } = useParams();
  const movieId = parseSlug(slug);

  const [cast, setCast] = useState([]);
  const [visibleCast, setVisibleCast] = useState([]);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    showAll ? setVisibleCast(cast) : setVisibleCast(cast.slice(0, 10));
  }, [cast, showAll]);

  useEffect(() => {
    fetchMovieCast({ movieId })
      .then(data => {
        setCast(data.cast);
        if (data.cast.length > 10) setShowAll(false);
      })
      .catch(err => console.log(err));
  }, [movieId]);

  return (
    <>
      {cast && cast.length ? (
        <>
          <ul>
            {visibleCast.map(el => (
              <li key={el.id} className={s.castItem}>
                <Link
                  className={s.castLink}
                  to={{
                    pathname: `/actors/${getSlug(el)}`,
                    state: { from: location, keyWord: 'movie' },
                  }}
                >
                  {el.name}
                </Link>
              </li>
            ))}
          </ul>
          {cast.length > 10 && (
            <Button
              type="button"
              styledClass="showAll"
              onClick={() => {
                setShowAll(prev => !prev);
              }}
              text={showAll ? '...hide' : '...show more'}
            />
          )}
        </>
      ) : (
        <p>currently there is no info</p>
      )}
    </>
  );
}

export default Cast;
