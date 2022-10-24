import { FC } from 'react';
import styled from 'styled-components';
import { FilterButtonClearButton } from '../filter-button/filter-button';

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  all: unset;
  box-sizing: border-box;

  height: 100%;
  width: 100%;
  padding: 0 calc(8px + 18px + 8px) 0 8px;

  border: 1px solid black;
  font-family: 'Lato', sans-serif;
`;

const ClearValuesButton = styled(FilterButtonClearButton).attrs({
  black: true,
})`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 8px 0 8px;
`;

export interface SearchBoxProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onClearClick?: VoidFunction;
}

export const SearchBox: FC<SearchBoxProps> = ({
  value,
  onChange,
  placeholder,
  onClearClick = () => undefined,
}) => (
  <InputContainer>
    <Input
      placeholder={placeholder}
      type='text'
      value={value}
      onChange={(event) => onChange(event?.target.value ?? '')}
    />

    {value && <ClearValuesButton onValueClear={onClearClick} />}
  </InputContainer>
);
