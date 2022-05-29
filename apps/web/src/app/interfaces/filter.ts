import { FilterKey } from "../api";

export type FilterItem = ListFilterItem | WriteFilterItem;

export enum FilterItemType {
  list = 'list',
  write = 'write',
}

interface BaseFilterItem {
  name: string;
  key: FilterKey;
  type: FilterItemType;
  default?: boolean;
  unique?: boolean;
  filterFunc?: (value: string) => boolean;
}

interface ListFilterItem extends BaseFilterItem {
  type: FilterItemType.list;
  values: FilterItemValue[];
}

interface WriteFilterItem extends BaseFilterItem {
  type: FilterItemType.write;
}

export interface FilterItemValue {
  name: string;
  key: string;
}

export interface SearchValue {
  key: FilterKey;
  value: string;
  not?: boolean;
}
