import { FC } from 'react';
import styled from 'styled-components';
import { Clothe } from '../../types/Clothe';
import { Card } from '../card/card';

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  column-gap: 28px;
  row-gap: 18px;
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
