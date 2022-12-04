import React, { FC, ReactNode } from 'react';
import styles from './header.module.scss';
import { Link, NavLink } from 'react-router-dom';

interface HeaderProps {
  children?: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <div className={styles.header}>
      <div className={styles.row}>
        <Link className={styles.title} to={'/'}>BeatSaber Maps</Link>
      </div>
      <div className={styles.content}>
        {children}
      </div>
      <div className={styles.row}>
        <NavLink
          className={isActive  => isActive ? styles.profileActive : styles.profile}
          to='/profile'>
          Profile
        </NavLink >
      </div>
    </div>
  );
};

export default Header;
