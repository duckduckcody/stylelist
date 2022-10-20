import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CardList } from '../src/components/card-list/card-list';
import { TitleHeaderBar } from '../src/components/header-bar/header-bar';
import { useStore } from '../src/store/useStore';
import { ZIndexes } from '../src/styles/global';
import { Clothe } from '../src/types/Clothe';

const PageContainer = styled.div`
  padding: 0 24px 8px 24px;
  position: relative;
`;

const StyledTitleHeaderBar = styled(TitleHeaderBar)`
  position: sticky;
  top: 0;
  background: white;
  z-index: ${ZIndexes.menu};
  padding: 8px 0;
`;

const Favourites: NextPage = () => {
  const [favourites, setFavourites] = useState<Clothe[] | undefined>(undefined);
  const favouriteStore = useStore((state) => state.favourites.favourites);
  const removeFavourite = useStore((state) => state.favourites.removeFavourite);

  // avoid hydration error by reading local storage after first mount
  useEffect(() => {
    setFavourites(favouriteStore);
  }, [favouriteStore]);

  return (
    <PageContainer>
      <StyledTitleHeaderBar />

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
    </PageContainer>
  );
};

export default Favourites;
