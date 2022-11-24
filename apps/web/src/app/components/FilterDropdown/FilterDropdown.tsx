import React, { FC } from 'react';
import './FilterDropdown.scss';
import { FilterItem, FilterItemType, FilterItemValue } from '../../interfaces/filter';
import NgIf from '../NgIf/NgIf';
import { Button } from '@mui/material';
import { FilterKey } from "../../api";

interface FilterDropdownProps {
  onChangeGroup: (group: FilterKey | null, isNegative?: boolean) => void;
  items: FilterItem[];
  focusGroup: string | null;
  group: string | null;

  onChangeValue: (value: string | null, isNegative?: boolean) => void;
  values: FilterItemValue[] | null;
  focusValue: string | null,
  value: string | null;
}

interface listItemsProps<T> {
  onChange: (value: T, isNegative?: boolean) => void;
  items: FilterItemValue[] | FilterItem[];
  selected: string | null;
  withNegative?: boolean;
}

const ListItems: FC<listItemsProps<any>> = ({ items, selected, onChange, withNegative }) => {

  const hasNegative = (item: Partial<FilterItem> | {}) => withNegative || (item as FilterItem).type === FilterItemType.boolean;

  return (
    <div className='list'>
      { items.map(({ key, name, ...item }) =>
        <div className="line" key={ key }>
          <Button
            onClick={ () => onChange(key) }
            classes={ selected === key ? { root: '-active' } : {} }
          >
            { name }
            { !!hasNegative(item) &&
            <span className='positive'>+</span>
            }
          </Button>
          { !!hasNegative(item) &&
          <Button
            onClick={ () => onChange(key, true) }
            classes={ { root: '-negative' } }
          >
            −
          </Button>
          }
        </div>
      ) }
    </div>
  )
}

const FilterDropdown: FC<FilterDropdownProps> = (props) => {

  return (
    <div className="FilterDropdown">
      { !props.group &&
      <ListItems
        items={ props.items }
        selected={ props.focusGroup }
        onChange={ props.onChangeGroup }
      />
      }
      <NgIf show={ !!props.group }>
        <Button onClick={ () => props.onChangeGroup(null) }>Back</Button>

        { !!props.values?.length &&
        <ListItems
          items={ props.values }
          selected={ props.focusValue }
          onChange={ props.onChangeValue }
          withNegative={ true }
        />
        }
      </NgIf>
    </div>
  )

}

export default FilterDropdown;
