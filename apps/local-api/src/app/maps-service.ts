import { MAP_MODE_CONVERT, MapCache, MapDifficultDetail, MapRav, RavMapDifficultDetail } from "./map";
import { environment } from "../environments/environment";
import { Difficulty, DIFFICULTY_MAP } from "@bsab/api/map/difficulty";
import { IMap, MapDifficultList, MapDiffiDetail, MapMode } from "@bsab/api/map/map";

const fs = require('fs');

const INFO_FILE = 'Info.dat';

let index = 0;

export class MapsService {
  private lastChange: string;
  private cache: MapCache[];

  async loadMaps(): Promise<IMap[]> {
    const { mtime } = await fs.promises.stat(environment.levelsPath);

    if (!this.cache || mtime === this.lastChange) {
      const files = await fs.promises.readdir(environment.levelsPath);
      // .slice(1, 2)
      this.cache = await Promise.all(files.map(file => this.loadMap(file)));
    }

    return this.cache.map(({ rav, ...item }) => item);
  }

  private async loadMap(id: string): Promise<MapCache> {
    const file = await fs.promises.readFile(environment.levelsPath + id + '/' + INFO_FILE);
    const { ctime } = await fs.promises.stat(environment.levelsPath + id + '/' + INFO_FILE);
    const rav: MapRav = JSON.parse(file);

    const files = rav._difficultyBeatmapSets.flatMap(group => {
      return group._difficultyBeatmaps.map(item => fs.promises
        .readFile(environment.levelsPath + id + '/' + item._beatmapFilename)
        .then(file => {
          const { _notes: notes } = (JSON.parse(file) as RavMapDifficultDetail);
          const times = notes.length
            ? notes[notes.length - 1]._time
            : 0;
          return {
            data: {
              notesTotal: notes.length,
              times,
            },
            name: item._beatmapFilename
          } as { name: string, data: MapDifficultDetail }
        })
        .catch((error) => {
          console.error('cant read', error);
          return null;
        })
      )
    }).filter(item => !!item);

    const mapDifficultData = (await Promise.all(files))
      .reduce((obj, item) => {
        if (item) {
          obj[item.name] = item.data;
        }

        return obj;
      }, {});

    const difficultMap = this.convertDifficultMap(rav._difficultyBeatmapSets);
    const mods = difficultMap.map(item => item.mode);
    const diffDetails = {};

    let duration = 0;

    difficultMap.forEach(group => {
      group.list.forEach(item => {
        const data = mapDifficultData[item.file];
        if (data) {
          if (!duration) {
            duration = Math.ceil(data.times / rav._beatsPerMinute * 60);
          }

          const nps = data.notesTotal / duration;

          if (!diffDetails[item.difficulty] || diffDetails[item.difficulty] < nps) {
            diffDetails[item.difficulty] = nps;
          }
        } else {
          console.error(
            'not found',
            item.file,
            mapDifficultData,
            id,
          );
        }
      })
    });

    const difsDetails = Object.entries(diffDetails)
      .map(([difficulty, nps]) => ({ difficulty, nps } as MapDiffiDetail))

    return {
      rav,
      id,
      songName: rav._songName,
      songSubName: rav._songSubName,
      bpm: rav._beatsPerMinute,
      songFilename: this.getSongFile(id, rav._songFilename),
      coverURL: this.getImageFile(id, rav._coverImageFilename),
      author: rav._levelAuthorName,
      songAuthorName: rav._songAuthorName,
      difficultMap: this.convertDifficultMap(rav._difficultyBeatmapSets),
      createdAt: ctime,
      difsDetails,
      mods,
      duration,
    }
  }

  private getSongFile(id: string, file: string): string {
    return environment.host + `proxy/song?=${file}&id=${id}`
  }

  private getImageFile(id: string, file: string): string {
    return (environment.host + 'map/' + id + '/' + file);
  }

  private convertDifficultMap(list: MapRav['_difficultyBeatmapSets']): MapDifficultList[] {
    return list.map(item => {
      return {
        mode: MAP_MODE_CONVERT[item._beatmapCharacteristicName],
        list: item._difficultyBeatmaps.map(it => ({
          difficulty: DIFFICULTY_MAP[it._difficulty],
          noteJumpMovementSpeed: it._noteJumpMovementSpeed,
          noteJumpStartBeatOffset: it._noteJumpStartBeatOffset,
          obstacleColor: it._customData?._obstacleColor,
          file: it._beatmapFilename,
        }))
      }
    });
  }
}
