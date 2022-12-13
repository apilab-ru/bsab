import { MapDataInfo } from "@bsab/api/map/info";
import { MapDifficulty } from "@bsab/api/map/difficulty";

export interface MapSourceData {
   info: MapDataInfo;
   diffs: Record<string, MapDifficulty>;
   song: string;
   duration: number;
}
