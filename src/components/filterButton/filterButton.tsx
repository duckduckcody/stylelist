import { FC, useMemo } from 'react';
import styled from 'styled-components';
import ChevronIcon from '../../icons/chevron.svg';
import CrossIcon from '../../icons/cross.svg';
import { COLOURS } from '../../styles/global';

const Container = styled.button<{ active: boolean; hasValues: boolean }>`
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

  &:focus {
    outline: solid;
  }
`;

const Chevron = styled(ChevronIcon)<{ active: boolean }>`
  width: 12px;
  height: 12px;
  transform: ${(p) => (p.active ? 'rotate(180deg)' : '')};
`;

const CrossButton = styled.button`
  all: unset;
  height: 18px;
  width: 18px;

  &:focus {
    outline: white solid 2px;
  }
`;

const Cross = styled(CrossIcon)`
  cursor: pointer;
  height: 18px;
  width: 18px;
`;

export interface FilterButtonProps {
  text: string;
  active: boolean;
  values: string[];
  onValueClear: VoidFunction;
}

export const FilterButton: FC<FilterButtonProps> = ({
  text,
  active = false,
  values,
  onValueClear = () => undefined,
}) => {
  const valueString = useMemo(
    () => (values ? values.join(', ') : undefined),
    [values]
  );

  return (
    <Container
      active={active}
      hasValues={Boolean(valueString)}
      as={valueString ? 'div' : 'button'}
    >
      {!values && (
        <>
          {text} <Chevron active={active} />
        </>
      )}
      {values && (
        <>
          {valueString}
          <CrossButton aria-label='clear value' onClick={onValueClear}>
            <Cross />
          </CrossButton>
        </>
      )}
    </Container>
  );
};
