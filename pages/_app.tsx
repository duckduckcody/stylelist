import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { FilterButton } from '../src/components/filterButton/filterButton';
import { useStore } from '../src/store/useStore';
import {
  GlobalStyles,
  MOBILE_BREAKPOINT,
  ZIndexes,
} from '../src/styles/global';

const PageContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 0 24px 0 24px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 0;
  } ;
`;

export const titleBarHeight = '50px';

const TitleBar = styled.div`
  position: sticky;
  z-index: ${ZIndexes.menu};
  top: 0;
  height: ${titleBarHeight};

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  background: white;
`;

const TitleTextContainer = styled.div`
  display: flex;
  flex-flow: row;
  gap: 24px;
  align-items: center;
`;

const Title = styled.a`
  all: unset;
  font-size: 1.75rem;
  font-weight: bold;
  font-family: 'Lato', sans-serif;

  cursor: pointer;
`;

const TitleLink = styled.a<{ active?: boolean }>`
  all: unset;
  font-size: 1rem;
  font-weight: normal;
  font-family: 'Lato', sans-serif;

  cursor: pointer;

  text-decoration: ${(p) => (p.active ? 'underline' : '')};
  &:hover {
    text-decoration: underline;
  }
`;

const SortContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 24px;
`;

const SearchBox = styled.input`
  all: unset;
  border: 1px solid black;
  font-family: 'Lato', sans-serif;
  padding: 0 8px;
`;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const sort = useStore((state) => state.filters.sort);
  const textSearch = useStore((state) => state.filters.textSearch);
  const handleTextSearchChange = useStore(
    (state) => state.filters.handleTextSearchChange
  );

  return (
    <PageContainer>
      <GlobalStyles />

      <TitleBar>
        <TitleTextContainer>
          <Link href='/'>
            <Title>STYLELIST</Title>
          </Link>
          <Link href='/favourites'>
            <TitleLink active={router.pathname === '/favourites'}>
              Favourites
            </TitleLink>
          </Link>
        </TitleTextContainer>

        {router.pathname === '/' && (
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
        )}
      </TitleBar>

      <Component {...pageProps} />
    </PageContainer>
  );
}

export default MyApp;
