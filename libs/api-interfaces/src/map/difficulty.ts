export enum Difficulty {
  expertPlus = 'expertPlus',
  expert = 'expert',
  hard = 'hard',
  normal = 'normal',
  easy = 'easy',
}

export const DIFFICULTY_MAP = {
  'ExpertPlus': Difficulty.expertPlus,
  'Expert': Difficulty.expert,
  'Hard': Difficulty.hard,
  'Normal': Difficulty.normal,
  'Easy': Difficulty.easy,
} as const;

export type DifficultyRaw = keyof typeof DIFFICULTY_MAP;

export interface MapDifficulty {
   version: string;
   obstacles: {
      time: number;
      lineIndex: number;
      type: number;
      duration: number;
      width: number;
   }[];
   notes: {
      time: number;
      lineCell: MapLineCell;
      lineRow: MapLineRow;
      type: MapNoteType;
      cutDirection: MapNoteCutDirection;
   }[];
   events: {
      time: number;
      type: MapEventType;
      value: MApEventValue;
   }[];
}

export type MapLineCell = 0 | 1 | 2 | 3;
export type MapLineRow = 0 | 1 | 2;
export type MapNoteType = 0 | 1;
export enum MapNoteCutDirection {
   bottom = 0,
   top = 1,
   left = 2,
   right = 3,
   topLeft = 4,
   topRight = 5,
   bottomLeft = 6,
   bottomRight = 7,
}
export type MapEventType = 0 | 2 | 3 | 4 | 12 | 13;
export type MApEventValue = 3 | 4 | 7;

export interface MapDifficultyRawV2 {
   _version: string;
   _obstacles: {
      "_time": number,
      "_lineIndex": MapLineCell,
      "_type": number,
      "_duration": number,
      "_width": number,
   }[];
   _notes: MapNoteRawV2[];
   _events: {
      "_time": number,
      "_type": MapEventType,
      "_value": MApEventValue,
   }[];
}

export interface MapNoteRawV2 {
   "_time": number,
   "_lineIndex": MapLineCell;
   "_lineLayer": MapLineRow;
   "_type": MapNoteType;
   "_cutDirection": MapNoteCutDirection;
}
