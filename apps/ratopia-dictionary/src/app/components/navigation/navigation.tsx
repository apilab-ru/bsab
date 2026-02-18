import './navigation.scss';
import { ROUTES } from "../../routes";
import { NavLink } from "react-router-dom";

/* eslint-disable-next-line */
export interface NavigationProps {}

export function Navigation(props: NavigationProps) {
  return (
    <div className="navigation" role="navigation">
      <img className="navigation__logo" src="/assets/struct/home.png" />

      <ul className="navigation__menu">
        { ROUTES.map(route =>
          <li key={ route.path } title={ route.name }>
            <NavLink to={ route.path }>
              <img className="navigation__icon" src={ route.icon } />
            </NavLink>
          </li>
        ) }
      </ul>
    </div>
  );
}

export default Navigation;
