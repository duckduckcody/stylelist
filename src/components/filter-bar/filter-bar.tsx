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
`;

const ButtonContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  overflow-x: auto;

  display: flex;
  flex-flow: row nowrap;

  gap: 24px;
  padding: 24px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 16px;
    padding: 16px;
  }
`;

const SortButtonContainer = styled.div`
  margin-left: auto;
`;

export interface FilterBarProps {}

export const FilterBar: FC<FilterBarProps> = () => {
  const checkboxes = useStore((state) => state.filters.checkboxes);
  const radios = useStore((state) => state.filters.radios);
  const booleans = useStore((state) => state.filters.booleans);
  const clearFilters = useStore((state) => state.filters.clearFilters);

  return (
    <Container>
      <ButtonContainer>
        {map(checkboxes, (data) => (
          <FilterButton
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

        <FilterButton
          type='action'
          text='Clear Filters'
          onButtonClick={clearFilters}
        />

        <SortButtonContainer>
          <FilterButton
            type='dropdown'
            menuType='radio'
            text={radios.sort.text}
            options={radios.sort.options}
            selectedOptions={radios.sort.selected}
            onValueClear={() => radios.sort.setSelected('')}
            onInputClick={(val) => radios.sort.setSelected(val)}
          />
        </SortButtonContainer>
      </ButtonContainer>
    </Container>
  );
};
