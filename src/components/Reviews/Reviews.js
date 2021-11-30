import s from './Reviews.module.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchMovieReviews } from 'services/serviceAPI';
import { parseSlug } from 'services/serviceSlugify';
import { Button } from 'components/Button/Button';
import { ReactComponent as ReactSprite } from '../../images/sprite.svg';

function Reviews() {
  const { slug } = useParams();
  const movieId = parseSlug(slug);

  const [reviews, setReviews] = useState([]);
  const [visibleReview, setVisibleReview] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [review, setReview] = useState(null);
  const [reviewId, setReviewId] = useState(0);

  useEffect(() => {
    fetchMovieReviews({ movieId })
      .then(data => {
        setReviews(data.results);
      })
      .catch(err => console.log(err));
  }, [movieId]);

  useEffect(() => {
    setReview(reviews.find((el, idx) => idx === reviewId));
  }, [reviewId, reviews]);

  useEffect(() => {
    if (!review) return;

    review.content.length > 600 ? setShowAll(false) : setShowAll(true);
  }, [review]);

  useEffect(() => {
    showAll
      ? setVisibleReview(review)
      : setVisibleReview({
          ...review,
          content: `${review.content.slice(0, 600)}...`,
        });
  }, [review, showAll]);

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

  const getDateString = data => {
    const string = new Date(data);
    const date = string.getDate();
    const month = string.getMonth();
    const year = string.getFullYear();

    return `${date} / ${month + 1} / ${year}`;
  };

  return visibleReview ? (
    <div className={s.wrapper}>
      <ReactSprite />
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
      <div>
        <h4 className={s.title}>
          <a
            href={visibleReview.url}
            className={s.subtitle}
            target="_blank"
            rel="noreferrer"
          >
            {visibleReview.author}
          </a>
          <span>{getDateString(visibleReview.created_at)}</span>
        </h4>
        <p className={s.text}>{visibleReview.content}</p>
      </div>
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
      {review.content.length >= 600 && (
        <Button
          type="button"
          styledClass="showAll"
          onClick={() => {
            setShowAll(prev => !prev);
          }}
          text={showAll ? '...hide' : '...show more'}
        />
      )}
    </div>
  ) : (
    <p>no reviews are given yet</p>
  );
}

export default Reviews;
