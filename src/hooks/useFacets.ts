import { useStore } from '../store/useStore';
import { Facets } from '../types/Facet';

export const useFacets = (facets: Facets | undefined) => {
  const genderOptions = facets
    ?.find((f) => f.field_name === 'gender')
    ?.counts.map((c) => c.value);

  const sizeOptions = facets
    ?.find((f) => f.field_name === 'sizes')
    ?.counts.map((c) => c.value);

  const categoryOptions = facets
    ?.find((f) => f.field_name === 'category')
    ?.counts.map((c) => c.value);

  const brandOptions = facets
    ?.find((f) => f.field_name === 'brand')
    ?.counts.map((c) => c.value);

  useStore.setState((state) => {
    if (brandOptions && state.filters.checkboxes.brand.options.length === 0) {
      state.filters.checkboxes.brand.options = brandOptions;
    }

    if (genderOptions && state.filters.checkboxes.gender.options.length === 0) {
      state.filters.checkboxes.gender.options = genderOptions;
    }

    if (sizeOptions && state.filters.checkboxes.size.options.length === 0) {
      state.filters.checkboxes.size.options = sizeOptions;
    }

    if (
      categoryOptions &&
      state.filters.checkboxes.category.options.length === 0
    ) {
      state.filters.checkboxes.category.options = categoryOptions;
    }
  });
};
