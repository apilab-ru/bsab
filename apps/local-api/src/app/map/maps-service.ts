import { MAP_MODE_CONVERT, MapCache, MapDifficultDetail, MapRav, RavMapDifficultDetailV2 } from "./map";
import { environment } from "../../environments/environment";
import { DIFFICULTY_MAP } from "@bsab/api/map/difficulty";
import { LocalMap, MapDifficultList, MapDiffiDetail, MapMode } from "@bsab/api/map/map";
import * as JSZip from 'jszip';
import { readMapDifficultDetail } from './map-parser';
const fs = require('fs');
const crypto = require('crypto')

const INFO_FILE = 'Info.dat';

export class MapsService {
  private lastChange: string;
  private cache: MapCache[];

  async loadMaps(): Promise<LocalMap[]> {
    const { mtime } = await fs.promises.stat(environment.levelsPath);

    if (!this.cache || mtime === this.lastChange) {
      const files = await fs.promises.readdir(environment.levelsPath);
      // .slice(1, 2)
      this.cache = await Promise.all(files.map(file => this.loadMap(file)));
    }

    return this.cache.map(({ rav, ...item }) => item);
  }

  getBeatSaverIds(list: LocalMap[]): string[] {
    const exp = new RegExp(/([0-9a-z]{4,}) .+/g);

    return list.map(({ id }) => {
      const res = exp.exec(id);

      return res ? res[1] : null;
    }).filter(it => !!it);
  }

  async installPreparedMaps(withDelete = false): Promise<number> {
    const list = await fs.promises.readdir(environment.installPath);

    if (!list) {
      return 0;
    }

    return Promise.all(
      list.map(file => fs.promises.readFile(environment.installPath + '/' + file)
        .then(data => JSZip.loadAsync(data))
        .then(async zip => {
          const name = file.replace('.zip', '');
          const dir = environment.levelsPath + '/' + name;
          await fs.promises.mkdir(dir);

          return Promise.all(Object.entries(zip.files).map(([fileName, fileData]) => {
            // @ts-ignore
            return fileData!.async('nodebuffer').then(content => fs.promises.writeFile(
              dir + '/' + fileName,
              content
            ))
          })).then(() => file)
        }).then((file) => {
          console.log('xxx file complete', file);

          if (withDelete) {
            return fs.promises.unlink(environment.installPath + '/' + file);
          }
        }).catch(error => {
          console.error('error with', error);
        })
      )
    ).then(() => list.length);
  }

  private readMapFiles(path: string, fileNames: string[]): Promise<{ name: string, data: string }[]> {
    return Promise.all(
      fileNames.map(name => fs.promises.readFile(path + name) as string)
    ).then(contents => {
      return fileNames.map((name, index) => ({
        name,
        data: contents[index],
      }))
    });
  }

  private async loadMap(id: string): Promise<MapCache> {
    const file = await fs.promises.readFile(environment.levelsPath + id + '/' + INFO_FILE);
    const { ctime } = await fs.promises.stat(environment.levelsPath + id + '/' + INFO_FILE);
    const rav: MapRav = JSON.parse(file);

    const files = rav._difficultyBeatmapSets.flatMap(group => {
      return group._difficultyBeatmaps.map(item => item._beatmapFilename);
    });

    const filesMap = await this.readMapFiles(environment.levelsPath + id + '/', files)
      .catch(error => {
        console.error('error read', error);
        return [];
      });

    const hash = this.makeHash(file, filesMap.map(({ data }) => data));

    const mapDifficultData: Record<string, MapDifficultDetail> = {};
    filesMap.forEach((item) => {
      if (item) {
        try {
          mapDifficultData[item.name] = readMapDifficultDetail(item.data);
        } catch (e) {
          console.error('cant read', id, e);
        }
      }
    });

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
            // mapDifficultData,
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
      sourceUrl: environment.host + `proxy/source/?name=` + id,
      author: rav._levelAuthorName,
      songAuthorName: rav._songAuthorName,
      difficultMap: this.convertDifficultMap(rav._difficultyBeatmapSets),
      createdAt: ctime,
      difsDetails,
      mods,
      duration,
      hash,
    }
  }

  private makeHash(file: string, files: string[]): string {
    return crypto.createHash("sha1")
      .update(file + files.join(''), "utf8")
      .digest("hex").toUpperCase()
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
