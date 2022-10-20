import { Meta, Story } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import {
  FilterButtonRangeInput,
  FilterButtonRangeInputProps,
} from './filter-button-range-input';

export default {
  title: 'atoms/Filter Button Range Input',
  component: FilterButtonRangeInput,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
} as Meta;

const Template: Story<FilterButtonRangeInputProps> = (args) => (
  <FilterButtonRangeInput {...args} />
);
export const Primary = Template.bind({});
Primary.args = {};
