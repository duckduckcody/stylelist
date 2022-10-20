import { Meta, Story } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import {
  FilterButtonAction,
  FilterButtonActionProps,
} from './filterButtonAction';

export default {
  title: 'atoms/Filter Button Action',
  component: FilterButtonAction,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/hxHc7LA2ArHhuHhm5lV3s0/stylelist?node-id=404%3A290',
    },
  },
} as Meta;

const Template: Story<FilterButtonActionProps> = (args) => (
  <FilterButtonAction {...args} />
);
export const Primary = Template.bind({});
Primary.args = {
  text: 'Clear Filters',
};
