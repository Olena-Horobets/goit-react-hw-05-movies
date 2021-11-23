import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import * as fetchMoviesAPI from '../../services/serviceAPI';

function Reviews() {
  const {
    params: { movieId },
  } = useRouteMatch();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMoviesAPI
      .fetchMovieReviews({ movieId })
      .then(data => setReviews(data.results));
  }, [movieId]);

  return (
    <div className="movieCard">
      <h3>Reviews</h3>
      <p>bla-bla-bla-bla</p>
      {reviews && reviews.length ? (
        <ul>
          {reviews.map(el => (
            <li key={el.id}>
              <h4>{el.author}</h4>
              <p>{el.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>sorry, there are no reviews</p>
      )}
    </div>
  );
}

export { Reviews };
