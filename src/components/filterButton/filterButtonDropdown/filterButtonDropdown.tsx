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
  options: DropdownMenuOption[];
  selectedOptions: string[];
  onInputClick: (value: string) => void;
  onValueClear: VoidFunction;
  onButtonClick: VoidFunction;
}

export const FilterButtonDropdown: FC<FilterButtonDropdownProps> = ({
  text,
  menuType,
  active = false,
  options,
  selectedOptions,
  onInputClick = () => undefined,
  onValueClear = () => undefined,
  onButtonClick = () => undefined,
}) => {
  const valueString = useMemo(
    () => (selectedOptions ? selectedOptions.join(', ') : undefined),
    [selectedOptions]
  );

  return (
    <Container>
      <FilterButtonContainer
        active={active}
        hasValues={Boolean(valueString)}
        onClick={onButtonClick}
      >
        {selectedOptions.length === 0 && (
          <>
            {text} <Chevron active={active} />
          </>
        )}
        {selectedOptions.length !== 0 && (
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
          selectedOptions={selectedOptions}
          onInputClick={onInputClick}
        />
      )}
    </Container>
  );
};
