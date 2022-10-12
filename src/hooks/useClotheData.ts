import flatten from 'lodash.flatten';
import { useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';
import { SearchResponse } from 'typesense/lib/Typesense/Documents';
import { typeSenseResponseToClothe } from '../lib/typeSenseResponseToClothe';
import { Clothe } from '../types/Clothe';
import { Facet, facetsSchema } from '../types/Facet';

const fetcher = (url: string) => fetch(url).then((r) => r.json());
const getKey = (
  pageIndex: number,
  textSearch: string,
  sort: string,
  filters: { id: string; selected: string[] | boolean }[]
) => {
  const filterString = filters.reduce<string[]>((prev, f) => {
    if (f.selected && Array.isArray(f.selected) && f.selected.length) {
      return prev.concat(`${f.id}:[${f.selected.join(',')}]`);
    } else if (
      f.selected &&
      typeof f.selected == 'boolean' &&
      f.id === 'onSale'
    ) {
      return prev.concat(`oldPrice:>0`);
    }

    return prev;
  }, []);

  return `/api/getClothes?page=${
    pageIndex + 1
  }&q=${textSearch}&sort=${sort}&filter=${encodeURIComponent(
    filterString.join(' && ')
  )}`;
};

interface returnProps {
  clothes: Clothe[];
  facets: Facet[] | undefined;
  nextPage: VoidFunction;
  isLoading: boolean;
  isError: boolean;
}

export const useClothesData: (
  textSearch: string,
  sort: string,
  filters: { id: string; selected: string[] | boolean }[]
) => returnProps = (textSearch = '', sort = '', filters = []) => {
  const { data, error, size, setSize } = useSWRInfinite<SearchResponse<{}>>(
    (pageIndex) => getKey(pageIndex, textSearch, sort, filters),
    fetcher,
    {
      initialSize: 1,
    }
  );

  const props = useMemo(() => {
    const clothes = flatten(data?.map((d) => typeSenseResponseToClothe(d)));
    const facets = facetsSchema.safeParse(data?.[0].facet_counts);
    const nextPage = () => setSize(size + 1);

    return {
      clothes,
      facets: facets.success ? facets.data : undefined,
      nextPage,
    };
  }, [data, setSize, size]);

  return {
    ...props,
    currentPageNumber: size,
    isError: error,
    isLoading: !error && !data,
  };
};
