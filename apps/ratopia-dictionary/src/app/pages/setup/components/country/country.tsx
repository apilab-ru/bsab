import styles from './country.module.scss';
import { CurrencyType, ICountry } from "../../../../services/game-store";
import { Autocomplete, Box, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Countries, getCountryIcon } from "../../../../services/countries";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { toJS } from "mobx";
import { ChangeEvent, useState } from "react";
import CountryStocks from "../country-stocks/country-stocks";
import { CurrencySwitcher } from '../currency-switcher/currency-switcher';

export interface CountryProps {
  country: ICountry;
  countries: Countries[];
  update: (country: ICountry) => void;
  delete: () => void;
}

export function Country({country, countries, update, ...props}: CountryProps) {
  const [expended, setExpended] = useState(false);

  const updateExpended = (event: ChangeEvent<HTMLInputElement>) => {
    setExpended(event.target.checked);
  };

  const countryChange = (item: Countries | null) => {
    if (item) {
      update({
        ...toJS(country),
        country: item
      })
    }
  }

  const changeCurrency = (isGold: boolean) => {
    update({
      ...toJS(country),
      type: isGold ? CurrencyType.gold : CurrencyType.dar
    })
  }

  return (
    <div className={ styles.country }>
      <div className={ styles.countryInfo }>
        <img className={ styles.countryIcon } src={ getCountryIcon(country.country) }/>
        <Autocomplete
          classes={ {root: styles.countrySelect} }
          disablePortal
          options={ countries }
          value={ country.country }
          onChange={ (_, newValue) => countryChange(newValue) }
          renderInput={ (params) => <TextField { ...params } label="Country"/> }
          renderOption={ (props, option) => (
            <Box component="li" sx={ {'& > img': {mr: 2, flexShrink: 0}} } { ...props }>
              <img
                className={ styles.countryValueIcon }
                loading="lazy"
                src={ getCountryIcon(option) }
              />
              { option }
            </Box>
          ) }
        />
        <CurrencySwitcher
          className={ styles.countryCurrency }
          checked={country.type === CurrencyType.gold}
          onChange={(e, checked) => changeCurrency(checked)}
        />
        <DeleteForeverIcon
          className={ styles.countryDelete }
          onClick={ props.delete }
        />
        <FormControlLabel
          className={ styles.countryChecker }
          control={ <Checkbox checked={ expended } onChange={ updateExpended }/> }
          label="Stocks"
        />
      </div>
      { expended &&
          <CountryStocks className={styles.countryStocks} country={ country } countryUpdate={ update }/>
      }
    </div>
  );
}

export default Country;
