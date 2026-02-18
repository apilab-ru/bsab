import styles from './country-stocks-row.module.scss';
import { ReactNode } from "react";
import { IResource } from "../../../../services/game-store";
import { ALL_RES_LIST } from "../../../../models/res-list";
import StockItem from "../stock-item/stock-item";
import { Button } from "@mui/material";

export interface CountryStocksRowProps {
  children: ReactNode;
  resources: IResource[];
  updateList: (resources: IResource[]) => void;
}

export function CountryStocksRow({children, resources, updateList}: CountryStocksRowProps) {
  const existed = resources.map(it => it.resource);

  const addResource = () => {
    updateList([
      ...resources,
      {
        resource: ALL_RES_LIST.find(it => !existed.includes(it))!,
        cost: 0
      }
    ])
  }

  const updateResource = (key: string, res: IResource) => {
    updateList(
      resources.map(it => it.resource === key ? res : it)
    )
  }

  const deleteResource = (key: string) => updateList(
    resources.filter(it => it.resource !== key)
  )

  const getAvailableResources = (key: string) => ALL_RES_LIST.filter(it => it === key || !existed.includes(it));

  return (
    <div className={ styles.stocksRow }>
      <div className={ styles.stocksRowTitle }>
        { children }
      </div>
      { resources.map(resource =>
        <StockItem
          key={ resource.resource }
          className={ styles.stocksRowItem }
          resource={ resource }
          resources={ getAvailableResources(resource.resource) }
          updateResource={ res => updateResource(resource.resource, res) }
          deleteResource={ () => deleteResource(resource.resource) }
        />
      ) }
      <Button className={ styles.stocksRowAdd } onClick={ addResource } variant="contained">add stock</Button>
    </div>
  );
}

export default CountryStocksRow;
