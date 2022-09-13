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

  background: ${(p) =>
    p.active ? COLOURS.clicked : p.hasValues ? 'black' : 'white'};
  padding: 12px 24px;
  border: 1px solid black;
  width: fit-content;
  color: ${(p) => (p.hasValues ? 'white' : 'black')};

  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;

  cursor: ${(p) => (p.hasValues ? '' : 'pointer')};

  &:hover {
    background: ${(p) => (p.hasValues ? '' : COLOURS.hover)};
  }

  &:active {
    background: ${(p) => (p.hasValues ? '' : COLOURS.clicked)};
  }

  &:focus {
    outline: solid;
  }
`;
