import { FC } from 'react';
import { FilterButton } from '../filter-button';

export interface FilterButtonActionProps {
  type: 'action';
  text: string;
  onButtonClick: VoidFunction;
}

export const FilterButtonAction: FC<FilterButtonActionProps> = ({
  text,
  onButtonClick,
}) => <FilterButton onClick={onButtonClick}>{text}</FilterButton>;
