import { FC } from 'react';
import { FilterButtonContainer } from '../filterButton.shared';
import { FilterButtonCrossButton } from '../filterButtonCrossButton';

export interface FilterButtonBooleanProps {
  active: boolean;
  text: string;
  onValueClear: VoidFunction;
}

export const FilterButtonBoolean: FC<FilterButtonBooleanProps> = ({
  active,
  text,
  onValueClear,
}) => (
  <FilterButtonContainer hasValues={active} as={active ? 'div' : 'button'}>
    {text}
    {active && <FilterButtonCrossButton onValueClear={onValueClear} />}
  </FilterButtonContainer>
);
