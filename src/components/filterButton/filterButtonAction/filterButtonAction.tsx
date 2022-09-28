import { FC } from 'react';
import { FilterButtonContainer } from '../filterButton.shared';

export interface FilterButtonActionProps {
  type: 'action';
  text: string;
  onButtonClick: VoidFunction;
}

export const FilterButtonAction: FC<FilterButtonActionProps> = ({
  text,
  onButtonClick,
}) => (
  <FilterButtonContainer onClick={onButtonClick}>{text}</FilterButtonContainer>
);
