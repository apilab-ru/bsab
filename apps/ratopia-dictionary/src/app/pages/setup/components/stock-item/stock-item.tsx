import styles from './stock-item.module.scss';
import { IResource } from "../../../../services/game-store";
import { Autocomplete, Box, TextField } from "@mui/material";
import { getResourceIcon } from "../../../../models/res-list";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useChangeInput } from "@shared/forms/use-change-input";

export interface StockItemProps {
  resource: IResource;
  resources: string[];
  className?: string;
  updateResource: (resource: IResource) => void;
  deleteResource: () => void;
}

export function StockItem({resource, resources, className, updateResource, deleteResource}: StockItemProps) {
  const resourceChange = (id: string | null) => {
    if (id) {
      updateResource({
        ...resource,
        resource: id
      })
    }
  }

  const costChange = useChangeInput(value => updateResource({
    ...resource,
    cost: +value
  }))

  return (
    <div className={ styles.stockItem + ' ' + className }>
      <img className={ styles.stockItemIcon } src={ getResourceIcon(resource.resource) }/>
      <Autocomplete
        classes={ {root: styles.stockItemSelect} }
        options={ resources }
        value={ resource.resource }
        onChange={ (_, newValue) => resourceChange(newValue) }
        renderInput={ (params) => <TextField { ...params } label="Resource"/> }
        renderOption={ (props, option) => (
          <Box component="li" sx={ {'& > img': {mr: 2, flexShrink: 0}} } { ...props }>
            <img
              className={ styles.stockItemIconValue }
              loading="lazy"
              src={ getResourceIcon(option) }
            />
            { option }
          </Box>
        ) }
      />
      <TextField
        className={ styles.stockItemCost }
        label="Cost"
        variant="outlined"
        value={ resource.cost }
        onChange={ costChange }
      />
      <DeleteForeverIcon
        className={ styles.stockItemDeleteIcon }
        onClick={ deleteResource }
      />
    </div>
  );
}

export default StockItem;
