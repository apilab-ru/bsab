import React, { FC } from 'react';
import './MapsPage.scss';
import { useDispatch, useSelector } from "react-redux";
import MapsList from '../MapsList/MapsList';
import { RootState } from "../../store/store";
import { MapsState, setOpened } from '../../store/maps/store';
import { MapPlayer } from '@bsab/ui-kit/map-player';
import { mapsApiService } from '../../services/maps-api-service';
import MapDetails from '../map-details/map-details';

const MapsPage: FC<{}> = () => {
  const dispatch = useDispatch();
  const { list, openedId } = useSelector<RootState, MapsState>((state) => state.maps);
  const openedSourceUrl = list?.find(it => it.id === openedId)?.sourceUrl || null;

  const mapPlayerSet = (id: string | null) => {
    dispatch(setOpened(id));

    if (id) {
      mapsApiService.markAsShowed(id);
    }
  }

  return (
    <div className="MapsPage">
      <MapsList
        list={ list }
        handleClick={ mapPlayerSet }
      />

      <MapPlayer
        isOpened={ !!openedId }
        handleClose={ () => mapPlayerSet(null) }
        sourceUrl={ openedSourceUrl }
      >
        <MapDetails id={ openedId || '' }></MapDetails>
      </MapPlayer>
    </div>
  )
}

export default MapsPage;
