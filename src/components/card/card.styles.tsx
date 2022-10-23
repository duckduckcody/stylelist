import NextImage from 'next/image';
import styled, { keyframes } from 'styled-components';
import HeartSolid from '../../icons/heart-solid.svg';
import Heart from '../../icons/heart.svg';
import { MOBILE_BREAKPOINT } from '../../styles/global';

export const Container = styled.div`
  width: 100%;
`;

export const ImageContainer = styled.div`
  all: unset;

  position: relative;
  cursor: pointer;
`;

export const ImageLink = styled.a`
  all: unset;

  &:focus-visible {
    border: 1px solid grey;
  }
`;

export const Image = styled(NextImage)`
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

  &:focus-visible {
    border: 1px solid grey;
  }
`;

export const TextContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'brand brand'
    'name name'
    'price price';

  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 1rem;
  line-height: 1.1875rem;
  gap: 2px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    margin: 6px 0;
  } ;
`;

export const Brand = styled.p`
  grid-area: brand;
  margin: 0;
  font-size: 0.9rem;
  line-height: 0.9rem;
  text-transform: capitalize;
  color: #4e4e4e;
`;

export const Name = styled.h3`
  all: unset;

  font-size: 1rem;
  grid-area: name;
  margin: 0;
`;

export const PercentageOffContainer = styled.div`
  position: absolute;
  left: 12px;
  bottom: 20px;

  background: white;
  color: #4e4e4e;
  padding: 6px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PercentageOff = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  line-height: 1.1875rem;
`;

export const PriceContainer = styled.div`
  grid-area: price;
  display: flex;
  flex-flow: row nowrap;
  gap: 8px;

  font-size: 0.9rem;
`;

export const Price = styled.span``;

export const OldPrice = styled.span`
  text-decoration: line-through;
`;

export const HeartIcon = styled(Heart)`
  width: 24px;
  height: 24px;
`;

export const HeartSolidIcon = styled(HeartSolid)`
  width: 24px;
  height: 24px;
  color: red;
`;

const stamp = keyframes`
  0% {
    opacity: 0;
    transform: scale(1.1) rotate(-10deg);
  }

  10% {
    opacity: 1;
    transform: scale(0.9) rotate(-10deg);
  }

  20% {
    opacity: 1;
    transform: scale(1) rotate(-10deg);
  }

  80% {
    opacity: 1;
    transform: scale(1) rotate(-10deg);
  }

  100% {
    opacity: 0;
    transform: scale(1.2) rotate(-10deg);
  }
`;

export const HeartStamp = styled(HeartSolidIcon)`
  opacity: 0;
  position: absolute;
  bottom: 128px;
  right: 32px;
  width: 128px;
  height: 128px;
  animation: ${stamp} 1s linear;
`;
