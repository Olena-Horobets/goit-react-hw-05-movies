import 'components/Navigation/Navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/" exact className="link" activeClassName="activeLink">
        Main
      </NavLink>
      <NavLink to="/authors" className="link" activeClassName="activeLink">
        Authors
      </NavLink>
      <NavLink to="/books" className="link" activeClassName="activeLink">
        Books
      </NavLink>
    </nav>
  );
};

export { Navigation };
