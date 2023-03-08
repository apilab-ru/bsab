import React from 'react';
import './app.scss';
import { Route, Routes } from 'react-router-dom';
import Profile from './modules/user/profile/profile';
import MapsRoot from './modules/maps/maps-root/maps-root';
import Footer from "./modules/layout/footer/footer";
import { useAppDispatch } from "./store";
import { userLoad } from "./store/user/middlewares";
import { SnackbarOrigin, SnackbarProvider } from "notistack";

function App() {
  const dispatch = useAppDispatch();
  dispatch(userLoad())

  const position: SnackbarOrigin = {
    vertical: "bottom",
    horizontal: "left"
  }

  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={5000}
      anchorOrigin={position}
    >
      <div className="app">
        <Routes>
          <Route path="/" element={<MapsRoot/>}/>

          <Route path="/profile" element={<Profile/>}/>
        </Routes>

        <Footer/>
      </div>
    </SnackbarProvider>
  );
}

export default App;
