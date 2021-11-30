import s from './Cast.module.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchMovieCast } from 'services/serviceAPI';
import { parseSlug } from 'services/serviceSlugify';
import { Button } from 'components/Button/Button';

function Cast() {
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
                {el.name}
              </li>
            ))}
          </ul>
          {cast.length !== 10 && (
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
