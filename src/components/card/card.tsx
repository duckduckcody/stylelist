import { FC, useMemo } from 'react';
import styled from 'styled-components';
import Heart from '../../icons/heart.svg';
import { Clothe } from '../../types/Clothe';

const Container = styled.div`
  width: 400px;
`;

const ImageContainer = styled.div`
  all: unset;

  height: 600px;
  width: inherit;
  position: relative;
  cursor: pointer;
`;

const ImageLink = styled.a`
  all: unset;

  height: inherit;
  width: inherit;

  &:focus {
    border: 1px solid grey;
  }
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

  &:focus {
    border: 1px solid grey;
  }
`;

const HeartIcon = styled(Heart)`
  width: 24px;
  height: 24px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
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

const PercentageOffContainer = styled.div`
  position: absolute;
  left: 12px;
  bottom: 20px;

  background: white;
  padding: 6px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PercentageOff = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  line-height: 1.1875rem;
`;

const Price = styled.span``;

const OldPrice = styled.span`
  text-decoration: line-through;
`;

export interface CardProps {
  clothe: Clothe;
}

export const Card: FC<CardProps> = ({ clothe }) => {
  const percentageOff = useMemo(
    () =>
      clothe.oldPrice
        ? Math.trunc(((clothe.oldPrice - clothe.price) / clothe.oldPrice) * 100)
        : undefined,
    [clothe.oldPrice, clothe.price]
  );

  return (
    <Container>
      <ImageContainer>
        <ImageLink
          href={clothe.link}
          aria-label={`link to ${clothe.name} product page`}
        >
          <Image src={clothe.image} alt={clothe.name} />
        </ImageLink>
        {percentageOff && (
          <PercentageOffContainer>
            <PercentageOff>{percentageOff}% off</PercentageOff>
          </PercentageOffContainer>
        )}
        <HeartContainer aria-label={`favourite ${clothe.name}`}>
          <HeartIcon />
        </HeartContainer>
      </ImageContainer>
      <TextContainer>
        <Name>{clothe.name}</Name>
        <PriceContainer>
          <Price>${clothe.price}</Price>
          {clothe.oldPrice && <OldPrice> ${clothe.oldPrice}</OldPrice>}
        </PriceContainer>
      </TextContainer>
    </Container>
  );
};
