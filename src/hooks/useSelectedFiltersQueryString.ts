import { useMemo } from 'react';
import { useStore } from '../store/useStore';

export const useSelectedFiltersQueryString: () => string = () => {
  const onSale = useStore((state) => state.filters.onSale.selected);
  const facetOptions = useStore((state) => state.filters.facetOptions);

  return useMemo(() => {
    let facetOptionsString = facetOptions.reduce<string[]>((prev, facet) => {
      if (
        facet.selected &&
        facet.selected.length > 0 &&
        facet.type === 'checkbox'
      ) {
        return prev.concat(`${facet.id}:[${facet.selected.join(',')}]`);
      }

      if (
        facet.selected &&
        facet.selected.length > 0 &&
        facet.type === 'range'
      ) {
        return prev.concat(
          `${facet.id}:[${facet.selected[0]}..${facet.selected[1]}]`
        );
      }

      return prev;
    }, []);

    if (onSale) {
      facetOptionsString = facetOptionsString.concat('oldPrice:>0');
    }

    return encodeURIComponent(facetOptionsString.join(' && '));
  }, [facetOptions, onSale]);
};
