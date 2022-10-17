import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styled from 'styled-components';
import { useStore } from '../../store/useStore';
import { MOBILE_BREAKPOINT, ZIndexes } from '../../styles/global';
import { FilterBar } from '../filter-bar/filter-bar';
import { FilterButton } from '../filterButton/filterButton';
import { SearchBox } from '../search-box/search-box';

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
    padding: 0 0 8px 0;
  } ;
`;

const TitleBar = styled.div`
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 1fr auto;
  grid-template-areas: 'title sort';
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 8px 8px 0 8px;
    grid-template-columns: 1fr;
    grid-template-rows: 100% 42px;
    grid-template-areas:
      'title'
      'sort';
    gap: 8px;
  } ;
`;

const TitleTextContainer = styled.div`
  grid-area: title;
  display: flex;
  flex-flow: row;
  align-items: center;
  gap: 24px;
`;

const Title = styled.a`
  all: unset;
  font-size: 1.75rem;
  font-weight: bold;
  font-family: 'Lato', sans-serif;

  cursor: pointer;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 1.3rem;
  } ;
`;

const TitleLink = styled.a<{ active?: boolean }>`
  all: unset;
  font-size: 0.9rem;
  font-weight: normal;
  font-family: 'Lato', sans-serif;
  text-decoration: ${(p) => (p.active ? 'underline' : '')};

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SortContainer = styled.div`
  grid-area: sort;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
`;

export const TitleHeaderBar: FC<{
  className?: string;
}> = ({ className }) => {
  const router = useRouter();

  return (
    <TitleTextContainer className={className}>
      <Link href='/'>
        <Title>STYLELIST</Title>
      </Link>
      <Link href='/favourites'>
        <TitleLink active={router.pathname === '/favourites'}>
          Favourites
        </TitleLink>
      </Link>
    </TitleTextContainer>
  );
};

export interface HeaderBarProps {}

export const HeaderBar: FC<HeaderBarProps> = () => {
  const sort = useStore((state) => state.filters.sort);
  const textSearch = useStore((state) => state.filters.textSearch);
  const handleTextSearchChange = useStore(
    (state) => state.filters.handleTextSearchChange
  );

  const checkboxes = useStore((state) => state.filters.checkboxes);
  const booleans = useStore((state) => state.filters.booleans);
  const clearFilters = useStore((state) => state.filters.clearFilters);

  return (
    <Container>
      <TitleBar>
        <TitleHeaderBar />

        <SortContainer>
          <SearchBox
            placeholder='search'
            value={textSearch}
            onChange={handleTextSearchChange}
            onClearClick={() => handleTextSearchChange('')}
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

      <FilterBar
        checkboxes={checkboxes}
        booleans={booleans}
        clearFilters={clearFilters}
      />
    </Container>
  );
};
