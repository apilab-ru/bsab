import React, { FC, useRef } from 'react';
import styles from './maps-list.module.scss';

import chunk from "lodash/chunk";
import debounce from "lodash/debounce";
import { MapListItem } from '@bsab/ui-kit/map-list-item';
import Tags from '../tags/tags';
import { MapDetail } from '@bsab/api/map/map-detail';
import { Skeleton } from "@mui/material";

interface MapsListProps {
  list: MapDetail[];
  showed: string[];
  handleClick: (itemId: string) => void;
  changeOffset: (item: number) => void;
  offset?: number;
}

const oneRowHeight = 130;
const preloadList = new Array(6).fill(null).map((i, index) => 'preload_' + index);

const MapsList: FC<MapsListProps> = ({ list, handleClick, showed, changeOffset, offset }) => {
  const rows = chunk(list, 2);

  const listInnerRef = React.createRef<HTMLDivElement>();
  const onScroll = debounce(() => {
    if (listInnerRef.current) {
      const { scrollTop } = listInnerRef.current;
      const currentItem = Math.ceil(scrollTop / oneRowHeight) * 2 + 1;

      if (offset !== currentItem) {
        changeOffset(currentItem);
      }
    }
  }, 15);

  if (offset === 0) {
    setTimeout(() => {
      if (listInnerRef.current) {
        listInnerRef.current.scrollTop = 0;
      }
    })
  }

  return (
    <div
      className={styles.mapsList}
      onScroll={onScroll}
      ref={listInnerRef}
    >
      <div className={styles.container}>
        { !list?.length && preloadList.map(id =>
          <div className={styles.row + ' js-row'} key={ id }>
            <Skeleton width={'100%'} height={120} />
            <Skeleton width={'100%'} height={120} />
          </div>
        ) }

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
