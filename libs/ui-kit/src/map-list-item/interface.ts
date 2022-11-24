import { MapDiffiDetail } from '@bsab/api/map/map';

export interface IMapItem {
  songName: string;
  songSubName?: string;
  songAuthorName?: string;
  id: string;
  coverURL: string;
  author: string;
  createdAt: string;
  difsDetails: MapDiffiDetail[];
}
