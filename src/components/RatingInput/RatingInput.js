import s from './RatingInput.module.css';
import 'services/serviceSessionId.js';

import { useState } from 'react';
import { postMovieRate } from 'services/serviceAPI';
import { ReactComponent as ReactSprite } from 'images/sprite.svg';
import PropTypes from 'prop-types';

const getMySessionId = (key, defaultValue) => {
  const session = JSON.parse(localStorage.getItem(key));
  return session?.guest_session_id || defaultValue;
};

function RatingInput({ movieId }) {
  const emptyStar = '#icon-star-empty';
  const fullStar = '#icon-star-full';

  const [value, setValue] = useState(1);
  const [isRated, setIsRated] = useState(false);
  const [myRate, setMyRate] = useState(1);

  const onChangeValue = e => {
    setValue(e.currentTarget.getAttribute('datavalue'));
  };

  const onSubmitValue = e => {
    postMovieRate({ movieId, sessionId: getMySessionId('session', ''), value })
      .then(data => {
        if (data.success) {
          setIsRated(true);
          setMyRate(value);
        } else throw new Error();
      })
      .catch(err => console.log(err));
  };

  const generateStars = () => {
    let arr = [];
    for (let i = 0; i < 10; i += 1) {
      const star = (
        <svg
          key={`star-${i}`}
          datavalue={i + 1}
          onMouseOver={!isRated ? onChangeValue : null}
          onMouseLeave={() => setValue(1)}
          onClick={!isRated ? onSubmitValue : null}
          className={s.starIcon}
        >
          <use
            href={
              isRated
                ? myRate - 1 < i
                  ? emptyStar
                  : fullStar
                : value - 1 < i
                ? emptyStar
                : fullStar
            }
          ></use>
        </svg>
      );
      arr.push(star);
    }
    return arr;
  };

  return (
    <div className={s.ratingWrapper}>
      <ReactSprite />
      <label htmlFor="rating">
        {isRated
          ? `Your rate is ${myRate} stars`
          : 'How do you like this movie'}
        <input
          type="range"
          id="rating"
          name="rating"
          min="1"
          max="10"
          value={isRated ? myRate : value}
          step="1"
          readOnly
          className="hidden"
        />
      </label>
      <p className={s.ratingStars}>{generateStars()}</p>
    </div>
  );
}

RatingInput.propTypes = {
  movieId: PropTypes.string,
};

export { RatingInput };
