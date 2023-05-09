import './maps-list.scss';
import { LocalMap } from "@bsab/api/map/map";
import { MapListItem } from "@bsab/ui-kit/map-list-item"
import React from "react";
import Cinema from "../cinema/cinema";

export interface MapsListProps {
  list: LocalMap[];
  open: (id: string) => void;
  openCinema: (id: string) => void;
}

export function MapsList(props: MapsListProps) {
  return (
    <div className="mapsList">
      { props.list.map(item =>
        <MapListItem
          key={ item.id }
          item={ item }
          click={ () => props.open(item.id) }
        >
          <Cinema cinema={ item.cinema } click={ () => props.openCinema(item.id) }/>
        </MapListItem>
      ) }
    </div>
  );
}

export default MapsList;
