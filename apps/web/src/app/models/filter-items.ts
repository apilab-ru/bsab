import { FilterItem, FilterItemType, SearchValue } from '../interfaces/filter';
import { FilterKey, FilterRequest } from '../api';
import { TAGS_LIST } from './tags';

type DistributiveOmit<T, K extends keyof any> = T extends any
   ? Omit<T, K>
   : never;

export const FILTER_ITEMS_MAP: Record<keyof typeof FilterKey, DistributiveOmit<FilterItem, 'key'>> = {
   search: {
      name: 'Search',
      type: FilterItemType.write,
      filterFunc: () => true,
      unique: true,
      default: true
   },
   tags: {
      name: 'Tag',
      type: FilterItemType.list,
      values: TAGS_LIST
   },
   npsFrom: {
      name: 'NPS From',
      type: FilterItemType.write,
      filterFunc: () => true,
      unique: true
   },
   npsTo: {
      name: 'NPS To',
      type: FilterItemType.write,
      filterFunc: () => true,
      unique: true
   },
   dateFrom: {
      name: 'Date From',
      type: FilterItemType.write,
      filterFunc: () => true,
      unique: true
   },
   showed: {
      name: 'Showed',
      type: FilterItemType.boolean,
      filterFunc: () => true,
      unique: true
   },
   bpmFrom: {
      name: 'BPM From',
      type: FilterItemType.write,
      filterFunc: () => true,
      unique: true
   },
   bpmTo: {
      name: 'BPM To',
      type: FilterItemType.write,
      filterFunc: () => true,
      unique: true
   }
};

export const FILTER_ITEMS: FilterItem[] = Object.entries(FILTER_ITEMS_MAP)
   .map(([key, item]) => ({ ...item, key } as FilterItem));

export function prepareFilterRequest(items: SearchValue[]): FilterRequest {
   const tagsPositive = items
      .filter(it => it.key === FilterKey.tags && !it.not)
      .map(item => +item.value);
   const tagsNegative = items
      .filter(it => it.key === FilterKey.tags && it.not)
      .map(item => +item.value);

   const args: Omit<FilterRequest, 'tags'> = {};

   Object.keys(FilterKey).filter(key => key !== 'tags').forEach(key => {
      // @ts-ignore
      args[key] = findValueByKey<string>(items, key as FilterKey);
   });

   return {
      tagsPositive,
      tagsNegative,
      ...args
   };
}

function findValueByKey<T>(items: SearchValue[], key: FilterKey): T | undefined {
   return items.find(it => it.key === key)?.value as T | undefined;
}

export const ORDER_FIELDS = [
   {
      name: 'Date Create',
      key: 'createdAt'
   },
   {
      name: 'Min Nps',
      key: 'minNps'
   },
   {
      name: 'Max Nps',
      key: 'maxNps'
   },
   {
      name: 'BPM',
      key: 'bpm'
   },
   {
      name: 'Score',
      key: 'score'
   }
];
