import { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 140px;
`;

export interface FilterBarProps {}

export const FilterBar: FC<FilterBarProps> = () => <Container></Container>;
