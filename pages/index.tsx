import type { NextPage } from 'next';
import styled from 'styled-components';
import { CardList } from '../src/components/card-list/card-list';
import { FilterBar } from '../src/components/filter-bar/filter-bar';
import { mockClothe } from '../src/mocks/mockClothe';
import { MOBILE_BREAKPOINT, ZIndexes } from '../src/styles/global';

const PageContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 0 24px;

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
  padding: 24px 0;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 0;
  } ;
`;

const Home: NextPage = () => {
  return (
    <PageContainer>
      <TitleBar>
        <Title>STYLELIST</Title>
      </TitleBar>

      <StyledFilterBar />

      <CardList
        clothes={[
          mockClothe,
          mockClothe,
          mockClothe,
          mockClothe,
          mockClothe,
          mockClothe,
          mockClothe,
          mockClothe,
          mockClothe,
          mockClothe,
          mockClothe,
          mockClothe,
          mockClothe,
          mockClothe,
          mockClothe,
        ]}
      />
    </PageContainer>
  );
};

export default Home;
