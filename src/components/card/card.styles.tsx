import styled from 'styled-components';
import HeartSolid from '../../icons/heart-solid.svg';
import Heart from '../../icons/heart.svg';

export const Container = styled.div`
  width: 400px;
`;

export const ImageContainer = styled.div`
  all: unset;

  height: 600px;
  width: inherit;
  position: relative;
  cursor: pointer;
`;

export const ImageLink = styled.a`
  all: unset;

  height: inherit;
  width: inherit;

  &:focus {
    border: 1px solid grey;
  }
`;

export const Image = styled.img`
  height: inherit;
  width: inherit;
  object-fit: cover;
`;

export const HeartContainer = styled.button`
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

export const HeartIcon = styled(Heart)`
  width: 24px;
  height: 24px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
  margin: 12px 0;

  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  line-height: 1.1875rem;
  font-weight: normal;
`;

export const Name = styled.h3`
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 12px;
`;

export const PercentageOffContainer = styled.div`
  position: absolute;
  left: 12px;
  bottom: 20px;

  background: white;
  padding: 6px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PercentageOff = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  line-height: 1.1875rem;
`;

export const Price = styled.span``;

export const OldPrice = styled.span`
  text-decoration: line-through;
`;

export const HeartStamp = styled(HeartSolid)`
  position: absolute;
  bottom: 128px;
  right: 32px;

  color: red;
  width: 128px;
  height: 128px;
  transform: rotate(-13deg);
`;
