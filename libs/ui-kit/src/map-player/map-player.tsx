import React, { FC, ReactNode } from 'react';
import { Dialog } from '@mui/material';
import './map-player.scss';

const player = 'https://skystudioapps.com/bs-viewer/?noProxy=true&url=';

const playerById = 'https://allpoland.github.io/ArcViewer/?id=';

const regExpId = /^([0-9A-Za-z]+)$/;

interface MapPlayerProps {
  isOpened: boolean;
  sourceUrl: string | null | undefined;
  handleClose: () => void;
  children?: ReactNode;
}

// v3 map 28579, 27d5b
// off editor 27a13

export const MapPlayer: FC<MapPlayerProps> = ({ isOpened, handleClose, sourceUrl, children }) => {

  const getLink = (openedId: string | null | undefined) => {
    if (!openedId) {
      return '';
    }

    if (regExpId.test(sourceUrl!)) {
      return playerById + openedId;
    }

    return player + sourceUrl;
  }

  return (
    <Dialog onClose={ handleClose } open={ isOpened } maxWidth={false}>
      <div className="mapPlayerContent">
        <iframe className="mapPlayerFrame" src={ getLink(sourceUrl) }/>
        {children}
      </div>
    </Dialog>
  );
}
