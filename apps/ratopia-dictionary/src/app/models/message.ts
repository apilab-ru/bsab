import { City } from "./city.model";

export interface MessageTrades {
  event: 'trades';
  payload: City[];
}

export interface MessageCurrency {
  event: 'currency';
  payload: number;
}

export type Message = MessageTrades | MessageCurrency;