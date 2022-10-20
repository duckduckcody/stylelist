import { Meta, Story } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import {
  FilterButtonRangeMenu,
  FilterButtonRangeMenuProps,
} from './filter-button-range-menu';

export default {
  title: 'atoms/Filter Button Range Menu',
  component: FilterButtonRangeMenu,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
} as Meta;

const Template: Story<FilterButtonRangeMenuProps> = (args) => (
  <FilterButtonRangeMenu {...args} />
);
export const Primary = Template.bind({});
Primary.args = {};
