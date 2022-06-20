import { useDispatch, useSelector } from "react-redux";
import { open, PlaylistsState, updatePlaylist } from "../../../store/playlists/store";
import { router } from "../../../services/router";
import { PlaylistContainer } from "../playlist-container/playlist-container";
import { PlaylistEdit } from "../playlist-edit/playlist-edit";
import styles from './playlist-page.module.scss';
import { RootState } from "../../../store/store";
import { Playlist } from "@bsab/api/local/playlist";



interface QueryParams {
  openedId: string;
}

export function PlaylistPage() {
  let { list, openedId } = useSelector<RootState, PlaylistsState>((state) => state.playlists);
  const playlist: Playlist = list.find(item => item.id === openedId)!;

  const dispatch = useDispatch();

  const openPlaylist = (openedId: string) => {
    router.updateQuery({ openedId });
    dispatch(open(openedId));
  };

  const closePlaylist = () => {
    router.updateQuery({ openedId: null });
    dispatch(open(null));
  }

  const savePlaylist = (playlist: Playlist) => {
    dispatch(updatePlaylist({ id: openedId!, playlist }))
  }

  const { openedId: queryOpenedId } = router.getQueryParams<QueryParams>();
  if (queryOpenedId && queryOpenedId !== openedId) {
    openPlaylist(queryOpenedId);
  }

  return (
    <div className={styles.playlistPage}>
      <PlaylistContainer
        openPlaylist={ openPlaylist }
      />
      <PlaylistEdit
        close={ closePlaylist }
        playlist={ playlist }
        save={ savePlaylist }
      />
    </div>
  )
}

export default PlaylistPage;
