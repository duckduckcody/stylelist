import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import { withDesign } from 'storybook-addon-designs';
import { mockClothe } from '../../mocks/mockClothe';
import { Card, CardProps } from './card';

export default {
  title: 'atoms/Card',
  component: Card,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/hxHc7LA2ArHhuHhm5lV3s0/stylelist?node-id=301%3A72',
    },
  },
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  clothe: mockClothe(),
};

export const SquarePicture = Template.bind({});
SquarePicture.args = {
  clothe: mockClothe(),
};

export const Discounted = Template.bind({});
Discounted.args = {
  clothe: mockClothe(),
};

export const IsFavourited = Template.bind({});
IsFavourited.args = {
  clothe: mockClothe(),
  isFavourited: true,
};

const FavouriteInteractionTemplate: Story<CardProps> = (args) => {
  const [isFavourited, setIsFavourited] = useState(false);

  return (
    <Card
      {...args}
      isFavourited={isFavourited}
      addFavourite={() => setIsFavourited(true)}
      removeFavourite={() => setIsFavourited(false)}
    />
  );
};

export const FavouriteInteraction = FavouriteInteractionTemplate.bind({});
FavouriteInteraction.args = {
  clothe: mockClothe(),
};
