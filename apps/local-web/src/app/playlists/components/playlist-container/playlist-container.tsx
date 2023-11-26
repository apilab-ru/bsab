import './playlists-container.scss';
import { Playlist } from "@bsab/api/local/playlist";
import { observer } from "mobx-react";
import { useState } from "react";
import { playlistsService } from "../../services/playlists.service";
import LinkIcon from '@mui/icons-material/Link';
import { Link } from "react-router-dom";
import { Links } from "../../../links";

export interface PlaylistContainerProps {
  openPlaylist: (id: string) => void;
}

export function PlaylistContainer(props: PlaylistContainerProps) {
  const [{ list, openedId }] = useState(playlistsService)

  const getClassName = (item: Playlist) => {
    return 'playlistContainer__item' + ' ' + (item.id === openedId ? '-opened' : '')
  }

  const makeMapsLink = (item: Playlist) => {
    return Links.maps.filter({ playlist: item.id });
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
            <Link to={ makeMapsLink(item) } className='playlistContainer__item-link' onClick={ event => event.stopPropagation() }>
              <LinkIcon/>
            </Link>
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
