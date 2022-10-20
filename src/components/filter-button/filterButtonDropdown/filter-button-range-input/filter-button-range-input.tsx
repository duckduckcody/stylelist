import { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div``;

export interface FilterButtonRangeInputProps {
  selectedOptions: string[];
  onInputChange: (val: string) => void;
}

export const FilterButtonRangeInput: FC<FilterButtonRangeInputProps> = ({
  selectedOptions,
  onInputChange,
}) => <Container></Container>;
