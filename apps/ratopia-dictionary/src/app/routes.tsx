import Home from "./pages/home/home";
import { ReactNode } from "react";
import * as React from "react";
import Resources from "./pages/resources/resources";
import SetupPage from "./pages/setup/setupPage";
import TradersPage from "./pages/traders-page/traders-page";
import ConnectPage from "./pages/connect-page/connect-page";

interface Route {
  element: ReactNode;
  name: string;
  path: string;
}

export const ROUTES: Route[] = [
  {
    path: '/',
    name: 'Home',
    element: <Home />
  },
  {
    path: '/resources',
    name: 'Resources',
    element: <Resources />
  },
  {
    path: '/setup',
    name: 'Setup',
    element: <SetupPage />
  },
  {
    path: '/traders',
    name: 'Traders',
    element: <TradersPage />
  },
  {
    path: '/connect',
    name: 'Connect',
    element: <ConnectPage />
  }
];