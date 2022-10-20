import { FC } from 'react';
import { FilterButton, FilterButtonClearButton } from '../filter-button';

export interface FilterButtonBooleanProps {
  type: 'boolean';
  active: boolean;
  text: string;
  onValueClear: VoidFunction;
  onButtonClick: VoidFunction;
}

export const FilterButtonBoolean: FC<FilterButtonBooleanProps> = ({
  active,
  text,
  onValueClear,
  onButtonClick,
}) => (
  <FilterButton
    hasValues={active}
    as={active ? 'div' : 'button'}
    onClick={!active ? onButtonClick : undefined}
  >
    {text}
    {active && <FilterButtonClearButton onValueClear={onValueClear} />}
  </FilterButton>
);
