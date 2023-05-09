import styles from './maps-page.module.scss';

import MapsList from '../maps-list/maps-list';
import React, { useState } from "react";
import { router } from "../../../services/router";
import { MapPlayer } from '@bsab/ui-kit/map-player';
import { LocalMap } from '@bsab/api/map/map';
import { observer } from "mobx-react";
import { mapsService } from "../../services/maps.service";
import Header from "../../../layout/components/header/header";
import { Filter, SearchValue } from "@bsab/ui-kit/filter";
import { LOCAL_FILTER_ITEMS } from "../../../models/filter-items";
import CinemaEditor from "../cinema-editor/cinema-editor";

interface QueryParams {
  openedId: string;
  cinemaId: string;
}

export const MapsPage = () => {
  const [{ listByFilter, list, openedId, filter, cinemaId }] = useState(mapsService);

  const handleClose = () => {
    openItem(null);
  }

  console.log('xxx openedId', openedId);

  const openItem = (openedId: string | null) => {
    router.updateQuery({ openedId });

    mapsService.setOpenedId(openedId);
  }

  const openCinema = (id: string | null) => {
    router.updateQuery({ cinemaId: id });

    mapsService.setCinemaId(id);
  }

  const { openedId: queryOpenedId, cinemaId: queryCinemaId } = router.getQueryParams<QueryParams>();

  /*if (queryOpenedId && queryOpenedId !== openedId) {
    openItem(queryOpenedId);
  }*/

  /*if (queryCinemaId && queryCinemaId !== cinemaId) {
    openCinema(queryCinemaId);
  }*/

  const getItem = (id: string | null, list: LocalMap[]) => {
    return list?.find(item => item.id === id) || null;
  }

  const addFilter = (item: SearchValue) => {
    mapsService.addToFilter(item);
  }

  const removeFilter = (index: number) => {
    mapsService.removeFromFilter(index);
  }

  return (
    <>
      <div className={styles.mapsPage}>
        <Header>
          <Filter
            filterItems={LOCAL_FILTER_ITEMS}
            values={filter}
            onDeleteValue={(index) => removeFilter(index)}
            onAddValue={(value) => addFilter(value)}
          />
        </Header>
        <MapsList
          list={listByFilter}
          open={openItem}
          openCinema={openCinema}
        />
      </div>
      <MapPlayer
        handleClose={handleClose}
        isOpened={!!openedId}
        sourceUrl={getItem(openedId, list)?.sourceUrl}
      />
      <CinemaEditor
        id={cinemaId}
        isOpened={!!cinemaId}
        cinema={getItem(cinemaId, list)?.cinema}
        handleClose={() => openCinema(null)}
      />
    </>
  );
}

export default observer(MapsPage);
