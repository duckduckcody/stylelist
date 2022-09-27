import { Meta, Story } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import {
  FilterButtonDropdownMenu,
  FilterButtonDropdownMenuProps,
} from './filterButtonDropdownMenu';

export default {
  title: 'atoms/Filter Button Dropdown Menu',
  component: FilterButtonDropdownMenu,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/hxHc7LA2ArHhuHhm5lV3s0/stylelist?node-id=405%3A351',
    },
  },
} as Meta;

const Template: Story<FilterButtonDropdownMenuProps> = (args) => (
  <FilterButtonDropdownMenu {...args} />
);

export const CheckBox = Template.bind({});
CheckBox.args = {
  options: [
    { label: 'Womens', value: 'Womens' },
    { label: 'Mens', value: 'Mens' },
  ],
  checkedOptions: ['Womens'],
  type: 'checkbox',
};

export const Radio = Template.bind({});
Radio.args = {
  options: [
    { label: 'Womens', value: 'Womens' },
    { label: 'Mens', value: 'Mens' },
  ],
  checkedOptions: ['Womens'],
  type: 'radio',
};
