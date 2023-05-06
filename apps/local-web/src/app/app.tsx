import { Link, Route, Routes } from 'react-router-dom';
import PlaylistPage from './playlists/components/playlist-page/playlist-page';
import MapsPage from "./maps/components/maps-page/maps-page";
import styles from './app.module.scss';
import { Button } from "@mui/material";

export function App() {
  return (
    <div className={styles.main}>
      <div className={styles.navBar} role="navigation">
        <Link className={styles.link} to="/">
          <Button variant="contained">PlayLists</Button>
        </Link>
        <Link className={styles.link} to="/maps">
          <Button variant="contained">Maps</Button>
        </Link>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <PlaylistPage/>
          }
        />
        <Route
          path="/maps"
          element={
            <MapsPage/>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
