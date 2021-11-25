import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import * as fetchMoviesAPI from '../../services/serviceAPI';

function Cast() {
  const {
    params: { movieId },
  } = useRouteMatch();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMoviesAPI
      .fetchMovieCast({ movieId })
      .then(data => setCast(data.cast))
      .catch(err => console.log(err));
  }, [movieId]);

  return (
    <div className="movieCard">
      <h3>CAST</h3>
      <p>bla-bla</p>{' '}
      {cast && (
        <ul>
          {cast.map(el => (
            <li key={el.id}>{el.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { Cast };
