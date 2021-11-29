import s from 'components/Navigation/Navigation.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <NavLink
        to={{ pathname: '/', search: 'trending=day&page=1' }}
        exact
        className={s.link}
        activeClassName={s.activeLink}
      >
        Home
      </NavLink>
      <NavLink
        to={{ pathname: '/movies' }}
        exact
        className={s.link}
        activeClassName={s.activeLink}
      >
        Search movies
      </NavLink>
    </nav>
  );
};

export { Navigation };
