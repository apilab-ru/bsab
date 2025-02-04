import styles from './layout.module.scss';
import { ReactNode } from "react";
import { ROUTES } from "../../routes";
import { Link, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme/theme";

export interface LayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.layout}>
        <div className={styles.navigation} role="navigation">
          <img className={styles.logo} src="/assets/struct/Building_Flaghanger.png" />
          <ul className={styles.menu}>
            { ROUTES.map(route =>
              <li><Link to={ route.path }>{ route.name }</Link></li>
            ) }
          </ul>
        </div>
        <div className={styles.content}>
          <Routes>
            { ROUTES.map(route =>
              <Route
                path={ route.path }
                element={route.element}
              />
            ) }
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Layout;
