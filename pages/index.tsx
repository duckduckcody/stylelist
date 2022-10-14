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
import { FilterBar } from '../src/components/filter-bar/filter-bar';
import { FilterButtonContainer } from '../src/components/filterButton/filterButton.shared';
import { useClothesData } from '../src/hooks/useClotheData';
import { useFacets } from '../src/hooks/useFacets';
import { useSelectedFilters } from '../src/hooks/useSelectedFilters';
import { useStore } from '../src/store/useStore';
import { MOBILE_BREAKPOINT, ZIndexes } from '../src/styles/global';
import { Clothe } from '../src/types/Clothe';
import { titleBarHeight } from './_app';

const FilterBarContainer = styled.div`
  position: sticky;
  z-index: ${ZIndexes.menu};
  top: ${titleBarHeight};

  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
  padding: 12px 0;

  background: white;
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
  padding: 20px;
  border-radius: 20px 20px 0 0;
  position: fixed;
  bottom: 0;
  height: 90vh;
`;

const StatusText = styled.p`
  text-align: center;
`;

const LoadMoreButton = styled(FilterButtonContainer)`
  width: 333px;
  display: block;

  margin: 24px auto 64px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  } ;
`;

const Home: NextPage<{ clothes: {}[] | undefined }> = () => {
  const favourites = useStore((state) => state.favourites.favourites);
  const addFavourite = useStore((state) => state.favourites.addFavourite);
  const removeFavourite = useStore((state) => state.favourites.removeFavourite);

  const sort = useStore((state) => state.filters.sort);
  const textSearch = useStore((state) => state.filters.textSearch);

  const selectedFilters = useSelectedFilters();
  const { clothes, facets, nextPage, isLoading, isError } = useClothesData(
    textSearch,
    sort.selected,
    selectedFilters
  );

  useFacets(facets);

  const [selectedClothe, setSelectedClothe] = useState<Clothe | undefined>();

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

      <FilterBarContainer>
        <FilterBar />
      </FilterBarContainer>

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
