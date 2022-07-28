import { FC, useMemo } from 'react';
import { Clothe } from '../../types/Clothe';
import {
  Container,
  HeartContainer,
  HeartIcon,
  HeartStamp,
  Image,
  ImageContainer,
  ImageLink,
  Name,
  OldPrice,
  PercentageOff,
  PercentageOffContainer,
  Price,
  PriceContainer,
  TextContainer,
} from './card.styles';

export interface CardProps {
  clothe: Clothe;
  isFavourited: boolean;
}

export const Card: FC<CardProps> = ({ clothe, isFavourited }) => {
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

        {isFavourited && <HeartStamp />}
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
