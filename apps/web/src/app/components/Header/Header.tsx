import React, { FC } from 'react';
import Filter from '../Filter/Filter';
import { useDispatch, useSelector } from 'react-redux'
import './Header.scss';
import { add, FilterState, remove, set } from '../../store/filter/store';
import OrderControl from "../OrderControl/OrderControl";
import { RootState } from "../../store/store";

const Header: FC<{}> = () => {
  let { values, orderField, orderDirection } = useSelector<RootState, FilterState>((state) => state.filter);
  const dispatch = useDispatch();

  return (
    <div className="Header">
      <div className="content">
        <div className="title">BeatSaber Maps</div>
        <Filter
          values={ values }
          onDeleteValue={ (index) => dispatch(remove(index)) }
          onAddValue={ (value) => dispatch(add(value)) }
        />
        <OrderControl
          orderField={ orderField }
          orderDirection={ orderDirection }
          orderFieldChange={ orderField => dispatch(set({ orderField })) }
          orderDirectionChange={ orderDirection => dispatch(set({ orderDirection })) }
        />
      </div>
    </div>
  )
};

export default Header;
