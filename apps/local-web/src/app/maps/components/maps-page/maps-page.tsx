import styles from './maps-page.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { MapsState, open } from "../../../store/maps/store";
import MapsList from '../maps-list/maps-list';
import React from "react";
import { Dialog } from "@mui/material";
import { proxyApiService } from "../../../services/proxy-api";
import { router } from "../../../services/router";

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

  const getLink = (openedId: string | null) => {
    if (!openedId) {
      return '';
    }

    return proxyApiService.getPlayerLink(openedId);
  }

  const { openedId: queryOpenedId } = router.getQueryParams<QueryParams>();
  if (queryOpenedId && queryOpenedId !== openedId) {
    openItem(queryOpenedId);
  }

  return (
    <>
      <div className={ styles.mapsPage }>
        <MapsList
          list={ list }
          open={ openItem }
        />
      </div>
      <Dialog onClose={ handleClose } open={ !!openedId } maxWidth={false}>
        <iframe className={ styles.playerFrame } src={ getLink(openedId) }/>
      </Dialog>
    </>
  );
}

export default MapsPage;
