import styles from './traders-page.module.scss';
import { observer, useLocalObservable } from "mobx-react";
import Currency from "../../components/currency/currency";
import TradersTable from "./components/traders-table/traders-table";
import { gameStore } from "../../services/game-store";
import { TradersStore } from "./services/traders-store";
import { TradersContext } from './traders-context';
import Connection from "../../components/connection/connection";

function TradersPage() {
  const tradersStore = useLocalObservable(() => new TradersStore(gameStore));

  return (
    <TradersContext.Provider value={tradersStore}>
      <div className={styles.traders}>
        <div className={styles.tradersLine}>
          <Connection />

          <Currency />
        </div>


        <TradersTable className={styles.tradersTable} />
      </div>
    </TradersContext.Provider>

  );
}

export default observer(TradersPage);
