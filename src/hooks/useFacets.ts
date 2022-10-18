import { useStore } from '../store/useStore';
import { Facets, facetsSchema } from '../types/Facet';

export const useFacets = (facets: Facets | undefined) => {
  const addFacetOption = useStore((state) => state.filters.addFacetOption);

  if (facets && facets.length > 0) {
    const facetParse = facetsSchema.safeParse(facets);

    if (facetParse.success) {
      facetParse.data.forEach((facet) => {
        const options = facet.counts.map((count) => count.value);
        addFacetOption(facet.field_name, options);
      });
    } else {
      console.log('bad facet data', facetParse.error);
    }
  }
};
