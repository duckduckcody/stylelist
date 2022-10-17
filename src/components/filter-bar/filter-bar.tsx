import map from 'lodash.map';
import { FC } from 'react';
import styled from 'styled-components';
import {
  BooleanFilterId,
  BooleanFilterOption,
  CheckboxFilter,
  CheckboxFilterId,
} from '../../store/filterStore';
import { MOBILE_BREAKPOINT } from '../../styles/global';
import { FilterButton } from '../filterButton/filterButton';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: white;
`;

const ButtonContainer = styled.div`
  width: 100%;
  overflow-x: auto;

  display: flex;
  flex-flow: row nowrap;

  gap: 16px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 0 8px 0 8px;
  } ;
`;

const ClearFiltersButtonContainer = styled.div`
  margin-left: auto;
`;

export interface FilterBarProps {
  checkboxes: Record<CheckboxFilterId, CheckboxFilter>;
  booleans: Record<BooleanFilterId, BooleanFilterOption>;
  clearFilters: VoidFunction;
  className?: string;
}

export const FilterBar: FC<FilterBarProps> = ({
  checkboxes,
  booleans,
  clearFilters,
  className,
}) => (
  <Container className={className}>
    <ButtonContainer>
      {map(checkboxes, (data) => (
        <FilterButton
          key={data.text}
          type='dropdown'
          menuType='checkbox'
          text={data.text}
          options={data.options}
          selectedOptions={data.selected}
          onValueClear={data.clear}
          onInputClick={(val) => data.setSelected(val)}
        />
      ))}

      <FilterButton
        type='boolean'
        active={booleans.onSale.selected}
        text={booleans.onSale.text}
        onButtonClick={() => booleans.onSale.setSelected(true)}
        onValueClear={() => booleans.onSale.setSelected(false)}
      />

      <ClearFiltersButtonContainer>
        <FilterButton
          type='action'
          text='Clear Filters'
          onButtonClick={clearFilters}
        />
      </ClearFiltersButtonContainer>
    </ButtonContainer>
  </Container>
);
