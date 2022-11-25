import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { AppStore } from "./app/store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={AppStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
