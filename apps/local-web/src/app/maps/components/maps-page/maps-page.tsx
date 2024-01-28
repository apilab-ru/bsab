import styles from './maps-page.module.scss';

import MapsList from '../maps-list/maps-list';
import React, { useEffect, useState } from "react";
import { router } from "../../../services/router";
import { MapPlayer } from '@bsab/ui-kit/map-player';
import { LocalMap } from '@bsab/api/map/map';
import { observer } from "mobx-react";
import { mapsService } from "../../services/maps.service";
import Header from "../../../layout/components/header/header";
import { Filter, SearchValue } from "@bsab/ui-kit/filter";
import { LOCAL_FILTER_ITEMS } from "../../models/filter-items";
import CinemaEditor from "../cinema-editor/cinema-editor";
import { toJS } from "mobx";
import { isEqual } from "lodash";
import { Button } from "@mui/material";
import { Song } from "@bsab/api/local/playlist";
import { playlistsService } from "../../../playlists/services/playlists.service";
import { notificationService } from "../../../services/notification.service";
import { PLAYLIST_IMAGE } from "../../../playlists/services/playlist-image";
import { useNavigate } from 'react-router-dom';
import { Links } from "../../../links";

interface QueryParams {
  openedId: string;
  cinemaId: string;
  filter: string;
}

export const MapsPage = () => {
  const [{ listByFilter, list, openedId, filter, cinemaId }] = useState(mapsService);

  useEffect(() => {
    const routeFilterParams = getFilter();
    const storeParams = toJS(filter);

    if (!isEqual(routeFilterParams, storeParams)) {
      mapsService.filter = routeFilterParams;
    }
  }, [])

  const getFilter = () => JSON.parse(router.getQueryParams<QueryParams>().filter || '[]');

  const setFilter = (params: SearchValue[]) => router.updateQuery({ filter: JSON.stringify(params) })

  const navigate = useNavigate();

  const handleClose = () => {
    openItem(null);
  }

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

  const playlistId = filter.find(({ key }) => key === 'playlist')?.value;

  const getItem = (id: string | null, list: LocalMap[]) => {
    return list?.find(item => item.id === id) || null;
  }

  const addFilter = (item: SearchValue) => {
    setFilter([
      ...getFilter(),
      item
    ])
    mapsService.addToFilter(item);
  }

  const removeFilter = (index: number) => {
    setFilter(
      getFilter().filter((_: SearchValue, i: number) => i !== index)
    )
    mapsService.removeFromFilter(index);
  }

  const deleteFromPlaylist = (hash: string) => {
    playlistsService.deleteSongFromPlaylist(playlistId!, hash).then(() => {
      notificationService.addNotification({
        type: 'success',
        message: 'Song deleted from playlist'
      })
    }).catch(message => notificationService.addNotification({
      type: 'error',
      message
    }))
  }

  const saveAsPlaylist = () => {
    const songs: Song[] = listByFilter.map(item => ({
      songName: item.songName,
      levelAuthorName: item.author,
      hash: item.hash!,
      levelid: `custom_level_${item.hash}`,
      difficulties: item.difficultMap.flatMap(mode => mode.list.map(it => ({
        characteristic: mode.mode,
        name: it.difficulty
      })))
    }));

    playlistsService.createPlaylist({
      playlistTitle: 'Generic Playlist',
      playlistAuthor: 'Viktor',
      customData: {
        AllowDuplicates: false
      },
      image: PLAYLIST_IMAGE,
      id: 'gen-playlist',
      songs
    }).then(playlist => {
      notificationService.addNotification({
        type: 'success',
        message: 'Success saved'
      })

      navigate(Links.playlists.openId(playlist.id));
    }).catch(error => {
      notificationService.addNotification({
        type: 'error',
        message: error.toString()
      })
    })
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
          withPlaylist={!!playlistId}
          deleteFromPlaylist={ deleteFromPlaylist }
        />
        <div className={styles.counter}>
          Count: { listByFilter.length }
          <Button
            className={styles.counterButton}
            variant="contained"
            onClick={saveAsPlaylist}
          >
            Save as playlist
          </Button>
        </div>
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
