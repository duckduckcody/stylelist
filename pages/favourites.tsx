import type { NextPage } from 'next';
import { CardList } from '../src/components/card-list/card-list';
import { useStore } from '../src/store/useStore';

const Favourites: NextPage = () => {
  const favourites = useStore((state) => state.favourites.favourites);
  const removeFavourite = useStore((state) => state.favourites.removeFavourite);

  return (
    <>
      {favourites && favourites.length > 0 && (
        <CardList
          clothes={favourites}
          favourites={favourites}
          removeFavourite={removeFavourite}
        />
      )}
      {(!favourites || favourites.length === 0) && (
        <p>You have no favourites</p>
      )}
    </>
  );
};

export default Favourites;
