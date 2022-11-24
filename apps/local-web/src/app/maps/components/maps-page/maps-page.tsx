import styles from './maps-page.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { MapsState, open } from "../../../store/maps/store";
import MapsList from '../maps-list/maps-list';
import React from "react";
import { router } from "../../../services/router";
import { MapPlayer } from '@bsab/ui-kit/map-player';
import { IMap } from '@bsab/api/map/map';

interface QueryParams {
  openedId: string;
}

export function MapsPage() {
  let { list, openedId } = useSelector<RootState, MapsState>((state) => state.maps);

  const dispatch = useDispatch();

  const handleClose = () => {
    openItem(null);
  }

  const openItem = (openedId: string | null) => {
    router.updateQuery({ openedId });
    dispatch(open(openedId));
  }

  const { openedId: queryOpenedId } = router.getQueryParams<QueryParams>();
  if (queryOpenedId && queryOpenedId !== openedId) {
    openItem(queryOpenedId);
  }

  const getSourceOpenedItem = (openedId: string | null, list: IMap[]) => {
    return list?.find(item => item.id === openedId)?.sourceUrl || null;
  }

  return (
    <>
      <div className={ styles.mapsPage }>
        <MapsList
          list={ list }
          open={ openItem }
        />
      </div>
      <MapPlayer
        handleClose={ handleClose }
        isOpened={ !!openedId }
        sourceUrl={ getSourceOpenedItem(openedId, list) }
      ></MapPlayer>
    </>
  );
}

export default MapsPage;
