import React from 'react';
import './app.scss';
import { Route, Routes } from 'react-router-dom';
import Profile from './modules/user/profile/profile';
import MapsRoot from './modules/maps/maps-root/maps-root';
import { userLoad } from "./store/user/middlewares";
import { useAppDispatch } from "./store";

function App() {
  const dispatch = useAppDispatch();
  dispatch(userLoad())

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MapsRoot/>}/>

        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
