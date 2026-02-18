import styles from './traders-table.module.scss';
import { observer } from "mobx-react";
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { useContext, useState } from "react";
import { ITradeResource } from "../../../../services/game-store";
import TraderCellCountry from "../trader-cell-country/trader-cell-country";
import TraderCellStock from "../trader-cell-stock/trader-cell-stock";
import TraderCellCurrency from "../trader-cell-currency/trader-cell-currency";
import TraderFilters from "../trader-filters/trader-filters";
import { TradersContext } from "../../traders-context";

export interface TradersTableProps {
  className?: string;
}

const columns: GridColDef[] = [
  { field: 'direction', headerName: 'Direction', width: 70 },
  {
    field: 'country',
    headerName: 'Country',
    width: 130,
    renderCell: params => <TraderCellCountry item={params.row}/>
  },
  {
    field: 'resource',
    headerName: 'Resource',
    width: 130,
    renderCell: params => <TraderCellStock item={params.row}/>
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 130,
    renderCell: params => <TraderCellCurrency item={params.row}/>
  },
  { field: 'cost', headerName: 'Cost', width: 130 },
  { field: 'costGold', headerName: 'CostGold', width: 130 }
]

const getRowId = (row: ITradeResource) => `${row.country}_${row.resource}`;

function TradersTable({ className }: TradersTableProps) {
  const context = useContext(TradersContext)!;

  const filtered = useState(context)[0].filteredTradeResources;

  const handleCellClick = (param: GridCellParams) => {
    if (param.field === 'resource') {
      context.updateFilter({
        resource: param.row.resourceName.toLowerCase(),
      })
    }
  }

  return (
    <div className={styles.tradersTable + ' ' + className}>
      <TraderFilters />
      <DataGrid
        className={styles.tradersTableGrid}
        checkboxSelection={false}
        onCellClick={handleCellClick}
        rows={filtered}
        getRowId={getRowId}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 50 },
          },
        }}
        pageSizeOptions={[30, 50, 100]}
      />
    </div>
  );
}

export default observer(TradersTable);
