import styles from './country-stocks.module.scss';
import { ICountry, IResource } from "../../../../services/game-store";
import CountryStocksRow from "../country-stocks-row/country-stocks-row";
import { toJS } from "mobx";

export interface CountryStocksProps {
  className: string;
  country: ICountry;
  countryUpdate: (country: ICountry) => void;
}

export function CountryStocks({ country, countryUpdate, className }: CountryStocksProps) {
  const updateResources = (type: 'import' | 'export') => (resources: IResource[]) => {
    countryUpdate({
      ...toJS(country),
      [type]: resources
    })
  }

  return (
    <div className={styles.countryStocks + ' ' + className}>
      <CountryStocksRow resources={ country.import } updateList={updateResources('import')}>
        <img src='/assets/struct/import.png'/>Import
      </CountryStocksRow>
      <div className={styles.countryStocksSeparator}></div>
      <CountryStocksRow resources={ country.export } updateList={updateResources('export')}>
        <img src='/assets/struct/export.png'/>Export
      </CountryStocksRow>
    </div>
  );
}

export default CountryStocks;
