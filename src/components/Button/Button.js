import s from './Button.module.css';
import { ReactComponent as ReactSprite } from '../../images/sprite.svg';

import PropTypes from 'prop-types';

function Button({
  type,
  styledClass,
  onClick,
  text = '',
  disabled = false,
  dataAction = null,
  icon = '',
}) {
  return (
    <>
      <ReactSprite />
      <button
        type={type}
        className={s[styledClass]}
        onClick={onClick}
        disabled={disabled}
        data-action={dataAction}
      >
        {text}
        {icon && (
          <svg width="30" height="30">
            <use href={icon}></use>
          </svg>
        )}
      </button>
    </>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  styledClass: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  dataAction: PropTypes.string,
  icon: PropTypes.string,
};

export { Button };
