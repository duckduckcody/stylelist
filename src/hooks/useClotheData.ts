import flatten from 'lodash.flatten';
import { useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';
import { SearchResponse } from 'typesense/lib/Typesense/Documents';
import { PER_PAGE_PRODUCT_LIMIT } from '../constants';
import { typeSenseResponseToClothe } from '../lib/typeSenseResponseToClothe';
import { Clothe } from '../types/Clothe';
import { Facet, facetsSchema } from '../types/Facet';

const fetcher = (url: string) => fetch(url).then((r) => r.json());
const getKey = (
  pageIndex: number,
  textSearch: string,
  sort: string,
  selectedFiltersQueryString: string
) =>
  `/api/getClothes?page=${
    pageIndex + 1
  }&q=${textSearch}&sort=${sort}&filter=${selectedFiltersQueryString}`;

interface returnProps {
  clothes: Clothe[];
  facets: Facet[] | undefined;
  nextPage: VoidFunction;
  numberOfClothes: number | undefined;
  isLoadingMore: boolean | undefined;
  currentPageNumber: number;
  isError: boolean;
  isLastPage: boolean;
}

export const useClothesData: (
  textSearch: string,
  sort: string,
  selectedFiltersQueryString: string
) => returnProps = (textSearch, sort, selectedFiltersQueryString) => {
  const { data, error, size, setSize, isValidating } = useSWRInfinite<
    SearchResponse<{}>
  >(
    (pageIndex) =>
      getKey(pageIndex, textSearch, sort, selectedFiltersQueryString),
    fetcher,
    {
      initialSize: 1,
      revalidateOnFocus: false,
    }
  );

  const props = useMemo(() => {
    const clothes = flatten(data?.map((d) => typeSenseResponseToClothe(d)));
    const facets = facetsSchema.safeParse(data?.[0].facet_counts);
    const nextPage = () => setSize(size + 1);

    const isLoadingInitialData = !data && !error;
    const isLoadingMore =
      isLoadingInitialData ||
      (size > 0 && data && typeof data[size - 1] === 'undefined');
    const isLastPage =
      (data?.[data.length - 1]?.found ?? 0) < PER_PAGE_PRODUCT_LIMIT;

    return {
      clothes,
      isLoadingMore,
      isLastPage,
      facets: facets.success ? facets.data : undefined,
      numberOfClothes: data?.[0]?.found,
      nextPage,
    };
  }, [data, error, setSize, size]);

  return {
    ...props,
    currentPageNumber: size,
    isError: error,
    isValidating: isValidating,
  };
};
