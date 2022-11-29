import React, { FC, useRef } from 'react';
import styles from './maps-list.module.scss';

import chunk from "lodash/chunk";
import debounce from "lodash/debounce";
import { MapListItem } from '@bsab/ui-kit/map-list-item';
import Tags from '../tags/tags';
import { MapDetail } from '@bsab/api/map/map-detail';

interface MapsListProps {
  list: MapDetail[];
  showed: string[];
  handleClick: (itemId: string) => void;
  changePage: (item: number) => void;
}

const oneRowHeight = 126;

const MapsList: FC<MapsListProps> = ({ list, handleClick, showed, changePage }) => {
  const rows = chunk(list, 2);

  const listInnerRef = React.createRef<HTMLDivElement>();
  const onScroll = debounce(() => {
    if (listInnerRef.current) {
      const { scrollTop } = listInnerRef.current;
      const currentItem = Math.ceil(scrollTop / oneRowHeight) * 2 + 1;
      changePage(currentItem);
    }
  }, 15);

  return (
    <div
      className={styles.mapsList}
      onScroll={onScroll}
      ref={listInnerRef}
    >
      <div className={styles.container}>
        { rows.map(row =>
          <div className={styles.row + ' js-row'} key={ row[0].id }>
            { row.map(item =>
              <MapListItem
                className={ styles.item + ' ' + (showed.includes(item.id) ? styles.itemShowed : '') }
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
    </div>
  )
};

export default MapsList;
