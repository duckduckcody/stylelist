import { FC, useMemo } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 8px;
`;

export interface FilterButtonRangeMenuProps {
  options: string[];
  selectedOptions: string[];
  onInputChange: (val: string[]) => void;
}

export const FilterButtonRangeMenu: FC<FilterButtonRangeMenuProps> = ({
  options,
  selectedOptions,
  onInputChange,
}) => {
  const max = useMemo(() => {
    const numberOptions = options.map((o) => parseFloat(o));
    return Math.max(...numberOptions);
  }, [options]);

  return (
    <Container>
      <InputContainer>
        MIN:
        <input
          type='number'
          value={selectedOptions[0]}
          onChange={({ currentTarget }) =>
            onInputChange([currentTarget.value, selectedOptions[1]])
          }
          min={0}
          max={selectedOptions[1]}
        />
      </InputContainer>

      <InputContainer>
        MAX:
        <input
          type='number'
          value={selectedOptions[1]}
          onChange={({ currentTarget }) =>
            onInputChange([selectedOptions[0], currentTarget.value])
          }
          min={selectedOptions[0]}
          max={max}
        />
      </InputContainer>
    </Container>
  );
};
