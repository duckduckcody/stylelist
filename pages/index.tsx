import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { CardList } from '../src/components/card-list/card-list';
import { FilterBar } from '../src/components/filter-bar/filter-bar';
import { FilterButtonContainer } from '../src/components/filterButton/filterButton.shared';
import { useClothesData } from '../src/hooks/useClotheData';
import { useFacets } from '../src/hooks/useFacets';
import { useSelectedFilters } from '../src/hooks/useSelectedFilters';
import { useStore } from '../src/store/useStore';
import { MOBILE_BREAKPOINT, ZIndexes } from '../src/styles/global';

const FilterBarContainer = styled.div`
  position: sticky;
  z-index: ${ZIndexes.menu};
  top: 42px;

  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
  padding: 12px 0;

  background: white;
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
          />
          <LoadMoreButton onClick={nextPage}>LOAD MORE</LoadMoreButton>
        </>
      )}
    </>
  );
};

export default Home;
