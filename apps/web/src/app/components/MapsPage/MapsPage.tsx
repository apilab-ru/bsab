import React, { FC } from 'react';
import './MapsPage.scss';
import { useDispatch, useSelector } from "react-redux";
import MapsList from '../MapsList/MapsList';
import { RootState } from "../../store/store";
import { MapsState } from "../../store/maps/store";

const MapsPage: FC<{}> = () => {
  const dispatch = useDispatch();
  let { list } = useSelector<RootState, MapsState>((state) => state.maps);

  return (
    <div className="MapsPage">
      <MapsList
        list={ list }
      />
    </div>
  )
}

export default MapsPage;
