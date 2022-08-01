import { FC } from 'react';
import styled from 'styled-components';
import { MOBILE_BREAKPOINT } from '../../styles/global';
import { Clothe } from '../../types/Clothe';
import { Card } from '../card/card';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  column-gap: 28px;
  row-gap: 18px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-template-columns: repeat(2, 1fr);
  } ;
`;

export interface CardListProps {
  clothes: Clothe[];
}

export const CardList: FC<CardListProps> = ({ clothes }) => (
  <Container>
    {clothes.map((clothe) => (
      <Card clothe={clothe} key={clothe.name} />
    ))}
  </Container>
);
