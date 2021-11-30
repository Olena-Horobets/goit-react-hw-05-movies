import s from './ActorPage.module.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCastById } from '../../services/serviceAPI';
import { parseSlug } from 'services/serviceSlugify';
// import { Button } from 'components/Button/Button';

function ActorPage() {
  const { slug } = useParams();
  const castId = parseSlug(slug);

  const [cast, setCast] = useState(null);

  useEffect(() => {
    fetchCastById({ castId }).then(setCast);
  }, [castId]);

  return (
    <>
      {cast && (
        <>
          {/* {console.log(cast)} */}
          <h2>{cast.name}</h2>
          <p>{cast.biography}</p>
        </>
      )}
    </>
  );
}

export default ActorPage;
