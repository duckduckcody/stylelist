import type { NextPage } from 'next';
import { CardList } from '../src/components/card-list/card-list';
import { mockClothe } from '../src/mocks/mockClothe';

const Home: NextPage = () => {
  return <CardList clothes={[mockClothe, mockClothe, mockClothe]} />;
};

export default Home;
