import React, { FC } from 'react';
import './MapsList.scss';

import chunk from "lodash/chunk";
import { MapListItem } from '@bsab/ui-kit/map-list-item';
import Tags from '../tags/tags';
import { MapDetail } from '@bsab/api/map/map-detail';

interface MapsListProps {
  list: MapDetail[];
  showed: string[];
  handleClick: (itemId: string) => void;
}

const MapsList: FC<MapsListProps> = ({ list, handleClick, showed }) => {
  const rows = chunk(list, 2);

  return (
    <div className="MapsList">
      { rows.map(row =>
        <div className="row" key={ row[0].id }>
          { row.map(item =>
            <MapListItem
              className={ showed.includes(item.id) ? '-showed' : '' }
              item={ item }
              key={ item.id }
              click={ () => handleClick(item.id) }
            >
              { !item.tags?.length ? '' :
                <Tags tags={item.tags}></Tags>
              }
            </MapListItem>
          ) }
        </div>
      ) }
    </div>
  )
};

export default MapsList;
