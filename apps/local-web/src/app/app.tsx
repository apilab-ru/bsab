import { Route, Routes } from 'react-router-dom';
import PlaylistPage from './playlists/components/playlist-page/playlist-page';
import MapsPage from "./maps/components/maps-page/maps-page";
import styles from './app.module.scss';
import { Links } from "./links";
import { SnackbarOrigin, SnackbarProvider } from "notistack";
import Footer from "./layout/components/footer/footer";

export function App() {
  const position: SnackbarOrigin = {
    vertical: "bottom",
    horizontal: "left"
  }

  return (
    <SnackbarProvider
      maxSnack={ 3 }
      autoHideDuration={ 2000 }
      anchorOrigin={ position }
    >
      <div className={ styles.main }>
        <Routes>
          <Route
            path={ Links.playlists.path }
            element={
              <PlaylistPage/>
            }
          />
          <Route
            path={ Links.maps.path }
            element={
              <MapsPage/>
            }
          />
        </Routes>
      </div>
      <Footer/>
    </SnackbarProvider>
  );
}

export default App;
