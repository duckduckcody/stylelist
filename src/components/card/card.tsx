import { FC } from 'react';
import styled from 'styled-components';
import Heart from '../../icons/heart.svg';
import { Clothe } from '../../types/Clothe';

const Container = styled.div``;

const ImageContainer = styled.div`
  height: 600px;
  width: 400px;
  position: relative;
`;

const Image = styled.img`
  height: inherit;
  width: inherit;
  object-fit: cover;
`;

const HeartContainer = styled.button`
  all: unset;

  cursor: pointer;
  height: 48px;
  width: 48px;
  background: white;
  border-radius: 50%;
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeartIcon = styled(Heart)`
  width: 24px;
  height: 24px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 12px;
  margin: 12px 0;

  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  line-height: 1.1875rem;
  font-weight: normal;
`;

const Name = styled.h3`
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 12px;
`;

const Price = styled.span``;
const OldPrice = styled.span``;

export interface CardProps {
  clothe: Clothe;
}

export const Card: FC<CardProps> = ({ clothe }) => (
  <Container>
    <ImageContainer>
      <Image src={clothe.image} alt='put clothe title here please' />
      <HeartContainer>
        <HeartIcon />
      </HeartContainer>
    </ImageContainer>
    <TextContainer>
      <Name>{clothe.name}</Name>
      <PriceContainer>
        <Price>${clothe.price}</Price>
        <OldPrice> ${clothe.oldPrice}</OldPrice>
      </PriceContainer>
    </TextContainer>
  </Container>
);
