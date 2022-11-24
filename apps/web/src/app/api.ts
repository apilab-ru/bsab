/*export enum Difficulty {
  expertPlus = 'ExpertPlus',
  expert = 'Expert',
  hard = 'Hard',
  normal = 'Normal',
  easy = 'Easy',
}

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
}*/

/*export interface Map {
  id: string;
  name: string;
  description: string;
  author: number;
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
  automapper: boolean;
  ranked: boolean;
  qualified: boolean;
  createdAt: string;
  updatedAt: string;
  lastPublishedAt: string;
  showed: boolean;
  downloadURL: string;
  coverURL: string;
  soundURL: string;
}*/

export enum FilterKey {
  dateFrom = 'dateFrom',
  npsFrom = 'npsFrom',
  npsTo = 'npsTo',
  search = 'search',
  tags = 'tags',
  showed = 'showed'
}

export interface FilterRequest {
  tagsPositive?: number[];
  tagsNegative?: number[];
  search?: string;
  npsFrom?: string;
  npsTo?: string;
  dateFrom?: string;
  showed?: boolean;
}

export interface Tag {
  id: number;
  name: string;
}

export enum OrderField {
  createdAt = 'createdAt',
  minNps = 'minNps',
  maxNps = 'maxNps',
  bpm = 'bpm',
  score = 'score',
}

export enum OrderDirection {
  asc = 'asc',
  desc = 'desc',
}
