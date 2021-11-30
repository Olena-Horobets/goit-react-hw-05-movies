import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchMovieReviews } from 'services/serviceAPI';
import { parseSlug } from 'services/serviceSlugify';
import { Button } from 'components/Button/Button';

function Reviews() {
  const { slug } = useParams();
  const movieId = parseSlug(slug);

  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    showAll
      ? setVisibleReviews(reviews)
      : setVisibleReviews(reviews.slice(0, 1));
  }, [reviews, showAll]);

  useEffect(() => {
    fetchMovieReviews({ movieId })
      .then(data => {
        setReviews(data.results);
        if (data.results.length > 1) setShowAll(false);
      })
      .catch(err => console.log(err));
  }, [movieId]);

  return (
    <>
      {reviews && reviews.length ? (
        <>
          <ul>
            {visibleReviews.map(el => (
              <li key={el.id}>
                <h4>{el.author}</h4>
                <p>{el.content}</p>
              </li>
            ))}
          </ul>
          {reviews.length !== 1 && (
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
        <p>no reviews are given yet</p>
      )}
    </>
  );
}

export default Reviews;
