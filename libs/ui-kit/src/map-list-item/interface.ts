import { MapDiffiDetail } from '@bsab/api/map/map';
import { MapStat } from '@bsab/api/map/map-detail';

export interface IMapItem {
   songName: string;
   songSubName?: string;
   songAuthorName?: string;
   id: string;
   coverURL: string;
   author: string;
   createdAt: string;
   duration: number;
   difsDetails: MapDiffiDetail[];

   stats?: MapStat;
}
