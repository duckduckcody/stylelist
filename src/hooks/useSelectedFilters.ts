import { CheckboxFilterId } from '../store/filterStore';
import { useStore } from '../store/useStore';

// returns selected filter options in a performant way
export const useSelectedFilters: () => {
  id: string;
  selected: string[] | boolean;
}[] = () => {
  const genderSelected = useStore(
    (state) => state.filters.checkboxes.gender.selected
  );

  const sizeSelected = useStore(
    (state) => state.filters.checkboxes.size.selected
  );

  const categorySelected = useStore(
    (state) => state.filters.checkboxes.category.selected
  );

  const brandSelected = useStore(
    (state) => state.filters.checkboxes.brand.selected
  );

  const onSale = useStore((state) => state.filters.booleans.onSale.selected);

  return [
    {
      id: CheckboxFilterId.gender,
      selected: genderSelected,
    },
    {
      id: 'sizes',
      selected: sizeSelected,
    },
    {
      id: CheckboxFilterId.category,
      selected: categorySelected,
    },
    {
      id: CheckboxFilterId.brand,
      selected: brandSelected,
    },
    {
      id: 'onSale',
      selected: onSale,
    },
  ];
};
