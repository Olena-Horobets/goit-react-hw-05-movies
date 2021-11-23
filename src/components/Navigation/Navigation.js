import 'components/Navigation/Navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/" exact className="link" activeClassName="activeLink">
        Home
      </NavLink>
      <NavLink to="/movies" className="link" activeClassName="activeLink">
        Search movies
      </NavLink>
    </nav>
  );
};

export { Navigation };
