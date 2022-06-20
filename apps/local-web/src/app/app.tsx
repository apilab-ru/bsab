// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link, Route, Routes } from 'react-router-dom';
import PlaylistPage from './playlists/components/playlist-page/playlist-page';
import MapsPage from "./maps/components/maps-page/maps-page";
import styles from './app.module.scss';
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { load as mapsLoad } from "./store/maps/store";
import { load as playlistsLoad } from "./store/playlists/store";

export function App() {
  const dispatch = useDispatch();
  dispatch(mapsLoad());
  dispatch(playlistsLoad());

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
