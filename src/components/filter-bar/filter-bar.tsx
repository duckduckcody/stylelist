import { FC } from 'react';
import styled from 'styled-components';
import { useStore } from '../../store/useStore';
import { MOBILE_BREAKPOINT } from '../../styles/global';
import { FilterButtonAction } from '../filter-button/filter-button-action/filter-button-action';
import { FilterButtonBoolean } from '../filter-button/filter-button-boolean/filter-button-boolean';
import { FilterButtonDropdown } from '../filter-button/filter-button-dropdown/filter-button-dropdown';

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
  className?: string;
}

export const FilterBar: FC<FilterBarProps> = ({ className }) => {
  const facetOptions = useStore((state) => state.filters.facetOptions);
  const onSale = useStore((state) => state.filters.onSale);
  const clearFilters = useStore((state) => state.filters.clearFilters);

  return (
    <Container className={className}>
      <ButtonContainer>
        {facetOptions.map((facet) => (
          <FilterButtonDropdown
            key={facet.text}
            type='dropdown'
            menuType={facet.type}
            text={facet.text}
            options={facet.options}
            selectedOptions={facet.selected}
            onValueClear={facet.clear}
            onInputClick={(val) => facet.setSelected(val)}
            createValueText={facet.createValueText}
          />
        ))}

        <FilterButtonBoolean
          type='boolean'
          active={onSale.selected}
          text={onSale.text}
          onButtonClick={() => onSale.setSelected(true)}
          onValueClear={() => onSale.setSelected(false)}
        />

        <ClearFiltersButtonContainer>
          <FilterButtonAction
            type='action'
            text='Clear Filters'
            onButtonClick={clearFilters}
          />
        </ClearFiltersButtonContainer>
      </ButtonContainer>
    </Container>
  );
};
