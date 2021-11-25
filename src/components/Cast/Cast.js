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
    <div className="movieCard">
      <h3>CAST</h3>

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
