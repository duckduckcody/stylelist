import { FC } from 'react';
import styled from 'styled-components';
import { MOBILE_BREAKPOINT } from '../../styles/global';
import { Clothe } from '../../types/Clothe';
import { Card } from '../card/card';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  justify-content: center;
  column-gap: 28px;
  row-gap: 18px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-template-columns: repeat(2, 1fr);
  } ;
`;

export interface CardListProps {
  clothes: Clothe[];
  favourites: Clothe[];
  addFavourite: (clothe: Clothe) => void;
  removeFavourite: (clothe: Clothe) => void;
}

export const CardList: FC<CardListProps> = ({
  clothes,
  favourites,
  addFavourite,
  removeFavourite,
}) => (
  <Container>
    {clothes.map((clothe) => (
      <Card
        clothe={clothe}
        key={clothe.link}
        isFavourited={favourites.some((fav) => fav.link === clothe.link)}
        addFavourite={addFavourite}
        removeFavourite={removeFavourite}
      />
    ))}
  </Container>
);
