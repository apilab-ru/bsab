import { Difficulty } from '@bsab/api/map/difficulty';
import { IMapItem } from '@bsab/ui-kit/map-list-item';

export interface DifficultyDetail {
  difficulty: Difficulty;
  notes: number;
  bombs: number;
  obstacles: number;
  nps: number; // float
  length: number;
  cinema: boolean;
  seconds: number;
}

export interface MapStat {
  plays: number;
  downloads: number;
  upvotes: number;
  downvotes: number;
  score: number;
}

export interface MapDetail extends IMapItem {
  id: string;
  name: string;
  description: string;
  author: string;
  bpm: number;
  duration: number;
  songName: string;
  songSubName: string;
  songAuthorName: string;
  difs: Difficulty[];
  difsDetails: DifficultyDetail[];
  tags: number[];
  stats: MapStat;
  uploaded: Date;
  //automapper: boolean;
  //ranked: boolean;
  //qualified: boolean;
  createdAt: string;
  updatedAt: string;
  // lastPublishedAt: string;
  showed: boolean;
  // downloadURL: string;
  coverURL: string;
  soundURL: string;
  sourceUrl: string;
}
