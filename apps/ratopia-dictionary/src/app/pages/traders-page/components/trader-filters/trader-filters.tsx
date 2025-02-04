import FormControl from '@mui/material/FormControl';
import styles from './trader-filters.module.scss';
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import {CurrencyType, TradeDirection} from "../../../../services/game-store";
import { useContext, useState } from "react";
import { TradersContext } from "../../traders-context";
import { observer } from "mobx-react";
import { useChangeInput } from "@shared/forms/use-change-input";
import { ITradersFilter } from "../../services/traders-store";

function TraderFilters() {
  const context = useContext(TradersContext)!;
  const [{ filter }] = useState(context);

  const handleChange = (key: keyof ITradersFilter) => useChangeInput(value => {
    context.updateFilter({ [key]: value });
  })

  return (
    <div className={styles.traderFilters}>
      <FormControl className={styles.traderFiltersCurrency}>
        <InputLabel>Currency</InputLabel>
        <Select
          value={filter.type}
          label="Age"
          onChange={handleChange('type')}
        >
          <MenuItem value={'all'}>All</MenuItem>
          <MenuItem value={CurrencyType.gold}>Gold</MenuItem>
          <MenuItem value={CurrencyType.dar}>Dar</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={styles.traderFiltersCurrency}>
        <InputLabel>Direction</InputLabel>
        <Select
          value={filter.direction}
          label="Direction"
          onChange={handleChange('direction')}
        >
          <MenuItem value={'all'}>All</MenuItem>
          <MenuItem value={TradeDirection.import}>Import</MenuItem>
          <MenuItem value={TradeDirection.export}>Export</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <TextField
          label="Resource"
          InputLabelProps={{ shrink: true }}
          value={filter.resource}
          onChange={handleChange('resource')}
        />
      </FormControl>
    </div>
  );
}

export default observer(TraderFilters);
