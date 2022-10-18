import { FC } from 'react';
import {
  FilterButtonDropdown,
  FilterButtonDropdownProps,
} from './filterButtonDropdown/filterButtonDropdown';

export type FacetFilterButtonProps = FilterButtonDropdownProps;

export const FacetFilterButton: FC<FacetFilterButtonProps> = (props) => {
  switch (props.type) {
    case 'dropdown':
      return <FilterButtonDropdown {...props} />;
  }
};
