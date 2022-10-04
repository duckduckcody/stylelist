import { forwardRef } from 'react';
import styled from 'styled-components';
import CrossIcon from '../../icons/cross.svg';
import { COLOURS } from '../../styles/global';

const CrossButton = styled.button`
  all: unset;
  height: 16px;
  width: 16px;

  &:focus-visible {
    outline: white solid 2px;
  }

  &:active {
    color: ${COLOURS.clicked};
  }
`;

const Cross = styled(CrossIcon)`
  cursor: pointer;
  height: 16px;
  width: 16px;
`;

export interface FilterButtonCrossButtonProps {
  onValueClear: VoidFunction;
}

export const FilterButtonCrossButton =
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLButtonElement, FilterButtonCrossButtonProps>(
    ({ onValueClear }, ref) => (
      <CrossButton aria-label='clear value' onClick={onValueClear}>
        <Cross ref={ref} />
      </CrossButton>
    )
  );
