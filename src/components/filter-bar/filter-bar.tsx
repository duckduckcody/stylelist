import map from 'lodash.map';
import { FC } from 'react';
import styled from 'styled-components';
import { useStore } from '../../store/useStore';
import { FilterButton } from '../filterButton/filterButton';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  padding: 24px;

  overflow: auto;

  max-width: 1200px;
  width: 100%;

  display: flex;
  flex-flow: row nowrap;
  gap: 24px;
`;

const SortButtonContainer = styled.div`
  margin-left: auto;
`;

export interface FilterBarProps {}

export const FilterBar: FC<FilterBarProps> = () => {
  const checkboxes = useStore((state) => state.filters.checkboxes);
  const radios = useStore((state) => state.filters.radios);
  const booleans = useStore((state) => state.filters.booleans);

  const activeFilterId = useStore((state) => state.filters.activeFilterId);
  // const setActiveFilerId = useStore((state) => state.filters.setActiveFilerId);

  const filterClick = useStore((state) => state.filters.filterClick);
  const clearFilters = useStore((state) => state.filters.clearFilters);

  // const closeDropdownIfActive = (id: string) => {
  //   if (id === activeFilterId) {
  //     setActiveFilerId('');
  //   }
  // };

  return (
    <Container>
      <ButtonContainer>
        {map(checkboxes, (data) => (
          <FilterButton
            type='dropdown'
            menuType='checkbox'
            text={data.text}
            active={activeFilterId === data.id}
            options={data.options}
            selectedOptions={data.selected}
            onButtonClick={() => filterClick(data.id)}
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
            active={activeFilterId === radios.sort.id}
            options={radios.sort.options}
            selectedOptions={radios.sort.selected}
            onButtonClick={() => filterClick(radios.sort.id)}
            onValueClear={() => radios.sort.setSelected('')}
            onInputClick={(val) => radios.sort.setSelected(val)}
          />
        </SortButtonContainer>
      </ButtonContainer>
    </Container>
  );
};
