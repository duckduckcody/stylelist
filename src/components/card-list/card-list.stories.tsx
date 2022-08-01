import { Meta, Story } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { mockClothe } from '../../mocks/mockClothe';
import { CardList, CardListProps } from './card-list';

export default {
  title: 'atoms/Card List',
  component: CardList,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/hxHc7LA2ArHhuHhm5lV3s0/stylelist?node-id=350%3A194',
    },
  },
} as Meta;

const Template: Story<CardListProps> = (args) => <CardList {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  clothes: [mockClothe, mockClothe, mockClothe, mockClothe],
};
