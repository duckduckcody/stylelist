import type { NextPage } from 'next';
import { Card } from '../src/components/card/card';

const Home: NextPage = () => {
  return (
    <Card
      clothe={{
        name: 'Snoh White Knit Tank',
        price: 100,
        link: 'https://google.com',
        image:
          'https://cdn.shopify.com/s/files/1/0217/9066/products/SnohWhiteKnitTank--1_1500x.progressive.jpg?v=1655759593',
      }}
    />
  );
};

export default Home;
