import RCSlider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FC } from 'react';
import styled from 'styled-components';
import { MOBILE_BREAKPOINT } from '../../../../styles/global';

const Container = styled.div`
  font-family: 'Lato', sans-serif;
  font-weight: normal;
  font-size: 1rem;

  display: flex;
  flex-flow: column nowrap;
  border: 1px solid black;
  padding: 24px 64px 24px 18px;
  width: fit-content;
  gap: 18px;

  background: white;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    gap: 32px;
  }
`;

const InputContainer = styled.label`
  display: flex;
  flex-flow: row nowrap;
  gap: 14px;
  cursor: pointer;

  text-transform: capitalize;
`;

const Input = styled.input`
  margin: 0;
  padding: 0;
  border: 1px solid black;
  cursor: pointer;
`;

const Slider = styled(RCSlider)`
  width: 300px;
`;

export interface FilterButtonDropdownMenuProps {
  options: string[];
  selectedOptions?: string[] | string;
  onInputClick?: (value: string) => void;
  type: 'checkbox' | 'radio' | 'range';
  name: string;
  className?: string;
}

export const FilterButtonDropdownMenu: FC<FilterButtonDropdownMenuProps> = ({
  options,
  selectedOptions,
  onInputClick = () => undefined,
  type,
  name,
  className,
}) => (
  <Container className={className}>
    {type === 'range' && <Slider range value={[0, 55]} min={0} max={100} />}
    {type === 'checkbox' &&
      options.map((option) => (
        <InputContainer key={option}>
          <Input
            name={name}
            type={type}
            value={option}
            checked={selectedOptions?.includes(option)}
            onChange={() => onInputClick(option)}
          />
          {option}
        </InputContainer>
      ))}
  </Container>
);
