import { Meta, Story } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import {
  FilterButtonBoolean,
  FilterButtonBooleanProps,
} from './filterButtonBoolean';

export default {
  title: 'atoms/Filter Button Boolean',
  component: FilterButtonBoolean,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/hxHc7LA2ArHhuHhm5lV3s0/stylelist?node-id=402%3A268',
    },
  },
} as Meta;

const Template: Story<FilterButtonBooleanProps> = (args) => (
  <FilterButtonBoolean {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  active: false,
  text: 'On Sale',
};

export const Active = Template.bind({});
Active.args = {
  active: true,
  text: 'On Sale',
};
