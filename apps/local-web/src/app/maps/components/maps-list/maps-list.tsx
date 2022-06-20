import './maps-list.scss';
import { IMap } from "@bsab/api/map/map";
import { MapListItem } from "@bsab/ui-kit/map-list-item"
import React from "react";

/* eslint-disable-next-line */
export interface MapsListProps {
  list: IMap[];
}

// coverFilename

export function MapsList(props: MapsListProps) {
  return (
    <div className="mapsList">
      { props.list.map(item =>
        <MapListItem
          key={ item.id }
          item={ item }
        />
      )}
    </div>
  );
}

export default MapsList;
