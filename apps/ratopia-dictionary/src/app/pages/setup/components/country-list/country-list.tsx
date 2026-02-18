import styles from './country-list.module.scss';
import { observer } from "mobx-react";
import { useState } from "react";
import { gameStore, ICountry } from "../../../../services/game-store";
import Country from "../country/country";
import { COUNTRIES_LIST } from "../../../../services/countries";
import { Button } from "@mui/material";

function CountryList() {
  const { countries } = useState(gameStore)[0].store;
  const existedCountries = countries.map(({ country }) => country);

  const addCountry = () => {
    const firstNewCountry = COUNTRIES_LIST.find(item => !existedCountries.includes(item));

    gameStore.addCountry(firstNewCountry!);
  }

  const filterList = (country: string) => COUNTRIES_LIST.filter(it => it === country || !existedCountries.includes(it));

  const countryUpdate = (country: ICountry, key: string) => {
    gameStore.updateCountry(country, key);
  }

  const deleteCountry = (key: string) => gameStore.deleteCountry(key);

  return (
    <div className={styles.CountryList}>
      <Button className={styles.CountryListAdd} variant="contained" onClick={addCountry}>Add country</Button>

      { countries.map(country =>
        <Country
          key={country.country}
          country={country}
          countries={filterList(country.country)}
          update={event => countryUpdate(event, country.country)}
          delete={() => deleteCountry(country.country)}
        />
      ) }
    </div>
  );
}

export default observer(CountryList);
