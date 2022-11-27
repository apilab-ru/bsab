import React, { FC, ReactNode } from 'react';
import './map-list-item.scss';
import { format, parseISO } from "date-fns";
import { IMapItem } from './interface';
import MapDifficult from '../map-difficult/map-difficult';
import { formatDuration } from '@bsab/ui-kit/date-utils/duration';

interface MapListItemProps {
  item: IMapItem;
  click?: () => void;
  className?: string;
  children?: ReactNode;
}

export const MapListItem: FC<MapListItemProps> = ({ item, click, className, children }) => {
  const dateFormat = (date: string) => format(parseISO(date), 'yyyy-MM-dd')
  const makeName = (item: IMapItem) => item.songName
    + (item.songSubName ? ' / ' + item.songSubName : '')
    + (item.songAuthorName ? ' / ' + item.songAuthorName : '');

  return (
    <div className={'MapListItem ' + className} title={ item.id } onClick={ click }>
      <div className="color"></div>
      <div className="row">
        <img className="album" src={ item.coverURL }/>
      </div>
      <div className="row">
        <div className="line -title">{ makeName(item) }</div>
        <div className="line -date">
          { dateFormat(item.createdAt) } / <b className={'duration'}>{ formatDuration(item.duration) }</b>
        </div>
        <MapDifficult
          details={item.difsDetails}
          className="line"
        ></MapDifficult>

        { !children ? '' :
          <div className={"line"}>
            { children }
          </div>
        }
      </div>
    </div>
  )
};

export default MapListItem;
