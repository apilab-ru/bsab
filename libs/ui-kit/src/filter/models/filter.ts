export type FilterItem = ListFilterItem | WriteFilterItem | BooleanFilterItem;

export enum FilterItemType {
  list = 'list',
  write = 'write',
  boolean = 'boolean',
}

interface BaseFilterItem {
  name: string;
  key: string;
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
  key: string;
  value: string;
  not?: boolean;
}
