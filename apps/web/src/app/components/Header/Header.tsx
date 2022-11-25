import React, { FC, ReactNode } from 'react';
import './Header.scss';

interface HeaderProps {
  children?: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <div className="Header">
      <div className="content">
        <div className="title">BeatSaber Maps</div>
        {children}
      </div>
    </div>
  );
};

export default Header;
