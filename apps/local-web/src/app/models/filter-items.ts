import { FilterItem, FilterItemType } from "@bsab/ui-kit/filter";

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
];
