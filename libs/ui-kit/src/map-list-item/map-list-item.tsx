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
  row?: ReactNode;
}

export const MapListItem: FC<MapListItemProps> = ({ item, click, className, children, row }) => {
  const dateFormat = (date: string) => {
    return !date ? '' : format(parseISO(date), 'yyyy-MM-dd')
  }
  const makeName = (item: IMapItem) => item.songName
    + (item.songSubName ? ' / ' + item.songSubName : '')
    + (item.songAuthorName ? ' / ' + item.songAuthorName : '');

  const statRound = (score: number) => (score * 100).toFixed(2)

  return (
    <div className={'MapListItem ' + className} title={ item.id } onClick={ click }>
      <div className="color"></div>
      <div className="row">
        <img loading="lazy" className="album" src={ item.coverURL }/>
        { !item?.stats ? '' :
          <div className="stat">
            <span className="down"></span>
            <span className="up" style={{ width: statRound(item.stats.score) + '%' }}></span>
            <span className="score">{ statRound(item.stats.score) }</span>
          </div>
        }
      </div>
      <div className="row">
        <div className="line -title">
          { makeName(item) }
          { !item.bpm ? '' :
            <span className='bpm' title='BPM'>{ item.bpm }</span>
          }
        </div>
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
      { !row ? '' :
        <div className="row">
          { row }
        </div>
      }
    </div>
  )
};

export default MapListItem;
