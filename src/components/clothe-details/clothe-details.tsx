import { FC, useState } from 'react';
import styled from 'styled-components';
import CrossIcon from '../../icons/cross.svg';
import { MOBILE_BREAKPOINT } from '../../styles/global';
import { Clothe } from '../../types/Clothe';

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  display: grid;
  grid-template-columns: auto 400px;
  grid-template-rows: 100%;
  grid-template-areas: 'images info';
  justify-content: center;
  gap: 24px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-template-columns: 1fr;
    grid-template-rows: 40% 60%;
  }
`;

const CloseIcon = styled(CrossIcon)`
  position: absolute;
  right: 0;
  top: 20px;
  cursor: pointer;
`;

const ImagesContainer = styled.div`
  grid-area: images;

  display: grid;
  grid-template-columns: 150px minmax(auto, 1000px);
  grid-template-areas: 'thumbnails image';
`;

const ThumbnailsContainer = styled.div`
  grid-area: thumbnails;
  direction: rtl;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-flow: column nowrap;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-flow: row nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
  }
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

const TextContainer = styled.div`
  grid-area: info;
  overflow-y: auto;
  display: grid;
  align-content: center;
  grid-template-columns: 1fr 36px;
  grid-template-rows: repeat(4, min-content);
  grid-template-areas:
    'name name'
    'price price'
    'buttonContainer buttonContainer'
    'description description';

  font-family: 'Lato', sans-serif;
  font-size: 1rem;
`;

const Price = styled.div`
  grid-area: price;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: bold;
`;

const Name = styled.div`
  grid-area: name;
  font-size: 1.5rem;
`;

const Description = styled.div`
  grid-area: description;
  font-size: 1rem;
  line-height: 1.5rem;
`;

const ButtonContainer = styled.div`
  grid-area: buttonContainer;
  position: sticky;
  display: flex;
  flex-flow: row nowrap;
  justify-items: center;
  width: 100%;
  margin: 10px 0;
  top: 0;
`;

const ViewButton = styled.a`
  cursor: pointer;
  flex: 1 1 auto;
  padding: 5px 0;
  background-color: white;
  border: none;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 8px 0;
    font-size: 1.1rem;
  }
`;

export interface ClotheDetailsProps {
  clothe: Clothe;
  onCloseClick?: VoidFunction;
}

const toBase64 = (str: string) => window.btoa(str);

export const ClotheDetails: FC<ClotheDetailsProps> = ({
  clothe,
  onCloseClick = () => undefined,
}) => {
  const [selectedImage, setSelectedImage] = useState(clothe.images[0]);

  return (
    <Container>
      <CloseIcon onClick={onCloseClick} />

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

      <TextContainer>
        {/* <WebsitesLogo src={clotheInfo.websitesLogo} /> */}
        {/* <WebsiteName>{clotheInfo.websiteName}</WebsiteName> */}
        <Name>{clothe.name}</Name>
        <Price>${clothe.price}</Price>
        <Description>{clothe.details}</Description>

        <ButtonContainer>
          <ViewButton href={clothe.link} target='_blank'>
            View product
          </ViewButton>
        </ButtonContainer>
      </TextContainer>
    </Container>
  );
};
