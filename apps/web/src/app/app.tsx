import React from 'react';
import './app.scss';
import Header from "./components/Header/Header";
import { FilterState, set } from "./store/filter/store";
import { useDispatch } from "react-redux";
import MapsPage from "./components/MapsPage/MapsPage";
import { OrderDirection, OrderField } from "./api";

function App() {
  const dispatch = useDispatch();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const values = params.filter ? JSON.parse(params.filter) : [];
  const { page, orderField, orderDirection } = params;

  const setParams: Partial<FilterState> = {};
  setParams.values = values;
  if (page) {
    setParams.page = +page;
  }
  if (orderField) {
    setParams.orderField = orderField as OrderField;
  }
  if (orderDirection) {
    setParams.orderDirection = orderDirection as OrderDirection;
  }

  dispatch(set(setParams));

  return (
    <div className="app">
      <Header/>
      <div className='app-content'>
        <MapsPage/>
      </div>
    </div>
  );
}

export default App;
