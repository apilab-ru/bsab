import { FilterItem, FilterItemType, SearchValue } from "../interfaces/filter";
import { FilterKey, FilterRequest } from "../api";
import { TAGS_LIST } from "./tags";

type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export const FILTER_ITEMS_MAP: Record<keyof typeof FilterKey, DistributiveOmit<FilterItem, 'key'>> = {
  search: {
    name: 'Search',
    type: FilterItemType.write,
    filterFunc: () => true,
    unique: true,
    default: true,
  },
  tags: {
    name: 'Tag',
    type: FilterItemType.list,
    values: TAGS_LIST,
  },
  npsFrom: {
    name: 'NPS From',
    type: FilterItemType.write,
    filterFunc: () => true,
    unique: true,
  },
  npsTo: {
    name: 'NPS To',
    type: FilterItemType.write,
    filterFunc: () => true,
    unique: true,
  },
  dateFrom: {
    name: 'Date From',
    type: FilterItemType.write,
    filterFunc: () => true,
    unique: true,
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
  const search = findValueByKey(items, FilterKey.search);
  const npsFrom = findValueByKey(items, FilterKey.npsFrom);
  const npsTo = findValueByKey(items, FilterKey.npsTo);
  const dateFrom = findValueByKey(items, FilterKey.dateFrom);
  return {
    tagsPositive,
    tagsNegative,
    search,
    npsFrom,
    npsTo,
    dateFrom,
  }
}

function findValueByKey(items: SearchValue[], key: FilterKey): string | undefined {
  return items.find(it => it.key === key)?.value;
}

export const ORDER_FIELDS = [
  {
    name: 'Date Create',
    key: 'createdAt',
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
