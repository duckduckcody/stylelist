import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { CardList } from '../src/components/card-list/card-list';
import { FilterBar } from '../src/components/filter-bar/filter-bar';
import { FilterButton } from '../src/components/filterButton/filterButton';
import { useClothesData } from '../src/hooks/useClotheData';
import { useStore } from '../src/store/useStore';
import { MOBILE_BREAKPOINT, ZIndexes } from '../src/styles/global';

const PageContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 0 24px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 0;
  } ;
`;

const HeaderContainer = styled.div`
  position: sticky;
  z-index: ${ZIndexes.menu};
  top: 0;
  background: white;

  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
  padding: 12px 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
  } ;
`;

const TitleBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  all: unset;
  font-size: 1.75rem;
  font-weight: bold;
  font-family: 'Lato', sans-serif;
`;

const SortContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 32px;
`;

const SearchBox = styled.input`
  all: unset;
  border: 1px solid black;
  font-family: 'Lato', sans-serif;
  padding: 0 8px;
`;

const StatusText = styled.p`
  text-align: center;
`;

const Home: NextPage<{ clothes: {}[] | undefined }> = () => {
  const sort = useStore((state) => state.filters.sort);
  const textSearch = useStore((state) => state.filters.textSearch);
  const handleTextSearchChange = useStore(
    (state) => state.filters.handleTextSearchChange
  );

  const {
    clothes,
    currentPageNumber,
    nextPage,
    totalNumberOfPages,
    isLoading,
    isError,
  } = useClothesData(textSearch, sort.selected);

  return (
    <PageContainer>
      <Head>
        <title>Stylelist</title>
      </Head>

      <HeaderContainer>
        <TitleBar>
          <Title>STYLELIST</Title>

          <SortContainer>
            <SearchBox
              placeholder='search'
              type='text'
              value={textSearch}
              onChange={handleTextSearchChange}
            />
            <FilterButton
              type='dropdown'
              menuType='radio'
              text={sort.text}
              options={sort.options}
              selectedOptions={sort.selected}
              onValueClear={() => sort.setSelected('')}
              onInputClick={(val) => sort.setSelected(val)}
            />
          </SortContainer>
        </TitleBar>
        <FilterBar />
      </HeaderContainer>

      {isLoading && <StatusText>Loading...</StatusText>}
      {isError && <StatusText>!!!ERROR!!!</StatusText>}
      {(clothes.length === 0 || !clothes) && (
        <StatusText>NO RESULTS</StatusText>
      )}

      {clothes.length > 0 && (
        <>
          <CardList clothes={clothes} />
          <p>
            Page: {currentPageNumber} of {totalNumberOfPages}
          </p>
          <button onClick={nextPage}>LOAD MORE</button>
        </>
      )}
    </PageContainer>
  );
};

export default Home;
