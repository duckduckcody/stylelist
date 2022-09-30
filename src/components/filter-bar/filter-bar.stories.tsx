import { Meta, Story } from '@storybook/react';
import { Dispatch, SetStateAction, useRef } from 'react';
import { withDesign } from 'storybook-addon-designs';
import styled from 'styled-components';
import { useOnClickOutside } from 'usehooks-ts';
import shallow from 'zustand/shallow';
import { useStore } from '../../store/useStore';
import { FilterButton } from '../filterButton/filterButton';
import { FilterBar, FilterBarProps } from './filter-bar';

export default {
  title: 'atoms/Filter Bar',
  component: FilterBar,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/hxHc7LA2ArHhuHhm5lV3s0/stylelist?node-id=316%3A225',
    },
  },
} as Meta;

const SortButtonContainer = styled.div`
  margin-left: auto;
`;

const WithFilterButtonsTemplate: Story<FilterBarProps> = (args) => {
  const genderRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  const [
    filterOptions,
    activeFilterId,
    setActiveFilerId,
    filterClick,
    selectedGenders,
    setSelectedGenders,
    selectedSizes,
    setSelectedSizes,
    selectedCategories,
    setSelectedCategories,
    selectedBrands,
    setSelectedBrands,
    selectedPrices,
    setSelectedPrices,
    selectedSort,
    setSelectedSort,
    onSale,
    setOnSale,
    clearFilters,
  ] = useStore(
    ({ filters }) => [
      filters.filterOptions,
      filters.activeFilterId,
      filters.setActiveFilerId,
      filters.filterClick,
      filters.selectedGenders,
      filters.setSelectedGenders,
      filters.selectedSizes,
      filters.setSelectedSizes,
      filters.selectedCategories,
      filters.setSelectedCategories,
      filters.selectedBrands,
      filters.setSelectedBrands,
      filters.selectedPrices,
      filters.setSelectedPrices,
      filters.selectedSort,
      filters.setSelectedSort,
      filters.onSale,
      filters.setOnSale,
      filters.clearFilters,
    ],
    shallow
  );

  const onCheckboxClick = (
    val: string,
    setState: Dispatch<SetStateAction<string[]>>
  ) =>
    setState((state) => {
      if (state.includes(val)) {
        return state.filter((s) => s !== val);
      } else {
        return state.concat(val);
      }
    });

  const closeDropdownIfActive = (id: string) => {
    if (id === activeFilterId) {
      setActiveFilerId('');
    }
  };

  useOnClickOutside(genderRef, () =>
    closeDropdownIfActive(filterOptions.gender.id)
  );
  useOnClickOutside(sizeRef, () => closeDropdownIfActive('Size'));
  useOnClickOutside(categoryRef, () => closeDropdownIfActive('Category'));
  useOnClickOutside(brandRef, () => closeDropdownIfActive('Brand'));
  useOnClickOutside(priceRef, () => closeDropdownIfActive('Price'));
  useOnClickOutside(sortRef, () => closeDropdownIfActive('Sort'));

  return (
    <FilterBar>
      <div ref={genderRef}>
        <FilterButton
          type='dropdown'
          text='Gender'
          active={activeFilterId === filterOptions.gender.id}
          menuType='checkbox'
          options={filterOptions.gender.options}
          selectedOptions={filterOptions.gender.selectedOptions}
          onButtonClick={() => filterClick(filterOptions.gender.id)}
          onValueClear={() =>
            filterOptions.clearOptions(filterOptions.gender.id)
          }
          onInputClick={(val) =>
            filterOptions.toggleOption(filterOptions.gender.id, val)
          }
        />
      </div>

      <div ref={sizeRef}>
        <FilterButton
          type='dropdown'
          text='Size'
          active={activeFilterId === 'Size'}
          menuType='checkbox'
          options={['12', '13', '14', '15']}
          selectedOptions={selectedSizes}
          onButtonClick={() => filterClick('Size')}
          onValueClear={() => setSelectedSizes([])}
          onInputClick={(val) => console.log(val)}
        />
      </div>

      <div ref={categoryRef}>
        <FilterButton
          type='dropdown'
          text='Category'
          active={activeFilterId === 'Category'}
          menuType='checkbox'
          options={['hoodies', 'shirts', 'jeans', 'shorts']}
          selectedOptions={selectedCategories}
          onButtonClick={() => filterClick('Category')}
          onValueClear={() => setSelectedCategories([])}
          onInputClick={(val) => console.log(val)}
        />
      </div>

      <div ref={brandRef}>
        <FilterButton
          type='dropdown'
          text='Brand'
          active={activeFilterId === 'Brand'}
          menuType='checkbox'
          options={['Cool shirts', 'Gucci', 'Nike']}
          selectedOptions={selectedBrands}
          onButtonClick={() => filterClick('Brand')}
          onValueClear={() => setSelectedBrands([])}
          onInputClick={(val) => console.log(val)}
        />
      </div>

      <div ref={priceRef}>
        <FilterButton
          type='dropdown'
          text='Price'
          active={activeFilterId === 'Price'}
          menuType='checkbox'
          options={['Max $10', 'Max $20', 'Max $30']}
          selectedOptions={selectedPrices}
          onButtonClick={() => filterClick('Price')}
          onValueClear={() => setSelectedPrices([])}
          onInputClick={(val) => console.log(val)}
        />
      </div>

      <FilterButton
        type='boolean'
        active={onSale}
        text={'On Sale'}
        onButtonClick={() => setOnSale(true)}
        onValueClear={() => setOnSale(false)}
      />

      <FilterButton
        type='action'
        text='Clear Filters'
        onButtonClick={clearFilters}
      />

      <SortButtonContainer ref={sortRef}>
        <FilterButton
          type='dropdown'
          text='Sort'
          active={activeFilterId === 'Sort'}
          menuType='radio'
          options={['Popular', 'Newest', 'Oldest']}
          selectedOptions={selectedSort}
          onButtonClick={() => filterClick('Sort')}
          onValueClear={() => setSelectedSort('')}
          onInputClick={(val) => setSelectedSort(val)}
        />
      </SortButtonContainer>
    </FilterBar>
  );
};
export const WithFilterButtons = WithFilterButtonsTemplate.bind({});

const Template: Story<FilterBarProps> = (args) => <FilterBar {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
