import { FC } from 'react';
import { FilterButtonContainer } from '../filterButton.shared';
import { FilterButtonCrossButton } from '../filterButtonCrossButton';

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
    {active && <FilterButtonCrossButton onValueClear={onValueClear} />}
  </FilterButtonContainer>
);
