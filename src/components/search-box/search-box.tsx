import { FC } from 'react';
import styled from 'styled-components';
import CrossIcon from '../../icons/cross.svg';

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  all: unset;
  box-sizing: border-box;

  height: 100%;
  width: 100%;
  padding: 0 calc(4px + 4px + 18px + 4px) 0 8px;

  border: 1px solid black;
  font-family: 'Lato', sans-serif;
`;

const CrossButton = styled.button`
  all: unset;

  position: absolute;
  right: 4px;
  top: calc(50% - 11px);

  height: 18px;
  width: 18px;
  padding: 4px;
`;

const Cross = styled(CrossIcon)`
  color: black;
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

    {value && (
      <CrossButton>
        <Cross onClick={onClearClick} />
      </CrossButton>
    )}
  </InputContainer>
);
