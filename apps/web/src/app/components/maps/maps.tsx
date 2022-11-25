import styles from './maps.module.scss';
import Header from '../Header/Header';
import MapsPage from '../MapsPage/MapsPage';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, FilterState, remove, set } from '../../store/filter/store';
import { OrderDirection, OrderField } from '../../api';
import Filter from '../Filter/Filter';
import OrderControl from '../OrderControl/OrderControl';
import { RootState } from '../../store/store';

export function Maps() {
  const dispatch = useDispatch();
  const { values, orderField, orderDirection } = useSelector<RootState, FilterState>((state) => state.filter);

  return (
    <>
      <Header>
        <Filter
          className={ styles.filter }
          values={values}
          onDeleteValue={(index) => dispatch(remove(index))}
          onAddValue={(value) => dispatch(add(value))}
        />
        <OrderControl
          orderField={orderField}
          orderDirection={orderDirection}
          orderFieldChange={orderField => dispatch(set({ orderField }))}
          orderDirectionChange={orderDirection => dispatch(set({ orderDirection }))}
        />
      </Header>
      <div className={styles.appContent}>
        <MapsPage/>
      </div>
    </>
  );
}

export function MapsRoot() {
  const dispatch = useDispatch();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries()) as {
    page: string;
    orderField: OrderField;
    orderDirection: OrderDirection;
    filter: string;
  };

  const baseFilterValues = params.filter ? JSON.parse(params.filter) : [];
  const { page, orderField, orderDirection } = params;

  const setParams: Partial<FilterState> = {};
  setParams.values = baseFilterValues;
  if (page) {
    setParams.page = +page;
  }
  if (orderField) {
    setParams.orderField = orderField;
  }
  if (orderDirection) {
    setParams.orderDirection = orderDirection;
  }

  dispatch(set(setParams));

  return (
    <Maps/>
  );
}

export default MapsRoot;
