import { router } from "../../../services/router";
import { PlaylistContainer } from "../playlist-container/playlist-container";
import { PlaylistEdit } from "../playlist-edit/playlist-edit";
import styles from './playlist-page.module.scss';
import { Playlist } from "@bsab/api/local/playlist";
import { observer } from "mobx-react";
import { useState } from "react";
import { mapsService } from "../../../store/maps.service";
import { playlistsService } from "../../../store/playlists.service";

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
    playlistsService.updatePlayList(playlist);
  }

  const { openedId: queryOpenedId } = router.getQueryParams<QueryParams>();
  if (queryOpenedId && queryOpenedId !== openedId) {
    openPlaylist(queryOpenedId);
  }

  const callRemovePlaylist = (id: string) => {
    closePlaylist();
    playlistsService.removePlayList(id);
  }

  return (
    <div className={styles.playlistPage}>
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
