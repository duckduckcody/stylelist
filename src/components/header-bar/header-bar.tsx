import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styled from 'styled-components';
import { useStore } from '../../store/useStore';
import { MOBILE_BREAKPOINT, ZIndexes } from '../../styles/global';
import { FilterBar } from '../filter-bar/filter-bar';
import { FilterButton } from '../filterButton/filterButton';

const Container = styled.div`
  top: 0;
  position: sticky;
  z-index: ${ZIndexes.menu};

  display: flex;
  flex-flow: column nowrap;
  gap: 8px;

  background: white;

  padding: 8px 24px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 0;
  } ;
`;

const TitleBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 8px 8px 0 8px;
  } ;
`;

const TitleTextContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 24px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: none;
  } ;
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
  text-decoration: ${(p) => (p.active ? 'underline' : '')};

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SortContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 16px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  } ;
`;

const SearchBox = styled.input`
  all: unset;
  border: 1px solid black;
  font-family: 'Lato', sans-serif;
  padding: 0 8px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  } ;
`;

const FilterBarContainer = styled.div``;

const StyledFilterBar = styled(FilterBar)``;

export interface HeaderBarProps {}

export const HeaderBar: FC<HeaderBarProps> = () => {
  const router = useRouter();

  const sort = useStore((state) => state.filters.sort);
  const textSearch = useStore((state) => state.filters.textSearch);
  const handleTextSearchChange = useStore(
    (state) => state.filters.handleTextSearchChange
  );

  return (
    <Container>
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

      <FilterBarContainer>
        <StyledFilterBar />
      </FilterBarContainer>
    </Container>
  );
};
