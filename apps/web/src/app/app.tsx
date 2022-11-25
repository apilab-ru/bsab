import React from 'react';
import './app.scss';
import { Route, Routes } from 'react-router-dom';
import Profile from './components/profile/profile';
import MapsRoot from './components/maps/maps';

function App() {

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
