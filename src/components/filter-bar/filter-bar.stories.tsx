import { Meta, Story } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
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

const Template: Story<FilterBarProps> = (args) => <FilterBar {...args} />;
export const Primary = Template.bind({});
Primary.args = {};
