import { Meta, Story } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
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
  clothe: {
    name: 'Snoh White Knit Tank',
    price: 100,
    link: 'https://google.com',
    image:
      'https://cdn.shopify.com/s/files/1/0217/9066/products/SnohWhiteKnitTank--1_1500x.progressive.jpg?v=1655759593',
  },
};

export const SquarePicture = Template.bind({});
SquarePicture.args = {
  clothe: {
    name: 'Snoh White Knit Tank',
    price: 100,
    link: 'https://google.com',
    image:
      'https://phlearn.com/wp-content/uploads/2019/03/dhruv-deshmukh-266273-unsplash-square.jpg',
  },
};

export const Discounted = Template.bind({});
Discounted.args = {
  clothe: {
    name: 'Snoh White Knit Tank',
    price: 100,
    oldPrice: 120,
    link: 'https://google.com',
    image:
      'https://cdn.shopify.com/s/files/1/0217/9066/products/SnohWhiteKnitTank--1_1500x.progressive.jpg?v=1655759593',
  },
};

export const isFavourited = Template.bind({});
isFavourited.args = {
  clothe: {
    name: 'Snoh White Knit Tank',
    price: 100,
    oldPrice: 120,
    link: 'https://google.com',
    image:
      'https://cdn.shopify.com/s/files/1/0217/9066/products/SnohWhiteKnitTank--1_1500x.progressive.jpg?v=1655759593',
  },
  isFavourited: true,
};
