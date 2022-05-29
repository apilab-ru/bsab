import React, { FC } from 'react';
import './MapsList.scss';
import { Map } from "../../api";

import chunk from "lodash/chunk";
import MapListItem from "../MapListItem/MapListItem";

interface MapsListProps {
  list: Map[];
}

const MapsList: FC<MapsListProps> = ({ list }) => {
  const rows = chunk(list, 2);

  return (
    <div className="MapsList">
      { rows.map(row =>
        <div className="row" key={ row[0].id }>
          { row.map(item =>
            <MapListItem item={ item } key={ item.id }/>
          ) }
        </div>
      ) }
    </div>
  )
};

export default MapsList;
