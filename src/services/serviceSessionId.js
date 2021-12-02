import { useState } from 'react';
import { getGuestSessionId, postMovieRate } from 'services/serviceAPI';
import { ReactComponent as ReactSprite } from '../images/sprite.svg';

(function fetchSessionId() {
  const getNewSession = () => {
    getGuestSessionId().then(data =>
      localStorage.setItem('session', JSON.stringify(data)),
    );
  };

  const session = JSON.parse(localStorage.getItem('session'));
  if (!session) {
    getNewSession();
  } else {
    const dateNow = new Date();
    const expireDate = new Date(session.expires_at);
    dateNow >= expireDate ?? getNewSession();
  }
})();

const getMySessionId = (key, defaultValue) => {
  const session = JSON.parse(localStorage.getItem(key));
  return session?.guest_session_id || defaultValue;
};

function RateMovieHook({ movieId }) {
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
          width="18"
          height="18"
          datavalue={i + 1}
          onMouseOver={!isRated ? onChangeValue : null}
          onMouseLeave={() => setValue(1)}
          onClick={!isRated ? onSubmitValue : null}
          style={{ fill: '#ff4c29', margin: 2 }}
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
    <div
      style={{
        width: 250,
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
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
      <p style={{ marginTop: 20 }}>{generateStars()}</p>
    </div>
  );
}

export { RateMovieHook };
