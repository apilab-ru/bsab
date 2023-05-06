import styles from './maps-page.module.scss';

import MapsList from '../maps-list/maps-list';
import React, { useState } from "react";
import { router } from "../../../services/router";
import { MapPlayer } from '@bsab/ui-kit/map-player';
import { LocalMap } from '@bsab/api/map/map';
import { observer } from "mobx-react";
import { mapsService } from "../../../store/maps.service";

interface QueryParams {
  openedId: string;
}

export const MapsPage = () => {
  const [{ list, openedId }] = useState(mapsService)

  const handleClose = () => {
    openItem(null);
  }

  const openItem = (openedId: string | null) => {
    router.updateQuery({ openedId });

    mapsService.setOpenedId(openedId);
  }

  const { openedId: queryOpenedId } = router.getQueryParams<QueryParams>();
  if (queryOpenedId && queryOpenedId !== openedId) {
    openItem(queryOpenedId);
  }

  const getSourceOpenedItem = (openedId: string | null, list: LocalMap[]) => {
    return list?.find(item => item.id === openedId)?.sourceUrl || null;
  }

  return (
    <>
      <div className={styles.mapsPage}>
        <MapsList
          list={list}
          open={openItem}
        />
      </div>
      <MapPlayer
        handleClose={handleClose}
        isOpened={!!openedId}
        sourceUrl={getSourceOpenedItem(openedId, list)}
      ></MapPlayer>
    </>
  );
}

export default observer(MapsPage);
