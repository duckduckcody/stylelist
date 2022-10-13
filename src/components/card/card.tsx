import { FC, useMemo, useState } from 'react';
import { Clothe } from '../../types/Clothe';
import {
  Container,
  HeartContainer,
  HeartIcon,
  HeartSolidIcon,
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
  isFavourited?: boolean;
  addFavourite?: (clothe: Clothe) => void;
  removeFavourite?: (clothe: Clothe) => void;
}

export const Card: FC<CardProps> = ({
  clothe,
  isFavourited = false,
  addFavourite = () => undefined,
  removeFavourite = () => undefined,
}) => {
  const percentageOff = useMemo(
    () =>
      clothe.oldPrice
        ? Math.trunc(((clothe.oldPrice - clothe.price) / clothe.oldPrice) * 100)
        : undefined,
    [clothe.oldPrice, clothe.price]
  );

  // don't show stamp animation on mount, only when interacting;
  const [hasInteracted, setHasInteracted] = useState(false);
  const favouriteClick = () => {
    setHasInteracted(true);

    if (isFavourited) {
      removeFavourite(clothe);
    } else {
      addFavourite(clothe);
    }
  };

  return (
    <Container>
      <ImageContainer>
        <ImageLink
          href={clothe.link}
          target='_blank'
          aria-label={`link to ${clothe.name} product page`}
        >
          <Image
            src={clothe.images[0]}
            width={400}
            height={600}
            alt={clothe.name}
          />
        </ImageLink>

        {percentageOff && (
          <PercentageOffContainer>
            <PercentageOff>{percentageOff}% off</PercentageOff>
          </PercentageOffContainer>
        )}

        <HeartContainer
          aria-label={`favourite ${clothe.name}`}
          onClick={favouriteClick}
        >
          {isFavourited && <HeartSolidIcon />}
          {!isFavourited && <HeartIcon />}
        </HeartContainer>

        {isFavourited && hasInteracted && <HeartStamp />}
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
