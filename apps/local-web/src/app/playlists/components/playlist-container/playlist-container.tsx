import './playlists-container.scss';
import { Playlist } from "@bsab/api/local/playlist";
import { observer } from "mobx-react";
import { useState } from "react";
import { playlistsService } from "../../../store/playlists.service";

export interface PlaylistContainerProps {
  openPlaylist: (id: string) => void;
}

export function PlaylistContainer(props: PlaylistContainerProps) {
  const [{ list, openedId }] = useState(playlistsService)

  const getClassName = (item: Playlist) => {
    return 'playlistContainer__item' + ' ' + (item.id === openedId ? '-opened' : '')
  }

  return (
    <div className='playlistContainer'>
      <div className='playlistContainer__list'>
        { list?.map(item =>
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

export default observer(PlaylistContainer)
