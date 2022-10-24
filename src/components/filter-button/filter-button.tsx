import { FC } from 'react';
import styled from 'styled-components';
import CrossIcon from '../../icons/cross.svg';
import { COLOURS } from '../../styles/global';

export const FilterButton = styled.button<{
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

const CrossButton = styled.button`
  all: unset;
  height: 100%;
  cursor: pointer;
  padding: 0 4px;
  display: flex;
  align-items: center;

  &:focus-visible {
    outline: white solid 2px;
  }

  &:active {
    color: ${COLOURS.clicked};
  }
`;

const Cross = styled(CrossIcon)<{ black?: boolean }>`
  color: ${(p) => (p.black ? 'black' : 'white')};
`;

export interface FilterButtonClearButtonProps {
  onValueClear: VoidFunction;
  black?: boolean;
  className?: string;
}

export const FilterButtonClearButton: FC<FilterButtonClearButtonProps> = ({
  onValueClear,
  black,
  className,
}) => (
  <CrossButton
    aria-label='clear value'
    onClick={onValueClear}
    className={className}
  >
    <Cross black={black} />
  </CrossButton>
);
