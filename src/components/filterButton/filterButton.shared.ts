import styled from 'styled-components';
import { COLOURS } from '../../styles/global';

export const FilterButtonContainer = styled.button<{
  active?: boolean;
  hasValues?: boolean;
}>`
  display: flex;
  flex-flow: row nowrap;
  gap: 12px;
  align-items: center;

  background: ${(p) => (p.hasValues ? 'black' : 'white')};
  padding: 12px 24px;
  border: 1px solid black;
  width: auto;
  color: ${(p) => (p.hasValues ? 'white' : 'black')};

  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1rem;
  white-space: nowrap;

  cursor: pointer;

  &:hover {
    background: ${(p) => (p.hasValues ? '' : COLOURS.hover)};
  }

  &:active {
    background: ${(p) => (p.hasValues ? '' : COLOURS.clicked)};
  }

  &:focus-visible {
    outline: solid;
  }
`;
