import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchMovieReviews } from '../../services/serviceAPI';
import { parseSlug } from '../../services/serviceSlugify';

function Reviews() {
  const { slug } = useParams();
  const movieId = parseSlug(slug);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews({ movieId })
      .then(data => setReviews(data.results))
      .catch(err => console.log(err));
  }, [movieId]);

  return (
    <div className="movieCard">
      <h3>Reviews</h3>

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
        <p>no reviews</p>
      )}
    </div>
  );
}

export default Reviews;
