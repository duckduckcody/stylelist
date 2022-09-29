import { Meta, Story } from '@storybook/react';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { withDesign } from 'storybook-addon-designs';
import styled from 'styled-components';
import { useOnClickOutside } from 'usehooks-ts';
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

  const [activeFilterId, setActiveFilterId] = useState('');
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [onSale, setOnSale] = useState(false);
  const [selectedSort, setSelectedSort] = useState('');

  const filterClick = (id: string) => {
    if (activeFilterId === id) {
      setActiveFilterId('');
    } else {
      setActiveFilterId(id);
    }
  };

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
      setActiveFilterId('');
    }
  };

  const clearFilters = () => {
    setSelectedGenders([]);
    setSelectedSizes([]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPrices([]);
    setOnSale(false);
  };

  useOnClickOutside(genderRef, () => closeDropdownIfActive('Gender'));
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
          active={activeFilterId === 'Gender'}
          menuType='checkbox'
          options={['mens', 'womens']}
          selectedOptions={selectedGenders}
          onButtonClick={() => filterClick('Gender')}
          onValueClear={() => setSelectedGenders([])}
          onInputClick={(val) => onCheckboxClick(val, setSelectedGenders)}
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
          onInputClick={(val) => onCheckboxClick(val, setSelectedSizes)}
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
          onInputClick={(val) => onCheckboxClick(val, setSelectedCategories)}
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
          onInputClick={(val) => onCheckboxClick(val, setSelectedBrands)}
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
          onInputClick={(val) => onCheckboxClick(val, setSelectedPrices)}
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

    // cursor: pointer on with value dropdown
  );
};
export const WithFilterButtons = WithFilterButtonsTemplate.bind({});

const Template: Story<FilterBarProps> = (args) => <FilterBar {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
