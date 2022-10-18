import { useMemo } from 'react';
import { useStore } from '../store/useStore';

export const useSelectedFiltersQueryString: () => string = () => {
  const onSale = useStore((state) => state.filters.onSale.selected);
  const facetOptions = useStore((state) => state.filters.facetOptions);

  return useMemo(() => {
    let facetOptionsString = facetOptions.reduce<string[]>((prev, facet) => {
      if (facet.selected && facet.selected.length > 0) {
        return prev.concat(`${facet.id}:[${facet.selected.join(',')}]`);
      }

      return prev;
    }, []);

    if (onSale) {
      facetOptionsString = facetOptionsString.concat('oldPrice:>0');
    }

    console.log('facetOptionsString.join', facetOptionsString.join(' && '));

    return encodeURIComponent(facetOptionsString.join(' && '));
  }, [facetOptions, onSale]);
};
