import { Link, Route, Routes } from 'react-router-dom';
import PlaylistPage from './playlists/components/playlist-page/playlist-page';
import MapsPage from "./maps/components/maps-page/maps-page";
import styles from './app.module.scss';

export function App() {
  return (
    <div className={styles.main}>
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
