import s from './Button.module.css';

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

export { Button };
