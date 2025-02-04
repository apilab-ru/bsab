import styles from './setup.module.scss';
import Currency from "../../components/currency/currency";
import CountryList from "./components/country-list/country-list";

export function SetupPage() {
  return (
    <div className={styles['container']}>
      <Currency />

      <CountryList />
    </div>
  );
}

export default SetupPage;
