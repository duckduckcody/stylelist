import { forwardRef } from 'react';
import styled from 'styled-components';
import CrossIcon from '../../icons/cross.svg';
import { COLOURS } from '../../styles/global';

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

const Cross = styled(CrossIcon)`
  color: white;
`;

export interface FilterButtonClearButtonProps {
  onValueClear: VoidFunction;
  className?: string;
}

export const FilterButtonClearButton =
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLButtonElement, FilterButtonClearButtonProps>(
    ({ onValueClear, className }, ref) => (
      <CrossButton
        aria-label='clear value'
        onClick={onValueClear}
        ref={ref}
        className={className}
      >
        <Cross />
      </CrossButton>
    )
  );
