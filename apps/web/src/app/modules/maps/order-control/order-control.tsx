import React, { FC } from 'react';
import './order-control.scss';
import { MenuItem, Select } from "@mui/material";
import { OrderDirection, OrderField } from '@bsab/api/request/request';
import { ORDER_FIELDS } from "../../../models/search";
import SortIcon from '@mui/icons-material/Sort';

interface OrderControlProps {
  orderField: OrderField;
  orderDirection: OrderDirection;
  orderFieldChange: (field: OrderField) => void;
  orderDirectionChange: (direction: OrderDirection) => void;
  className?: string;
}

const OrderControl: FC<OrderControlProps> = ({orderDirection, className, ...props}) => {
  const updateOrder = (event: string) => props.orderFieldChange(event as OrderField);
  const toggleDirection = () => {
    const direction = orderDirection === OrderDirection.desc ? OrderDirection.asc : OrderDirection.desc;
    props.orderDirectionChange(direction)
  };

  return (
    <div className={ 'OrderControl ' + className }>
      <Select
        labelId="order-field"
        id="order-field-select"
        value={ props.orderField }
        label="Order Field"
        onChange={ (event) => updateOrder(event.target.value) }
      >
        { ORDER_FIELDS.map(item =>
          <MenuItem value={ item.key } key={ item.key }>{ item.name }</MenuItem>
        ) }
      </Select>
      <SortIcon
        className={'orderDirection' + (orderDirection === OrderDirection.asc ? ' -asc' : '')}
        onClick={ () => toggleDirection() }
      />
    </div>
  )
};

export default OrderControl;
