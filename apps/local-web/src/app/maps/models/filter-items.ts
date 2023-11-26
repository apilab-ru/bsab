import { FilterItem, FilterItemType } from "@bsab/ui-kit/filter";

export enum LocalFilterKey {
   search = 'search',
   cinema = 'cinema',
   cinemaVideo = 'cinemaVideo',
   npsFrom = 'npsFrom',
   npsTo = 'npsTo',
   playlist = 'playlist',
   bpmFrom = 'bpmFrom',
   bpmTo = 'bpmTo',
   durationFrom = 'durationFrom',
   durationTo = 'durationTo'
}

export const LOCAL_FILTER_ITEMS: FilterItem[] = [
   {
      name: 'Search',
      key: 'search',
      type: FilterItemType.write,
      unique: true,
      filterFunc: () => true,
   },
   {
      name: 'Cinema',
      key: 'cinema',
      type: FilterItemType.boolean,
      unique: true,
   },
   {
      name: 'CinemaVideo',
      key: 'cinemaVideo',
      type: FilterItemType.boolean,
      unique: true,
   },
   {
      name: 'NPS From',
      key: 'npsFrom',
      type: FilterItemType.write,
      filterFunc: () => true,
      unique: true
   },
   {
      name: 'NPS To',
      key: 'npsTo',
      type: FilterItemType.write,
      filterFunc: () => true,
      unique: true
   },
   {
      name: 'Playlist',
      key: 'playlist',
      type: FilterItemType.write,
      filterFunc: () => false,
      unique: true
   },
   {
      name: 'BPM From',
      key: 'bpmFrom',
      type: FilterItemType.write,
      filterFunc: () => true,
      unique: true
   },
   {
      name: 'BPM To',
      key: 'bpmTo',
      type: FilterItemType.write,
      filterFunc: () => true,
      unique: true
   },
   {
      name: 'Duration from',
      key: 'durationFrom',
      type: FilterItemType.write,
      filterFunc: () => true,
      unique: true
   },
   {
      name: 'Duration to',
      key: 'durationTo',
      type: FilterItemType.write,
      filterFunc: () => true,
      unique: true
   }
];
