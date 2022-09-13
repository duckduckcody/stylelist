import { FC } from 'react';
import { FilterButtonContainer } from '../filterButton.shared';

export interface FilterButtonActionProps {
  text: string;
}

export const FilterButtonAction: FC<FilterButtonActionProps> = ({ text }) => (
  <FilterButtonContainer>{text}</FilterButtonContainer>
);
