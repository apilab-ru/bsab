import styles from './currency.module.scss';
import { observer } from "mobx-react";
import React, { useState } from "react";
import { gameStore } from "../../services/game-store";
import { TextField } from "@mui/material";
import { useChangeInput } from "@shared/forms/use-change-input";

function Currency() {
  const {currency} = useState(gameStore)[0].store;
  const [value, setValue] = useState(0);

  const setCurrency = useChangeInput(value => gameStore.setCurrency(+value));
  const onChangeValue = useChangeInput(value => setValue(+value));

  return (
    <div className={styles.currency}>
      <TextField
        value={ currency }
        onChange={ setCurrency }
        label="Currency"
        variant="standard"
      />
      <span> / </span>
      <TextField
        value={ value }
        onChange={ onChangeValue }
        label="Calculator"
        variant="standard"
      />
      <span> = </span>
      { (value && currency) && Math.ceil(value * currency / 100) }
    </div>
  );
}

export default observer(Currency);
