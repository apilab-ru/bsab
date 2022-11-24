import React, { FC } from 'react';
import './map-list-item.scss';
import { format, parseISO } from "date-fns";
import { IMapItem } from './interface';
import { MapDiffiDetail } from '@bsab/api/map/map';

interface MapListItemProps {
  item: IMapItem;
  click?: () => void;
}

const DIFFICULT_MAP: Record<string, string> = {
  'easy': 'Easy',
  'expert': 'Expert',
  'expertPlus': 'Expert+',
  'hard': 'Hard',
  'normal': 'Normal',
};

export const MapListItem: FC<MapListItemProps> = ({ item, click }) => {
  const dateFormat = (date: string) => format(parseISO(date), 'yyyy-MM-dd HH:mm')
  const round = (nps: number) => Math.round(nps * 100) / 100
  const makeName = (item: IMapItem) => item.songName
    + (item.songSubName ? ' / ' + item.songSubName : '')
    + (item.songAuthorName ? ' / ' + item.songAuthorName : '');

  return (
    <div className="MapListItem" title={ item.id } onClick={ click }>
      <div className="color"></div>
      <div className="row">
        <img className="album" src={ item.coverURL }/>
      </div>
      <div className="row">
        <div className="line -title">{ makeName(item) }</div>
        <div className="line">
          <span className="author">{ item.author } </span>
          <span className="date">{ dateFormat(item.createdAt) }</span>
        </div>
        <div className="line">
          { item.difsDetails.map(dif =>
            <span
              className={ 'difficult -' + dif.difficulty }
              key={ dif.difficulty }
              title={ JSON.stringify(dif) }
            >
              <b>{ round(dif.nps) }</b>
              { DIFFICULT_MAP[dif.difficulty] }
            </span>
          ) }
        </div>
      </div>
      <div className="row">
        <div className="line">{ item.id }</div>
      </div>
    </div>
  )
};

export default MapListItem;
