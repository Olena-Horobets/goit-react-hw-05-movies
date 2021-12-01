import s from './ActorPage.module.css';
import fallbackPhoto from 'images/fallbackPhoto.jpg';

import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import { fetchCastById } from '../../services/serviceAPI';
import { parseSlug } from 'services/serviceSlugify';
import { getDateString } from 'services/serviceDateHandler';
import { IMG_URL, STATUS } from 'utils/constants';

import Loader from 'components/Loader';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { Button } from 'components/Button/Button';

function ActorPage() {
  const location = useLocation();
  const history = useHistory();
  const pastHistory = location?.state?.from;
  const keyWord = location?.state?.keyWord;

  const { slug } = useParams();
  const castId = parseSlug(slug);

  const [status, setStatus] = useState(STATUS.IDLE);
  const [actor, setActor] = useState({});

  useEffect(() => {
    setStatus(STATUS.PENDING);
    fetchCastById({ castId })
      .then(data => setActor(data), setStatus(STATUS.RESOLVED))
      .catch(err => setStatus(STATUS.REJECTED));
  }, [castId]);

  const onGoBackClick = e => {
    history.push(pastHistory);
  };

  if (status === STATUS.RESOLVED) {
    return (
      <div className={s.container}>
        {pastHistory && (
          <Button
            styledClass="backBtn"
            type="button"
            onClick={onGoBackClick}
            text={`back to ${keyWord}`}
          />
        )}

        <h2 className="title">{actor.name}</h2>
        <div className={s.wrapper}>
          <div className={s.castImageThumb}>
            <img
              className={s.castImage}
              src={
                actor.profile_path
                  ? `${IMG_URL}${actor.profile_path}`
                  : `${fallbackPhoto}`
              }
              alt={actor.name}
            ></img>
          </div>

          <div className={s.info}>
            <p>
              {`Born - ${getDateString(actor.birthday)}`}
              {actor.deathday && (
                <span className={s.deathDate}>{`Died - ${getDateString(
                  actor.deathday,
                )}`}</span>
              )}
            </p>
            <p>{actor.place_of_birth}</p>
            <p className={s.biography}>{actor.biography}</p>
            {actor.homepage && (
              <a
                href={actor.homepage}
                className={s.homepage}
                target="_blank"
                rel="noreferrer"
              >
                {`link to ${actor.name}'s website`}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (status === STATUS.REJECTED) {
    return <ErrorMessage></ErrorMessage>;
  }

  if (status === STATUS.PENDING) {
    return <Loader></Loader>;
  }

  if (status === STATUS.IDLE) {
    return <div className={s.container}></div>;
  }
}

export default ActorPage;
