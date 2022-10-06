import { FC } from 'react';
import { FilterButtonContainer } from '../filterButton.shared';
import { FilterButtonClearButton } from '../filterButtonClearButton';

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
  <FilterButtonContainer
    hasValues={active}
    as={active ? 'div' : 'button'}
    onClick={!active ? onButtonClick : undefined}
  >
    {text}
    {active && <FilterButtonClearButton onValueClear={onValueClear} />}
  </FilterButtonContainer>
);
