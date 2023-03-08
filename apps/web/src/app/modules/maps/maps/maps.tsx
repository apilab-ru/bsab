import styles from './maps.module.scss';
import Header from '../../layout/header/header';
import MapsPage from '../maps-page/maps-page';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, FilterState, remove, filterSet } from '../../../store/filter/store';
import Filter from '../filter/filter';
import OrderControl from '../order-control/order-control';
import { RootState } from '../../../store/store';
import { UserState } from "../../../store/user/store";

export function Maps() {
  const dispatch = useDispatch();
  const { values, orderField, orderDirection } = useSelector<RootState, FilterState>((state) => state.filter);
  const { user } = useSelector<RootState, UserState>((state) => state.user);

  return (
    <>
      <Header>
        <Filter
          className={ styles.filter }
          values={values}
          userExist={ !!user }
          onDeleteValue={(index) => dispatch(remove(index))}
          onAddValue={(value) => dispatch(add(value))}
        />
        <OrderControl
          orderField={orderField}
          orderDirection={orderDirection}
          orderFieldChange={orderField => dispatch(filterSet({ orderField, offset: 0 }))}
          orderDirectionChange={orderDirection => dispatch(filterSet({ orderDirection, offset: 0 }))}
        />
      </Header>
      <div className={styles.appContent}>
        <MapsPage/>
      </div>
    </>
  );
}

export default Maps;
