import { FC, useState } from 'react';
import styled from 'styled-components';
import { useIsMobile } from '../../hooks/useIsMobile';
import CrossIcon from '../../icons/cross.svg';
import { MOBILE_BREAKPOINT } from '../../styles/global';
import { Clothe } from '../../types/Clothe';

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  display: grid;
  grid-template-columns: auto 350px;
  grid-template-rows: 100%;
  grid-template-areas: 'images info';
  justify-content: center;
  gap: 24px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(300px, 1fr) auto;
    grid-template-areas: 'images' 'info';
    gap: 12px;
  }
`;

const CloseIcon = styled(CrossIcon)`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    right: 10px;
    top: 10px;
  }
`;

const ImagesContainer = styled.div`
  grid-area: images;

  display: grid;
  grid-template-columns: 150px minmax(auto, 1000px);
  grid-template-areas: 'thumbnails image';
`;

const ThumbnailsContainer = styled.div`
  grid-area: thumbnails;

  display: flex;
  flex-flow: column nowrap;

  direction: rtl;
  overflow-y: auto;
`;

const ThumbnailImageContainer = styled.button<{
  selected?: boolean;
}>`
  all: unset;

  width: 150px;
  height: 150px;
  cursor: pointer;
  border: ${(p) => p.selected && `3px solid black`};
`;

const ThumbnailImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  object-fit: contain;
  object-position: left center;
  width: 100%;
  height: 100%;
`;

const MobileImages = styled.div`
  display: flex;
  grid-area: images;
  width: 100%;
  flex-flow: row nowrap;
  overflow-x: scroll;
`;

const MobileImage = styled.img`
  width: auto;
  height: 100%;
`;

const TextContainer = styled.div`
  grid-area: info;
  display: grid;
  align-content: center;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, min-content);
  grid-template-areas:
    'brand'
    'name'
    'price'
    'link'
    'description';
  gap: 8px;

  font-family: 'Lato', sans-serif;
  font-size: 1rem;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    align-content: start;
    gap: 4px;
    overflow: scroll;
    padding: 0 8px 8px 8px;
  }
`;

const Price = styled.div`
  grid-area: price;
  font-size: 1.5rem;
  font-weight: bold;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 1.3rem;
  }
`;

const Brand = styled.div`
  grid-area: brand;
  font-size: 0.9rem;
`;

const Name = styled.div`
  grid-area: name;
  font-size: 1.5rem;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    font-size: 1.3rem;
  }
`;

const Description = styled.div`
  grid-area: description;
  line-height: 1.5rem;
`;

const WebsiteLink = styled.a`
  grid-area: link;
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
  const isMobile = useIsMobile();
  const [selectedImage, setSelectedImage] = useState(clothe.images[0]);

  return (
    <Container>
      <CloseIcon onClick={onCloseClick} />

      {!isMobile && (
        <ImagesContainer>
          <ThumbnailsContainer>
            {clothe.images.map((img) => (
              <ThumbnailImageContainer
                key={img}
                selected={selectedImage === img}
                onClick={() => setSelectedImage(img)}
              >
                <ThumbnailImage src={img} alt={clothe.name} />
              </ThumbnailImageContainer>
            ))}
          </ThumbnailsContainer>

          <Image src={selectedImage} alt={clothe.name} />
        </ImagesContainer>
      )}

      {isMobile && (
        <MobileImages>
          {clothe.images.map((img) => (
            <MobileImage src={img} alt={clothe.name} key={img} />
          ))}
        </MobileImages>
      )}

      <TextContainer>
        <Brand>{clothe.brand}</Brand>
        <Name>{clothe.name}</Name>
        <Price>${clothe.price}</Price>
        <Description>{clothe.details}</Description>

        <WebsiteLink href={clothe.link} target='_blank' rel='noreferrer'>
          View product at {clothe.website}
        </WebsiteLink>
      </TextContainer>
    </Container>
  );
};
