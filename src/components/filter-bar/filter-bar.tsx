import map from 'lodash.map';
import { FC } from 'react';
import styled from 'styled-components';
import { useStore } from '../../store/useStore';
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

  gap: 24px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 16px;
    padding: 16px;
  }
`;

const ClearFiltersButtonContainer = styled.div`
  margin-left: auto;
`;

export interface FilterBarProps {
  className?: string;
}

export const FilterBar: FC<FilterBarProps> = ({ className }) => {
  const checkboxes = useStore((state) => state.filters.checkboxes);
  const booleans = useStore((state) => state.filters.booleans);
  const clearFilters = useStore((state) => state.filters.clearFilters);

  return (
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
};
