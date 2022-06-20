import './playlists-container.scss';
import { useSelector } from "react-redux";
import { PlaylistsState } from "../../../store/playlists/store";
import { RootState } from "../../../store/store";
import { Playlist } from "@bsab/api/local/playlist";

export interface PlaylistContainerProps {
  openPlaylist: (id: string) => void;
}

export function PlaylistContainer(props: PlaylistContainerProps) {
  let state = useSelector<RootState, PlaylistsState>((state) => state.playlists);

  const getClassName = (item: Playlist) => {
    return 'playlistContainer__item' + ' ' + (item.id === state.openedId ? '-opened' : '')
  }

  return (
    <div className='playlistContainer'>
      <div className='playlistContainer__list'>
        { state.list.map(item =>
          <div
            className={ getClassName(item) }
            key={ item.id }
            onClick={ () => props.openPlaylist(item.id) }
          >
            <img
              className='playlistContainer__item-image'
              src={ item.image }
            />
            <div className='playlistContainer__item-title'>
              { item.playlistTitle } <b>({ item.songs.length })</b>
            </div>
          </div>
        ) }
      </div>
    </div>
  );
}
