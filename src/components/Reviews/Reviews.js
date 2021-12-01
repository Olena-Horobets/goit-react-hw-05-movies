import s from './Reviews.module.css';
import { ReactComponent as ReactSprite } from '../../images/sprite.svg';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ShortenTextHook } from 'hooks/shortenTextHook';
import { fetchMovieReviews } from 'services/serviceAPI';
import { parseSlug } from 'services/serviceSlugify';
import { getDateString } from 'services/serviceDateHandler';

function Reviews() {
  const { slug } = useParams();
  const movieId = parseSlug(slug);

  const [reviews, setReviews] = useState([]);
  const [reviewId, setReviewId] = useState(0);
  const [review, setReview] = useState(null);

  useEffect(() => {
    fetchMovieReviews({ movieId })
      .then(data => setReviews(data.results))
      .catch(err => console.log(err));
  }, [movieId]);

  useEffect(() => {
    setReview(reviews.find((el, idx) => idx === reviewId));
  }, [reviewId, reviews]);

  const onChangeReview = e => {
    if (e.target.dataset['action'] === 'previous') {
      setReviewId(prev => {
        return prev >= 1 ? prev - 1 : reviews.length - 1;
      });
    } else {
      setReviewId(prev => {
        return prev < reviews.length - 1 ? prev + 1 : 0;
      });
    }
  };

  return review ? (
    <div className={s.wrapper}>
      <ReactSprite />
      <div>
        <h4 className={s.title}>
          <a
            href={review.url}
            className={s.subtitle}
            target="_blank"
            rel="noreferrer"
          >
            {review.author}
          </a>
          <span>{getDateString(review.created_at)}</span>
        </h4>
        <ShortenTextHook
          string={review.content}
          length={500}
          styledClass={s.text}
          backup="sorry, this review was empty"
        />
      </div>

      {/* slider for more than one review */}
      {reviews.length > 1 && (
        <>
          <button
            className={s.leftSwipeBtn}
            type="button"
            onClick={onChangeReview}
            data-action="previous"
          >
            <svg width="30" height="30">
              <use href="#icon-arrow-left"></use>
            </svg>
          </button>
          <button
            className={s.rightSwipeBtn}
            type="button"
            onClick={onChangeReview}
            data-action="next"
          >
            <svg width="30" height="30">
              <use href="#icon-arrow-right"></use>
            </svg>
          </button>
        </>
      )}
    </div>
  ) : (
    <p>no reviews are given yet</p>
  );
}

export default Reviews;
