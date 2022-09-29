import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import { withDesign } from 'storybook-addon-designs';
import { FilterButton } from '../filterButton/filterButton';
import { FilterBar, FilterBarProps } from './filter-bar';

export default {
  title: 'molecules/Filter Bar',
  component: FilterBar,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/hxHc7LA2ArHhuHhm5lV3s0/stylelist?node-id=316%3A225',
    },
  },
} as Meta;

const WithFilterButtonsTemplate: Story<FilterBarProps> = (args) => {
  const [activeFilterId, setActiveFilterId] = useState('');
  const [selectedGenderOptions, setSelectedGenderOptions] = useState<string[]>(
    []
  );

  const filterClick = (id: string) => {
    if (activeFilterId === id) {
      setActiveFilterId('');
    } else {
      setActiveFilterId(id);
    }
  };

  const onInputClick = (val: string) => {
    if (selectedGenderOptions.includes(val)) {
      setSelectedGenderOptions((g) => g.filter((g) => g !== val));
    } else {
      setSelectedGenderOptions((g) => g.concat(val));
    }
  };

  return (
    <FilterBar>
      <FilterButton
        type='dropdown'
        text='Gender'
        active={activeFilterId === 'Gender'}
        menuType='checkbox'
        options={[
          { label: 'mens', value: 'mens' },
          { label: 'womens', value: 'womens' },
        ]}
        selectedOptions={selectedGenderOptions}
        onButtonClick={() => filterClick('Gender')}
        onValueClear={() => setSelectedGenderOptions([])}
        onInputClick={(val) => onInputClick(val)}
      />

      <FilterButton
        type='action'
        text='Clear Filters'
        onButtonClick={() => console.log('something')}
      />
    </FilterBar>
  );
};
export const WithFilterButtons = WithFilterButtonsTemplate.bind({});

const Template: Story<FilterBarProps> = (args) => <FilterBar {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
