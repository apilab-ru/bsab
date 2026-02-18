import './refresh-citizen.scss';
import { Button } from "@mui/material";
import { apiService } from "../../services/api-service";

export interface RefreshCitizenProps {
  className?: string;
}

export function RefreshCitizen(props: RefreshCitizenProps) {
  const refreshCitizens = () => {
    apiService.refreshRate().then(() => console.log('command send'));
  }

  return (
    <div className={"refresh-citizen " + props.className}>
      <Button variant="contained" onClick={() => refreshCitizens()} color= 'primary'>
        Refresh citizens
      </Button>
    </div>
  );
}

export default RefreshCitizen;
