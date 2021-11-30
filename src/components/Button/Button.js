import s from './Button.module.css';

import PropTypes from 'prop-types';

function Button({
  type,
  styledClass,
  onClick,
  text,
  disabled = false,
  dataAction = null,
}) {
  return (
    <button
      type={type}
      className={s[styledClass]}
      onClick={onClick}
      disabled={disabled}
      data-action={dataAction}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  styledClass: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  dataAction: PropTypes.string,
};

export { Button };
