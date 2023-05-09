import { Tag } from "@bsab/api/request/request";
import { FilterItemValue } from "./filter";

export const TAGS: Tag[] = [
  { "id": 1, "name": "Accuracy" },
  { "id": 2, "name": "Pop" },
  { "id": 3, "name": "RB" },
  { "id": 4, "name": "DanceStyle" },
  { "id": 5, "name": "Speed" },
  { "id": 6, "name": "Metal" },
  { "id": 7, "name": "ComedyMeme" },
  { "id": 8, "name": "Balanced" },
  { "id": 9, "name": "Electronic" },
  { "id": 10, "name": "Dubstep" },
  { "id": 11, "name": "jPop" },
  { "id": 12, "name": "" },
  { "id": 13, "name": "Anime" },
  { "id": 14, "name": "jRock" },
  { "id": 15, "name": "Punk" },
  { "id": 16, "name": "Rock" },
  { "id": 17, "name": "Tech" },
  { "id": 18, "name": "Vocaloid" },
  { "id": 19, "name": "Challenge" },
  { "id": 20, "name": "Fitness" },
  { "id": 21, "name": "VideoGame" },
  { "id": 22, "name": "House" },
  { "id": 23, "name": "Alternative" },
  { "id": 24, "name": "Speedcore" },
  { "id": 25, "name": "HipHop" },
  { "id": 26, "name": "Dance" },
  { "id": 27, "name": "Techno" },
  { "id": 28, "name": "Instrumental" },
  { "id": 29, "name": "Swing" },
  { "id": 30, "name": "Indie" },
  { "id": 31, "name": "HardCore" },
  { "id": 32, "name": "kPop" },
  { "id": 33, "name": "FunkDisco" },
  { "id": 34, "name": "Classical" },
  { "id": 35, "name": "TvMovie" },
  { "id": 36, "name": "Ambient" },
  { "id": 37, "name": "FolkAcoustic" },
  { "id": 38, "name": "DrumAndBass" },
  { "id": 39, "name": "Nightcore" },
  { "id": 40, "name": "Soul" },
  { "id": 41, "name": "Kids" },
  { "id": 42, "name": "Trance" },
  { "id": 43, "name": "Jazz" },
  { "id": 44, "name": "Holiday" }
];

export const TAGS_LIST: FilterItemValue[] = TAGS
  .filter(it => it.name)
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(item => ({
    key: item.id.toString(),
    name: item.name,
  }))
