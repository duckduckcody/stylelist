import { Meta, Story } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { FilterButton, FilterButtonProps } from './filterButton';

export default {
  title: 'atoms/Filter Button',
  component: FilterButton,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/hxHc7LA2ArHhuHhm5lV3s0/stylelist?node-id=404%3A293',
    },
  },
} as Meta;

const Template: Story<FilterButtonProps> = (args) => <FilterButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'Gender',
};

export const Active = Template.bind({});
Active.args = {
  text: 'Gender',
  active: true,
};

export const HasValues = Template.bind({});
HasValues.args = {
  text: 'Gender',
  values: ['Men', 'Womens'],
};
