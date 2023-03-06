import { FilterKey } from '@bsab/api/request/request';

export type FilterItem = ListFilterItem | WriteFilterItem | BooleanFilterItem;

export enum FilterItemType {
  list = 'list',
  write = 'write',
  boolean = 'boolean',
}

interface BaseFilterItem {
  name: string;
  key: FilterKey;
  type: FilterItemType;
  default?: boolean;
  unique?: boolean;
  filterFunc?: (value: string) => boolean;
  userRequired?: boolean;
}

interface ListFilterItem extends BaseFilterItem {
  type: FilterItemType.list;
  values: FilterItemValue[];
}

interface WriteFilterItem extends BaseFilterItem {
  type: FilterItemType.write;
}

interface BooleanFilterItem extends BaseFilterItem {
  type: FilterItemType.boolean;
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
