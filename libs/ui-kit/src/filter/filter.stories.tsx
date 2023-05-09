import { Story } from "@storybook/react";
import { Filter, FilterProps, SearchValue } from "./index";
import { FilterItem, FilterItemType } from "./models/filter";
import { FilterKey } from "../../../bsab-models/src/request/request";

export default {
  component: Filter,
  title: 'Filter',
};

const Template: Story<FilterProps> = (args) => <Filter {...args} />;

export const Primary = Template.bind({});

let values: SearchValue[] = [];

const filterItems: FilterItem[] = [
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
  }
];

Primary.args = {
  values,
  filterItems,
  onAddValue: (item) => values.push(item),
  onDeleteValue: (index) => {
    values.splice(index, 1);
  }
};
