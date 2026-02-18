import styles from './layout.module.scss';
import { ReactNode } from "react";
import { ROUTES } from "../../routes";
import { Link, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme/theme";
import Navigation from "../navigation/navigation";

export interface LayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.layout}>
        <Navigation />

        <div className={styles.content}>
          <Routes>
            { ROUTES.map(route =>
              <Route
                key={route.path}
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
