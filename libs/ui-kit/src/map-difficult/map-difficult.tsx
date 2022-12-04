import './map-difficult.scss';
import { MapDiffiDetail } from '@bsab/api/map/map';
import React from 'react';

export interface MapDifficultProps {
  details: MapDiffiDetail[];
  className?: string;
}

const DIFFICULT_MAP: Record<string, string> = {
  'easy': 'Easy',
  'expert': 'Expert',
  'expertPlus': 'Expert+',
  'hard': 'Hard',
  'normal': 'Normal',
};

export function MapDifficult({ details, className }: MapDifficultProps) {
  const round = (nps: number) => Math.round(nps * 100) / 100;

  if (!details) {
    console.trace('details');
    return (<></>);
  }

  const uniqList = details.filter(
    (it, index) => index === details.findIndex(orig => orig.difficulty === it.difficulty)
  );

  return (
    <div className={"difficultRoot " + className}>
    { uniqList.map(dif =>
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
  );
}

export default MapDifficult;
