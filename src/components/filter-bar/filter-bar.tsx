import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 24px 120px;
  display: flex;
  flex-flow: row nowrap;
  gap: 24px;
`;

export interface FilterBarProps {
  children: ReactNode;
}

export const FilterBar: FC<FilterBarProps> = ({ children }) => (
  <Container>{children}</Container>
);
