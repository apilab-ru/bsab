import { createContext } from "react";
import { TradersStore } from "./services/traders-store";

export const TradersContext = createContext<TradersStore | null>(null)