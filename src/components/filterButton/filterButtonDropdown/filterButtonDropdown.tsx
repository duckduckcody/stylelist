import { FC, useMemo } from 'react';
import styled from 'styled-components';
import ChevronIcon from '../../../icons/chevron.svg';
import { FilterButtonContainer } from '../filterButton.shared';
import { FilterButtonCrossButton } from '../filterButtonCrossButton';
import {
  DropdownMenuOption,
  FilterButtonDropdownMenu,
} from './filterButtonDropdownMenu/filterButtonDropdownMenu';

const Container = styled.div`
  position: relative;
`;

const StyledFilterButtonDropdownMenu = styled(FilterButtonDropdownMenu)`
  position: absolute;
  top: 100%;
  left: 0;
`;

const Chevron = styled(ChevronIcon)<{ active: boolean }>`
  width: 12px;
  height: 12px;
  transform: ${(p) => (p.active ? 'rotate(180deg)' : '')};
`;

export interface FilterButtonDropdownProps {
  type: 'dropdown';
  text: string;
  menuType: 'checkbox' | 'radio';
  active: boolean;
  values: string[];
  options: DropdownMenuOption[];
  onInputClick?: (value: string) => void;
  onValueClear: VoidFunction;
  onButtonClick: VoidFunction;
}

export const FilterButtonDropdown: FC<FilterButtonDropdownProps> = ({
  text,
  menuType,
  active = false,
  values,
  options,
  onInputClick = () => undefined,
  onValueClear = () => undefined,
  onButtonClick = () => undefined,
}) => {
  const valueString = useMemo(
    () => (values ? values.join(', ') : undefined),
    [values]
  );

  return (
    <Container>
      <FilterButtonContainer
        active={active}
        hasValues={Boolean(valueString)}
        as={valueString ? 'div' : 'button'}
        onClick={onButtonClick}
      >
        {values.length === 0 && (
          <>
            {text} <Chevron active={active} />
          </>
        )}
        {values.length !== 0 && (
          <>
            {valueString}
            <FilterButtonCrossButton onValueClear={onValueClear} />
          </>
        )}
      </FilterButtonContainer>
      {active && (
        <StyledFilterButtonDropdownMenu
          type={menuType}
          name={text}
          options={options}
          checkedOptions={values}
          onInputClick={onInputClick}
        />
      )}
    </Container>
  );
};
