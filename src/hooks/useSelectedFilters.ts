import { CheckboxFilterId } from '../store/filterStore';
import { useStore } from '../store/useStore';

// returns selected filter options in a performant way
export const useSelectedFilters: () => { id: string; selected: string[] }[] =
  () => {
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
    ];
  };
