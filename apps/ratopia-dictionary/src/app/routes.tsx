import { ReactNode } from "react";
import * as React from "react";
import TradersPage from "./pages/traders-page/traders-page";
import StatisticPage from "./pages/statistic-page/statistic-page";

interface Route {
  element: ReactNode;
  name: string;
  path: string;
  icon: string;
}

export const ROUTES: Route[] = [
  {
    path: '/traders',
    name: 'Traders',
    icon: '/assets/struct/Icon_CommercialLaw.png',
    element: <TradersPage />
  },
  {
    path: '/statistic',
    name: 'Statistic',
    icon: '/assets/struct/Icon_Statistics.png',
    element: <StatisticPage />
  }
];