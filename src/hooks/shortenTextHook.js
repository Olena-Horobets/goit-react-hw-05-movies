import { useState, useEffect } from 'react';
import { Button } from 'components/Button/Button';

function ShortenTextHook({ string, length, styledClass, backup }) {
  const [wholeString, setWholeString] = useState('');
  const [visibleString, setVisibleString] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    string ? setWholeString(string) : setWholeString(backup);
    string?.length > length ? setShowAll(false) : setShowAll(true);
  }, [backup, length, string]);

  useEffect(() => {
    showAll
      ? setVisibleString(wholeString)
      : setVisibleString(`${wholeString.slice(0, length)}...`);
  }, [length, showAll, wholeString]);

  return (
    <>
      <p className={styledClass}>{visibleString}</p>

      {wholeString.length > length && (
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
  );
}

export { ShortenTextHook };
