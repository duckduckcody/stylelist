import {
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react-dom-interactions';
import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import { CardList } from '../src/components/card-list/card-list';
import { ClotheDetails } from '../src/components/clothe-details/clothe-details';
import { FilterButton } from '../src/components/filter-button/filter-button';
import { HeaderBar } from '../src/components/header-bar/header-bar';
import { useClothesData } from '../src/hooks/useClotheData';
import { useFacets } from '../src/hooks/useFacets';
import { useLockBodyScroll } from '../src/hooks/useLockBodyScroll';
import { useSelectedFiltersQueryString } from '../src/hooks/useSelectedFiltersQueryString';
import { useStore } from '../src/store/useStore';
import { MOBILE_BREAKPOINT, ZIndexes } from '../src/styles/global';
import { Clothe } from '../src/types/Clothe';

const PageContainer = styled.div`
  padding: 0 24px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 0 8px;
  } ;
`;

const DrawerBackground = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${ZIndexes.modalBackground};
`;

const Drawer = styled(motion.div)`
  background: white;
  margin: 100px 0 0 0;
  overflow: hidden;
  padding: 0 20px 0;
  border-radius: 20px 20px 0 0;
  position: fixed;
  bottom: 0;
  height: 90vh;
  width: 100%;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 0;
  } ;
`;

const StatusText = styled.p`
  text-align: center;
`;

const LoadMoreButton = styled(FilterButton)`
  width: 333px;
  display: block;

  margin: 24px auto 64px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  } ;
`;

const Home: NextPage<{ clothes: {}[] | undefined }> = () => {
  const [selectedClothe, setSelectedClothe] = useState<Clothe | undefined>();

  const favourites = useStore((state) => state.favourites.favourites);
  const addFavourite = useStore((state) => state.favourites.addFavourite);
  const removeFavourite = useStore((state) => state.favourites.removeFavourite);

  const textSearch = useStore((state) => state.filters.textSearch);
  const selectedSort = useStore((state) => state.filters.sort.selected);
  const selectedFiltersQueryString = useSelectedFiltersQueryString();

  const { clothes, facets, nextPage, isLoading, isError } = useClothesData(
    textSearch,
    selectedSort,
    selectedFiltersQueryString
  );

  useFacets(facets);

  useLockBodyScroll(Boolean(selectedClothe));

  const onCardClick = (clothe: Clothe) => {
    setSelectedClothe(clothe);
  };

  const { context } = useFloating({
    open: Boolean(selectedClothe),
    onOpenChange: (open) => !open && setSelectedClothe(undefined),
    strategy: 'fixed',
  });

  const { getFloatingProps } = useInteractions([useDismiss(context)]);

  return (
    <>
      <Head>
        <title>Stylelist</title>
      </Head>

      <HeaderBar />

      <PageContainer>
        {isLoading && <StatusText>Loading...</StatusText>}
        {isError && <StatusText>!!!ERROR!!!</StatusText>}

        {(clothes.length === 0 || !clothes) && !isLoading && (
          <StatusText>NO RESULTS</StatusText>
        )}

        {clothes.length > 0 && (
          <>
            <CardList
              clothes={clothes}
              favourites={favourites}
              addFavourite={addFavourite}
              removeFavourite={removeFavourite}
              onCardClick={onCardClick}
            />
            <LoadMoreButton onClick={nextPage}>LOAD MORE</LoadMoreButton>
          </>
        )}
      </PageContainer>

      {selectedClothe && (
        <DrawerBackground>
          <Drawer
            {...getFloatingProps()}
            initial={{ transform: 'translateY(100%)' }}
            animate={{ transform: 'translateY(0%)' }}
            exit={{ transform: 'translateY(100%)' }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
          >
            <ClotheDetails
              clothe={selectedClothe}
              onCloseClick={() => setSelectedClothe(undefined)}
            />
          </Drawer>
        </DrawerBackground>
      )}
    </>
  );
};

export default Home;
