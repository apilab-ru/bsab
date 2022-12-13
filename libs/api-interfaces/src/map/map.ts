import { Difficulty } from "./difficulty";

export interface LocalMap {
  id: string;
  coverURL: string;
  songName: string;
  songSubName: string;
  songAuthorName: string;
  author: string;
  bpm: number;
  createdAt: string;

  songFilename: string;
  difsDetails: MapDiffiDetail[];
  mods: MapMode[];

  hash?: string;

  duration: number;
  difficultMap: MapDifficultList[];

  sourceUrl: string;

  soundURL?: string;
  downloadURL?: string;
}

export interface MapDiffiDetail {
  difficulty: Difficulty;
  nps: number;
}

export enum MapMode {
  degree90 = 'degree90',
  degree360 = 'degree360',
  lawless ='lawless',
  lightShow = 'lightShow',
  noArrows = 'noArrows',
  oneSaber = 'oneSaber',
  standard = 'standard',
}

export const MAP_MODE_CONVERT = {
   '90Degree': MapMode.degree90,
   '360Degree': MapMode.degree360,
   'Lawless': MapMode.lawless,
   'Lightshow': MapMode.lightShow,
   'NoArrows': MapMode.noArrows,
   'OneSaber': MapMode.oneSaber,
   'Standard': MapMode.standard
};

export interface MapDifficultList {
  mode: MapMode;
  list: MapDifficultInfo[];
}

export interface MapDifficultInfo {
  difficulty: Difficulty;
  noteJumpMovementSpeed: number;
  noteJumpStartBeatOffset: number;
  file: string;
  obstacleColor?: {
    r: number;
    g: number;
    b: number;
  }
}
