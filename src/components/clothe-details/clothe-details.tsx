import NextImage from 'next/image';
import { FC } from 'react';
import styled from 'styled-components';
import CrossIcon from '../../icons/cross.svg';
import { Clothe } from '../../types/Clothe';

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 400px 1fr;
  height: 100%;
  gap: 32px;
  position: relative;
`;

const ImagesContainer = styled.div`
  overflow-y: scroll;

  display: flex;
  flex-flow: column nowrap;
  direction: rtl;
`;

const ImageContainer = styled.div`
  width: 100%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;

  height: 100%;
  justify-content: center;

  font-size: 1rem;
  font-weight: normal;
  font-family: 'Lato', sans-serif;
`;

const Header = styled.h3`
  all: unset;
  font-size: 1.75rem;
  font-weight: bold;
`;

const Description = styled.p`
  all: unset;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 8px;
`;

const Price = styled.p`
  all: unset;
  font-size: 1.25rem;
`;

const OldPrice = styled(Price)`
  text-decoration: line-through;
`;

const Link = styled.a`
  all: unset;

  margin-top: 8px;

  cursor: pointer;
  text-decoration: underline;
`;

const CrossButton = styled.button`
  all: unset;

  position: absolute;
  right: 0;
  cursor: pointer;
`;

const Cross = styled(CrossIcon)`
  color: black;
`;

export interface ClotheDetailsProps {
  clothe: Clothe;
  onCloseClick?: VoidFunction;
}

export const ClotheDetails: FC<ClotheDetailsProps> = ({
  clothe,
  onCloseClick = () => undefined,
}) => {
  return (
    <Container>
      <CrossButton onClick={onCloseClick}>
        <Cross />
      </CrossButton>

      {/* get images to go big */}
      <ImagesContainer>
        {clothe.images.map((image) => (
          <ImageContainer key={image}>
            <NextImage src={image} alt={clothe.name} height={600} width={400} />
          </ImageContainer>
        ))}
      </ImagesContainer>

      <TextContainer>
        <Header>{clothe.name}</Header>
        <Description>{clothe.details}</Description>

        <PriceContainer>
          {clothe.oldPrice && <OldPrice>${clothe.price}</OldPrice>}
          <Price>${clothe.price}</Price>
        </PriceContainer>

        <Link href={clothe.link} target='_blank' rel='noreferrer'>
          Link to product
        </Link>
      </TextContainer>
    </Container>
  );
};
