import React, { FC } from 'react';
import './MapListItem.scss';
import { Map } from "../../api";
import { format, parseISO } from "date-fns";

interface MapListItemProps {
  item: Map;
}

const DIFFICULT_MAP: Record<string, string> = {
  'easy': 'Easy',
  'expert': 'Expert',
  'expertPlus': 'Expert+',
  'hard': 'Hard',
  'normal': 'Normal',
};

const MapListItem: FC<MapListItemProps> = ({ item }) => {
  const dateFormat = (date: string) => format(parseISO(date), 'yyyy-MM-dd HH:mm')
  const round = (nps: number) => Math.round(nps * 100) / 100

  return (
    <div className="MapListItem" title={ item.id }>
      <div className="color"></div>
      <div className="row">
        <img className="album" src={ item.coverURL }/>
      </div>
      <div className="row">
        <div className="line -title">{ item.name }</div>
        <div className="line">
          <span className="author">{ item.author } </span>
          <span className="date">{ dateFormat(item.createdAt) }</span>
        </div>
        <div className="line">
          { item.difsDetails.map(dif =>
            <span
              className={ 'difficult -' + dif.difficulty }
              key={ dif.difficulty }
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
