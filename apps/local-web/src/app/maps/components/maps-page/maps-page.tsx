import styles from './maps-page.module.scss';
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { MapsState } from "../../../store/maps/store";
import MapsList from '../maps-list/maps-list';
import React from "react";

export function MapsPage() {
  let { list } = useSelector<RootState, MapsState>((state) => state.maps);

  return (
    <div className={ styles.mapsPage }>
      <MapsList
        list={ list }
      />
    </div>
  );
}

export default MapsPage;
