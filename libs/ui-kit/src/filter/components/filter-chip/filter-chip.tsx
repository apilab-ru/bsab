import React, { FC } from 'react';
import './filter-chip.scss';
import { FilterItem, FilterItemType, SearchValue } from "../../models/filter";

import { IconButton } from "@mui/material";

interface FilterChipProps {
    item: SearchValue;
    onDelete: () => void;
    onEdit: () => void;
    className: string;
    detail: FilterItem;
}

const FilterChip: FC<FilterChipProps> = ({ item, onDelete, onEdit, className, detail }) => {
    let title = item.value;

    if (detail.type === FilterItemType.list) {
        title = detail.values.find(it => it.key === item.value)?.name || item.value;
    }

    return (
        <div className={'FilterChip' + (item.not ? ' -not' : '') + (' ' + className)  }>
            <div className="name" onClick={ onEdit }>
                { detail.name }
            </div>
            <div className="value" onClick={ onEdit }>
                { item.not &&
                    <span>Not </span>
                }
                { title }
            </div>
            <IconButton onClick={onDelete}>X</IconButton>
        </div>
    )
};

export default FilterChip;
