import { ITradeResource } from "../../../../services/game-store";
import { getCountryIcon } from "../../../../services/countries";
import TraderCellResource from "../trader-cell-resource/trader-cell-resource";

export interface TraderCellCountryProps {
  item: ITradeResource;
}

export function TraderCellCountry({ item }: TraderCellCountryProps) {
  return (
    <TraderCellResource
      name={item.country}
      icon={getCountryIcon(item.country)}
    />
  );
}

export default TraderCellCountry;
