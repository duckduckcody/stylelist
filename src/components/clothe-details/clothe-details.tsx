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
  margin: 0;

  display: grid;
  grid-template-columns: 150px 1fr 400px;
  grid-template-rows: 100%;
  grid-template-areas: 'images info';

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    grid-template-columns: 1fr;
    grid-template-rows: 40% 60%;
  }
`;

const CloseIcon = styled(CrossIcon)`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
`;

const ImagesContainer = styled.div`
  grid-area: images;
  display: flex;
  flex-flow: row nowrap;
`;

const ThumbnailContainer = styled.div`
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

export const ThumbnailImage = styled.img<{
  selected?: boolean;
}>`
  border-right: ${(p) => p.selected && `8px solid black`};
  width: 100%;
  cursor: pointer;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: unset;
    height: 100%;
  }
`;

const ImageContainer = styled.div<{ imageSrc?: string }>`
  grid-area: image;
  background: top / contain no-repeat url(${(p) => p.imageSrc}),
    top / 200px no-repeat url('/spinner.svg'); ;
`;

const TextContainer = styled.div`
  grid-area: info;
  overflow-y: auto;
  display: grid;
  padding: 0 0 0 12px;
  grid-template-columns: 1fr 36px;
  grid-template-rows: repeat(4, min-content);
  grid-template-areas:
    'name name'
    'price price'
    'buttonContainer buttonContainer'
    'description description';

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 0;
  }
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

export const ClotheDetails: FC<ClotheDetailsProps> = ({
  clothe,
  onCloseClick = () => undefined,
}) => {
  const isMobile = useIsMobile();
  const [selectedImage, setSelectedImage] = useState(clothe.images[0]);

  return (
    <Container>
      <CloseIcon onClick={onCloseClick} />

      <ImagesContainer>
        <ThumbnailContainer>
          {clothe.images.map((img, index) => (
            <ThumbnailImage
              key={`${img}${index}`}
              src={img}
              selected={selectedImage === img}
              alt={clothe.name}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </ThumbnailContainer>

        {!isMobile && <ImageContainer imageSrc={selectedImage} />}
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
