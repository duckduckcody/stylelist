import {
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react-dom-interactions';
import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';
import { CardList } from '../src/components/card-list/card-list';
import { ClotheDetails } from '../src/components/clothe-details/clothe-details';
import { FilterButton } from '../src/components/filter-button/filter-button';
import { Head } from '../src/components/head/head';
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

const LoadMoreButton = styled(FilterButton)`
  width: 333px;
  display: block;

  margin: 24px auto 64px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const InfoText = styled.p`
  font-size: 0.9rem;
  text-align: center;
  font-family: 'Lato', sans-serif;
`;

const BottomTextContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0 0 24px;
`;

const ScrollToTopButton = styled.button`
  all: unset;

  font-size: 0.9rem;
  text-align: center;
  font-family: 'Lato', sans-serif;
  text-decoration: underline;

  cursor: pointer;
`;

const Home: NextPage<{ clothes: {}[] | undefined }> = () => {
  const [selectedClothe, setSelectedClothe] = useState<Clothe | undefined>();

  const favourites = useStore((state) => state.favourites.favourites);
  const addFavourite = useStore((state) => state.favourites.addFavourite);
  const removeFavourite = useStore((state) => state.favourites.removeFavourite);

  const textSearch = useStore((state) => state.filters.textSearch);
  const selectedSort = useStore((state) => state.filters.sort.selected);
  const selectedFiltersQueryString = useSelectedFiltersQueryString();

  const {
    clothes,
    facets,
    nextPage,
    isLoadingMore,
    isError,
    numberOfClothes,
    isLastPage,
  } = useClothesData(textSearch, selectedSort, selectedFiltersQueryString);

  useFacets(facets);

  useLockBodyScroll(Boolean(selectedClothe));

  const { context } = useFloating({
    open: Boolean(selectedClothe),
    onOpenChange: (open) => !open && setSelectedClothe(undefined),
    strategy: 'fixed',
  });

  const { getFloatingProps } = useInteractions([useDismiss(context)]);

  const onCardClick = (clothe: Clothe) => {
    setSelectedClothe(clothe);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Head title='Stylelist' />

      <HeaderBar />

      <PageContainer>
        {isLoadingMore && <InfoText>Loading...</InfoText>}
        {isError && <InfoText>!!!ERROR!!!</InfoText>}

        {(clothes.length === 0 || !clothes) && !isLoadingMore && (
          <InfoText>NO RESULTS</InfoText>
        )}

        {clothes.length > 0 && (
          <>
            <InfoText>{numberOfClothes} products found</InfoText>
            <CardList
              clothes={clothes}
              favourites={favourites}
              addFavourite={addFavourite}
              removeFavourite={removeFavourite}
              onCardClick={onCardClick}
            />
            {!isLastPage && (
              <LoadMoreButton onClick={nextPage} disabled={isLoadingMore}>
                {!isLoadingMore && 'Load More'}
                {isLoadingMore && 'Loading more...'}
              </LoadMoreButton>
            )}
            {isLastPage && (
              <BottomTextContainer>
                <InfoText>End of list</InfoText>
                <ScrollToTopButton onClick={scrollToTop}>
                  Scroll to top
                </ScrollToTopButton>
              </BottomTextContainer>
            )}
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
