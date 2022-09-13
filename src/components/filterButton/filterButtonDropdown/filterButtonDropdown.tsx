import { FC, useMemo } from 'react';
import styled from 'styled-components';
import ChevronIcon from '../../../icons/chevron.svg';
import { FilterButtonContainer } from '../filterButton.shared';
import { FilterButtonCrossButton } from '../filterButtonCrossButton';

const Chevron = styled(ChevronIcon)<{ active: boolean }>`
  width: 12px;
  height: 12px;
  transform: ${(p) => (p.active ? 'rotate(180deg)' : '')};
`;

export interface FilterButtonDropdownProps {
  text: string;
  active: boolean;
  values: string[];
  onValueClear: VoidFunction;
}

export const FilterButtonDropdown: FC<FilterButtonDropdownProps> = ({
  text,
  active = false,
  values,
  onValueClear = () => undefined,
}) => {
  const valueString = useMemo(
    () => (values ? values.join(', ') : undefined),
    [values]
  );

  return (
    <FilterButtonContainer
      active={active}
      hasValues={Boolean(valueString)}
      as={valueString ? 'div' : 'button'}
    >
      {!values && (
        <>
          {text} <Chevron active={active} />
        </>
      )}
      {values && (
        <>
          {valueString}
          <FilterButtonCrossButton onValueClear={onValueClear} />
        </>
      )}
    </FilterButtonContainer>
  );
};
