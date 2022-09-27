import { FC } from 'react';
import styled from 'styled-components';

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
`;

const InputContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 14px;
`;

const Input = styled.input`
  margin: 0;
  padding: 0;
  cursor: pointer;
  border: 1px solid black;
`;

interface Option {
  label: string;
  value: string;
}

export interface FilterButtonDropdownMenuProps {
  options: Option[];
  checkedOptions?: string[];
  onInputClick?: (value: string) => void;
  className?: string;
}

export const FilterButtonDropdownMenu: FC<FilterButtonDropdownMenuProps> = ({
  options,
  checkedOptions,
  onInputClick = () => undefined,
  className,
}) => (
  <Container className={className}>
    {options.map((option) => (
      <InputContainer key={option.value}>
        <Input
          type='checkbox'
          value={option.value}
          checked={checkedOptions?.includes(option.value)}
          onChange={() => onInputClick(option.value)}
        />
        {option.label}
      </InputContainer>
    ))}
  </Container>
);
