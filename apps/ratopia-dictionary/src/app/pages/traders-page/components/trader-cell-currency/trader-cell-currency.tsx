import { ITradeResource } from "../../../../services/game-store";
import TraderCellResource from "../trader-cell-resource/trader-cell-resource";
import { getCountryIcon } from "../../../../services/countries";

export interface TraderCellCurrencyProps {
  item: ITradeResource;
}

export function TraderCellCurrency({ item }: TraderCellCurrencyProps) {
  return (
    <TraderCellResource
      name={item.type}
      icon={`/assets/struct/${item.type}.png`}
    />
  );
}

export default TraderCellCurrency;
