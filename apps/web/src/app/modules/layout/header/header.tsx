import React, { FC, ReactNode, useState } from 'react';
import styles from './header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { UserState } from "../../../store/user/store";
import Button from "@mui/material/Button";
import { Auth } from "../../user/auth/auth";

interface HeaderProps {
  children?: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  const { user } = useSelector<RootState, UserState>((state) => state.user);

  const [isAuthOpen, setAuthOpen] = useState(false);

  const login = () => setAuthOpen(true);
  const closeLogin = () => setAuthOpen(false);

  return (
    <div className={styles.header}>
      <div className={styles.row}>
        <Link className={styles.title} to={'/'}>BeatSaber Maps</Link>
      </div>
      <div className={styles.content}>
        {children}
      </div>
      <div className={styles.row}>
        { user &&
          <NavLink
            className={isActive  => isActive ? styles.profileActive : styles.profile}
            to='/profile'>
            Profile { user.name }
          </NavLink >
        }
        { !user &&
          <Button onClick={login} variant="contained">
            Login
          </Button>
        }
      </div>
      <Auth isOpened={isAuthOpen} handleClose={closeLogin}/>
    </div>
  );
};

export default Header;
