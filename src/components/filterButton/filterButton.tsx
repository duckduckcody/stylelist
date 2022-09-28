import { FC } from 'react';
import {
  FilterButtonAction,
  FilterButtonActionProps,
} from './filterButtonAction/filterButtonAction';
import {
  FilterButtonBoolean,
  FilterButtonBooleanProps,
} from './filterButtonBoolean/filterButtonBoolean';
import {
  FilterButtonDropdown,
  FilterButtonDropdownProps,
} from './filterButtonDropdown/filterButtonDropdown';

export type FilterButtonProps =
  | FilterButtonActionProps
  | FilterButtonBooleanProps
  | FilterButtonDropdownProps;

export const FilterButton: FC<FilterButtonProps> = (props) => {
  switch (props.type) {
    case 'action':
      return <FilterButtonAction {...props} />;
    case 'boolean':
      return <FilterButtonBoolean {...props} />;
    case 'dropdown':
      return <FilterButtonDropdown {...props} />;
  }
};
