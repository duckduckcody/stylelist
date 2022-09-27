import { FC, useMemo } from 'react';
import styled from 'styled-components';
import ChevronIcon from '../../../icons/chevron.svg';
import { FilterButtonContainer } from '../filterButton.shared';
import { FilterButtonCrossButton } from '../filterButtonCrossButton';
import { FilterButtonDropdownMenu } from './filterButtonDropdownMenu/filterButtonDropdownMenu';

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
  text: string;
  type: 'checkbox' | 'radio';
  active: boolean;
  values: string[];
  onValueClear: VoidFunction;
  onButtonClick: VoidFunction;
}

export const FilterButtonDropdown: FC<FilterButtonDropdownProps> = ({
  text,
  type,
  active = false,
  values,
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
      {active && (
        <StyledFilterButtonDropdownMenu
          type={type}
          name={text}
          options={[
            { label: 'Womens', value: 'Womens' },
            { label: 'Mens', value: 'Mens' },
          ]}
        />
      )}
    </Container>
  );
};
