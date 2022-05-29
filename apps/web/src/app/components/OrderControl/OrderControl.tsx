import React, { FC } from 'react';
import './OrderControl.scss';
import { MenuItem, Select } from "@mui/material";
import { OrderField } from "../../api";
import { ORDER_FIELDS } from "../../models/filter-items";

interface OrderControlProps {
  orderField: OrderField;
  orderFieldChange: (field: OrderField) => void;
}

const OrderControl: FC<OrderControlProps> = (props) => {
  const updateOrder = (event: string) => props.orderFieldChange(event as OrderField);

  return (
    <div className="OrderControl">
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
    </div>
  )
};

export default OrderControl;
