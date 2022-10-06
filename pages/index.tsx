import type { NextPage } from 'next';
import { useState } from 'react';
import styled from 'styled-components';
import { CardList } from '../src/components/card-list/card-list';
import { FilterBar } from '../src/components/filter-bar/filter-bar';
import { useClothesData } from '../src/hooks/getClothes';
import { typeSenseClient } from '../src/lib/typeSenseClient';
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

const TitleBar = styled.div`
  text-align: center;
  padding: 12px 0 0 0;
`;

const Title = styled.h1`
  all: unset;
  font-size: 1.75rem;
  font-weight: bold;
  font-family: 'Lato', sans-serif;
`;

const StyledFilterBar = styled(FilterBar)`
  position: sticky;
  z-index: ${ZIndexes.menu};
  top: 0;
  padding: 24px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 0;
  } ;
`;

export async function getServerSideProps() {
  const typeSenseSearch = await typeSenseClient
    .collections('products')
    .documents()
    .search({ q: '', query_by: 'name' }, {});

  const clothes = typeSenseSearch.hits?.map((hit) => hit.document);

  return {
    props: {
      clothes,
    },
  };
}

const Home: NextPage<{ clothes: {}[] | undefined }> = ({ clothes }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useClothesData(page, clothes);
  console.log('data', data);

  return (
    <PageContainer>
      <TitleBar>
        <Title>STYLELIST</Title>
      </TitleBar>

      <StyledFilterBar />

      {/* @ts-ignore */}
      {clothes && clothes.length && <CardList clothes={clothes} />}

      {/* @ts-ignore */}
      {(!clothes || !clothes.length) && <p>NO RESULTS</p>}
    </PageContainer>
  );
};

export default Home;
