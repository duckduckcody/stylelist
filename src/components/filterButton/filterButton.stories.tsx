import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import { FacetFilterButton } from './facet-filter-button';
import { FilterButtonActionProps } from './filterButtonAction/filterButtonAction';
import { FilterButtonBooleanProps } from './filterButtonBoolean/filterButtonBoolean';
import { FilterButtonDropdownProps } from './filterButtonDropdown/filterButtonDropdown';

export default {
  title: 'molecules/FilterButton',
  component: FacetFilterButton,
} as Meta;

const BooleanTemplate: Story<FilterButtonBooleanProps> = (args) => {
  const [active, setActive] = useState(false);

  return (
    <FacetFilterButton
      text='ON SALE'
      type='boolean'
      active={active}
      onButtonClick={() => setActive(true)}
      onValueClear={() => setActive(false)}
    />
  );
};
export const Boolean = BooleanTemplate.bind({});

const ActionTemplate: Story<FilterButtonActionProps> = (args) => (
  <FacetFilterButton
    text='CLEAR FILTERS'
    type='action'
    onButtonClick={() => console.log('action button clicked')}
  />
);
export const Action = ActionTemplate.bind({});

const DropdownTemplate: Story<FilterButtonDropdownProps> = (args) => {
  const [active, setActive] = useState(false);
  const [values, setValues] = useState<string[]>([]);

  const onInputClick = (val: string) => {
    if (values.includes(val)) {
      setValues((values) => values.filter((v) => v !== val));
    } else {
      setValues((values) => values.concat(val));
    }
  };

  return (
    <FacetFilterButton
      type='dropdown'
      text='gender'
      menuType='checkbox'
      selectedOptions={values}
      options={[
        { label: 'mens', value: 'mens' },
        { label: 'womens', value: 'womens' },
      ]}
      active={active}
      onButtonClick={() => setActive((prev) => !prev)}
      onValueClear={() => setValues([])}
      onInputClick={(val) => onInputClick(val)}
    />
  );
};
export const Dropdown = DropdownTemplate.bind({});
