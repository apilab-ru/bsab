import React, { FC, ReactNode } from 'react';
import { Dialog } from '@mui/material';
import './map-player.scss';

const player = 'https://skystudioapps.com/bs-viewer/?noProxy=true&url=';

interface MapPlayerProps {
  isOpened: boolean;
  sourceUrl: string | null;
  handleClose: () => void;
  children?: ReactNode;
}

export const MapPlayer: FC<MapPlayerProps> = ({ isOpened, handleClose, sourceUrl, children }) => {

  const getLink = (openedId: string | null) => {
    if (!openedId) {
      return '';
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
