import s from './ActorPage.module.css';
import { IMG_URL } from 'utils/constants';
import fallbackPhoto from 'images/fallbackPhoto.jpg';

import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import { fetchCastById } from '../../services/serviceAPI';
import { parseSlug } from 'services/serviceSlugify';
import { getDateString } from 'services/serviceDateHandler';
import { Button } from 'components/Button/Button';

function ActorPage() {
  const location = useLocation();
  const history = useHistory();
  const pastHistory = location?.state?.from;
  const keyWord = location?.state?.keyWord;

  const { slug } = useParams();
  const castId = parseSlug(slug);

  const [cast, setCast] = useState(null);

  useEffect(() => {
    fetchCastById({ castId })
      .then(setCast)
      .catch(err => console.log(err));
  }, [castId]);

  const onGoBackClick = e => {
    history.push(pastHistory);
  };

  return (
    <>
      {cast && (
        <div className={s.container}>
          {pastHistory && (
            <Button
              styledClass="backBtn"
              type="button"
              onClick={onGoBackClick}
              text={`back to ${keyWord}`}
            />
          )}

          <h2 className="title">{cast.name}</h2>
          <div className={s.wrapper}>
            <div className={s.castImage}>
              <img
                src={
                  cast.profile_path
                    ? `${IMG_URL}${cast.profile_path}`
                    : `${fallbackPhoto}`
                }
                alt={cast.name}
              ></img>
            </div>

            <div className={s.info}>
              <p>
                {`Born ${getDateString(cast.birthday)}`}
                {cast.deathday && (
                  <span className={s.deathDate}>{`Died ${getDateString(
                    cast.deathday,
                  )}`}</span>
                )}
              </p>
              <p>{cast.place_of_birth}</p>
              <p className={s.biography}>{cast.biography}</p>
              {cast.homepage && (
                <a href={cast.homepage} className={s.homepage}>
                  {`link to ${cast.name}'s website`}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ActorPage;
