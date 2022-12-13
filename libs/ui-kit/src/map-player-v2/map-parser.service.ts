import * as JSZip from "jszip";
import { MapSourceData } from "./interface";
import { MapDataInfo, MapDataInfoRavV2 } from "@bsab/api/map/info";
import { MAP_MODE_CONVERT } from "@bsab/api/map/map";
import {
   DIFFICULTY_MAP,
   MapDifficulty,
   MapDifficultyRawV2,
} from "@bsab/api/map/difficulty";

export class MapParserService {
   fetchData(sourceUrl: string, duration: number): Promise<MapSourceData> {
      return fetch(sourceUrl)
         .then((response) => response.blob())
         .then(res => JSZip.loadAsync(res))
         .then(zip => {
            const files = Object.keys(zip.files);

            const datFiles = files.filter(name => name.includes('.dat'))!;

            const songFile = files.find(name => name.includes('.egg'))!;
            const cover = files.find(name => !name.includes('.dat') || !name.includes('.egg'))!;

            return Promise.all([
               zip.file(songFile)!.async('blob').then(blob => window.URL.createObjectURL(blob)),
               zip.file(cover)!.async('blob').then(blob => window.URL.createObjectURL(blob)),
               ...datFiles.map(name => zip.file(name)!.async('string').then(res => ({
                  name,
                  res: JSON.parse(res),
               }))),
            ])
            .then(([song, cover, ...data]) => {
               const info = data.find(({ name }) => name.includes('info'))!.res as MapDataInfoRavV2;

               const diffs: Record<string, MapDifficulty> = {};
               data.filter(({ name }) => !name.includes('info')).forEach(({ name, res }) => {
                  diffs[name] = this.parseMap(res);
               })

               return {
                  info: this.parseInfo(info, cover),
                  duration,
                  diffs,
                  song,
               }
            })
         });
   }

   private parseInfo(info: MapDataInfoRavV2, cover: string): MapDataInfo {
      return {
         version: info._version,
         songName: info._songName,
         bpm: info._beatsPerMinute,
         songTimeOffset: info._songTimeOffset,
         cover,
         environment: info._environmentName,
         diffs: info._difficultyBeatmapSets.map(setMap => {
            return {
               type: MAP_MODE_CONVERT[setMap._beatmapCharacteristicName],
               list: setMap._difficultyBeatmaps.map(diff => ({
                  difficulty: DIFFICULTY_MAP[diff._difficulty],
                  fileName: diff._beatmapFilename,
               }))
            }
         })
      }
   }

   private parseMap(raw: MapDifficultyRawV2): MapDifficulty {
      return {
         version: raw._version,
         obstacles: raw._obstacles.map(item => ({
            time: item._time,
            lineIndex: item._lineIndex,
            type: item._type,
            duration: item._duration,
            width: item._width,
         })),
         notes: raw._notes.map(item => ({
            time: item._time,
            lineCell: item._lineIndex,
            lineRow: item._lineLayer,
            type: item._type,
            cutDirection: item._cutDirection,
         })),
         events: raw._events.map(item => ({
            time: item._time,
            type: item._type,
            value: item._value,
         })),
      };
   }

}
