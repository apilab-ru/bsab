import { ITradeResource } from "../../../../services/game-store";
import TraderCellResource from "../trader-cell-resource/trader-cell-resource";
import { getResourceIcon } from "../../../../conts/res-list";

export interface TraderCellStockProps {
  item: ITradeResource;
}

export function TraderCellStock({ item }: TraderCellStockProps) {
  return (
    <TraderCellResource
      name={item.resource}
      icon={getResourceIcon(item.resource)}
    />
  );
}

export default TraderCellStock;
