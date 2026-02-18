import styles from './home.module.scss';
import {Button} from "@mui/material";
import {apiService} from "../../services/api-service";

export function Home() {
  const refreshCitizens = () => {
    apiService.refreshRate().then(() => console.log('command send'));
  }

  return (
    <div className={styles['container']}>
      <h1>Welcome to Home!</h1>

      <Button variant="contained" onClick={() => refreshCitizens()} color= 'primary'>
        Refresh citizens
      </Button>
    </div>
  );
}

export default Home;
