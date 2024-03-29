import React, { FC } from 'react';
import styles from './maps-page.module.scss';
import { useSelector } from "react-redux";
import MapsList from '../maps-list/maps-list';
import { RootState } from "../../../store/store";
import { MapsState, setOpened, addToShowed } from '../../../store/maps/store';
import { MapPlayer } from '@bsab/ui-kit/map-player';
import MapDetails from '../map-details/map-details';
import { FilterState, setOffset } from '../../../store/filter/store';
import { mapMarkShowed } from "../../../store/maps/middlewares";
import { useAppDispatch } from "../../../store";

const MapsPage: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { list, openedId, showed } = useSelector<RootState, MapsState>((state) => state.maps);
  const { offset, baseOffset } = useSelector<RootState, FilterState>((state) => state.filter);
  const openedItem = list?.find(it => it.id === openedId) || null;

  const closeMap = () => {
    dispatch(setOpened(null));
  }

  const openMap = (id: string) => {
    dispatch(setOpened(id));
    dispatch(mapMarkShowed(id));
  }

  const changeOffset = (item: number) => {
    dispatch(setOffset(item + baseOffset))
  }

  return (
    <div className={styles.page}>
      <MapsList
        list={list}
        showed={showed}
        handleClick={id => openMap(id)}
        offset={offset}
        changeOffset={changeOffset}
      />

      <MapPlayer
        isOpened={!!openedId}
        handleClose={closeMap}
        sourceUrl={openedItem?.downloadURL || null}
      >
        {(!openedItem) ? '' :
          <MapDetails item={openedItem}></MapDetails>
        }
      </MapPlayer>
    </div>
  )
}

export default MapsPage;
