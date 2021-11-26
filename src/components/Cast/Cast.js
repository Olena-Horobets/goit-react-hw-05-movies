import s from './Cast.module.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchMovieCast } from '../../services/serviceAPI';
import { parseSlug } from '../../services/serviceSlugify';

function Cast() {
  const { slug } = useParams();
  const movieId = parseSlug(slug);

  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast({ movieId })
      .then(data => setCast(data.cast))
      .catch(err => console.log(err));
  }, [movieId]);

  return (
    <>
      {cast && cast.length ? (
        <ul>
          {cast.map(el => (
            <li key={el.id} className={s.castItem}>
              {el.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>currently there is no info</p>
      )}
    </>
  );
}

export default Cast;
