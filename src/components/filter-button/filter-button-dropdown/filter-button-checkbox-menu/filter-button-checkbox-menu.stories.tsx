import { Meta, Story } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import {
  FilterButtonCheckboxMenu,
  FilterButtonCheckboxMenuProps,
} from './filter-button-checkbox-menu';

export default {
  title: 'atoms/Filter Button Checkbox Menu',
  component: FilterButtonCheckboxMenu,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/hxHc7LA2ArHhuHhm5lV3s0/stylelist?node-id=405%3A351',
    },
  },
} as Meta;

const Template: Story<FilterButtonCheckboxMenuProps> = (args) => (
  <FilterButtonCheckboxMenu {...args} />
);

export const CheckBox = Template.bind({});
CheckBox.args = {
  options: ['Mens', 'Womens'],
  selectedOptions: ['Womens'],
};
