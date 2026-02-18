import './currency.scss';
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { gameStore } from "../../services/game-store";
import { useChangeInput } from "@shared/forms/use-change-input";

function Currency() {
  const { currency } = useState(gameStore)[0].store;
  const [ valueGold, setValueGold ] = useState(0);
  const [ valueDar, setValueDar ] = useState(100);

  const onChangeDar = useChangeInput(value => {
    setValueDar(+value);
    setValueGold(Math.ceil(+value / 100 * (currency || 1)));
  });
  const onChangeGold = useChangeInput(value => {
    setValueGold(+value);
    setValueDar(Math.ceil(+value / (currency || 1) * 100));
  });

  useEffect(() => {
    if (valueDar) {
      setValueGold(Math.ceil(+valueDar / 100 * (currency || 1)));
    }
  }, [currency]);

  return (
    <div className="currency">
      <div>
        <div className="currency__line">
          Курс валют на сегодня:
        </div>
        <div className="currency__line">
          <img className="currency__icon" src="/assets/struct/dar.png"/>
          100 ⇆ { currency }
          <img className="currency__icon" src="/assets/struct/gold.png"/>
        </div>
      </div>

      <div>
        <div className="currency__line">
          Конвертер валют:
        </div>
        <div className="currency__line">
          <input className="currency__input" type="text" value={valueDar} onChange={onChangeDar} />
          <img className="currency__icon" src="/assets/struct/dar.png"/>
           ⇆
          <input className="currency__input" type="text" value={valueGold} onChange={onChangeGold} />
          <img className="currency__icon" src="/assets/struct/gold.png"/>
        </div>
      </div>
    </div>
  );
}

export default observer(Currency);
