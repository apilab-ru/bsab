import { router } from "../../../services/router";
import { PlaylistContainer } from "../playlist-container/playlist-container";
import { PlaylistEdit } from "../playlist-edit/playlist-edit";
import styles from './playlist-page.module.scss';
import { Playlist } from "@bsab/api/local/playlist";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { mapsService } from "../../../maps/services/maps.service";
import { playlistsService } from "../../services/playlists.service";
import Header from "../../../layout/components/header/header";
import { notificationService } from "../../../services/notification.service";

interface QueryParams {
  openedId: string;
}

export function PlaylistPage() {
  const [{ list, openedId }] = useState(playlistsService)
  const playlist: Playlist = list?.find(item => item.id === openedId)!;

  const [{ list: maps }] = useState(mapsService)

  const openPlaylist = (openedId: string) => {
    router.updateQuery({ openedId });
    playlistsService.setOpenedId(openedId);
  };

  const closePlaylist = () => {
    router.updateQuery({ openedId: null });
    playlistsService.setOpenedId(null);
  }

  const savePlaylist = (playlist: Playlist) => {
    playlistsService.updatePlayList(playlist).then(() => {
      notificationService.addNotification({
        type: 'success',
        message: 'Successful saved'
      })
    });
  }

  const { openedId: queryOpenedId } = router.getQueryParams<QueryParams>();
  if (queryOpenedId && queryOpenedId !== openedId) {
    openPlaylist(queryOpenedId);
  }

  const callRemovePlaylist = (id: string) => {
    closePlaylist();
    playlistsService.removePlayList(id).then(() => {
      notificationService.addNotification({
        type: 'success',
        message: 'Success removed'
      })
    });
  }

  return (
    <div className={styles.playlistPage}>
      <Header/>
      <PlaylistContainer
        openPlaylist={openPlaylist}
      />
      {!playlist ? '' :
        <PlaylistEdit
          maps={maps}
          playlist={playlist}
          close={closePlaylist}
          save={savePlaylist}
          remove={() => callRemovePlaylist(playlist.id)}
        />
      }
    </div>
  )
}

export default observer(PlaylistPage);
