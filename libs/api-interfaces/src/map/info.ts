import { Difficulty, DifficultyRaw } from "@bsab/api/map/difficulty";
import { MAP_MODE_CONVERT, MapMode } from "@bsab/api/map/map";

export interface MapDataInfo {
   version: string;
   songName: string;
   bpm: number;
   songTimeOffset: number;
   cover: string;
   environment: string;
   diffs: MapDataInfoMod[];
}

export interface MapDataInfoMod {
   type: MapMode;
   list: MapDiffInfo[];
}

export interface MapDiffInfo {
   difficulty: Difficulty;
   fileName: string;
}

export interface MapDataInfoRavV2 {
   "_version": string;
   "_songName": string;
   "_songSubName": "",
   "_songAuthorName": "",
   "_levelAuthorName": string;
   "_beatsPerMinute": 200,
   "_songTimeOffset": 0,
   "_shuffle": 0,
   "_shufflePeriod": 0.5,
   "_previewStartTime": 12,
   "_previewDuration": 10,
   "_songFilename": "Overlord Season 3 Opening Theme.egg",
   "_coverImageFilename": "cover.jpg",
   "_environmentName": "NiceEnvironment",
   "_customData": {
      "_contributors": [],
      "_customEnvironment": "",
      "_customEnvironmentHash": ""
   },
   "_difficultyBeatmapSets": MapDataInfoRavV2DiffSet[];
}

export interface MapDataInfoRavV2DiffSet {
   "_beatmapCharacteristicName": keyof typeof MAP_MODE_CONVERT,
   "_difficultyBeatmaps": {
      "_difficulty": DifficultyRaw,
      "_difficultyRank": number,
      "_beatmapFilename": string,
      "_noteJumpMovementSpeed": number,
      "_noteJumpStartBeatOffset": number,
      "_customData": {
         "_difficultyLabel": "",
         "_editorOffset": number,
         "_editorOldOffset": number,
         "_warnings": [],
         "_information": [],
         "_suggestions": [],
         "_requirements": []
      }
   }[]
}
