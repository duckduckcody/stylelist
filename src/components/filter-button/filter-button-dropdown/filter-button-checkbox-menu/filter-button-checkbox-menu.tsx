import { FC } from 'react';
import styled from 'styled-components';
import { MOBILE_BREAKPOINT } from '../../../../styles/global';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 18px;

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

export interface FilterButtonCheckboxMenuProps {
  options: string[];
  selectedOptions?: string[] | string;
  onInputClick?: (value: string) => void;
  name: string;
  menuType: 'range' | 'checkbox' | 'radio';
  className?: string;
}

export const FilterButtonCheckboxMenu: FC<FilterButtonCheckboxMenuProps> = ({
  options,
  selectedOptions,
  onInputClick = () => undefined,
  name,
  menuType,
  className,
}) => (
  <Container className={className}>
    {options.map((option) => (
      <InputContainer key={option}>
        <Input
          name={name}
          type={menuType}
          value={option}
          checked={selectedOptions?.includes(option)}
          onChange={() => onInputClick(option)}
        />
        {option}
      </InputContainer>
    ))}
  </Container>
);
