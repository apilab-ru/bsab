import styles from './header.module.scss';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FC, ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <div className={styles.header}>
      <div className={styles.navigation}>
        <Link className={styles.link} to="/">
          <Button variant="contained">PlayLists</Button>
        </Link>
        <Link className={styles.link} to="/maps">
          <Button variant="contained">Maps</Button>
        </Link>
      </div>

      <div className={styles.content}>
        {children}
      </div>

      <div className={styles.navigation}/>
    </div>
  );
}

export default Header;
