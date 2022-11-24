import React, { FC } from 'react';
import './MapsPage.scss';
import { useDispatch, useSelector } from "react-redux";
import MapsList from '../MapsList/MapsList';
import { RootState } from "../../store/store";
import { MapsState, setOpened, addToShowed } from '../../store/maps/store';
import { MapPlayer } from '@bsab/ui-kit/map-player';
import MapDetails from '../map-details/map-details';

const MapsPage: FC<{}> = () => {
  const dispatch = useDispatch();
  const { list, openedId, showed } = useSelector<RootState, MapsState>((state) => state.maps);
  const openedSourceUrl = list?.find(it => it.id === openedId)?.sourceUrl || null;

  const closeMap = () => {
    dispatch(setOpened(null));
  }

  const openMap = (id: string) => {
    dispatch(setOpened(id));
    dispatch(addToShowed(id));
  }

  return (
    <div className="MapsPage">
      <MapsList
        list={ list }
        showed={ showed }
        handleClick={ id => openMap(id) }
      />

      <MapPlayer
        isOpened={ !!openedId }
        handleClose={ closeMap }
        sourceUrl={ openedSourceUrl }
      >
        <MapDetails id={ openedId || '' }></MapDetails>
      </MapPlayer>
    </div>
  )
}

export default MapsPage;
