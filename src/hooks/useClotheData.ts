import flatten from 'lodash.flatten';
import { useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';
import { SearchResponse } from 'typesense/lib/Typesense/Documents';
import { typeSenseResponseToClothe } from '../lib/typeSenseResponseToClothe';
import { Clothe } from '../types/Clothe';

const fetcher = (url: string) => fetch(url).then((r) => r.json());
const getKey = (pageIndex: number, textSearch: string) =>
  `/api/getClothes?page=${pageIndex + 1}&q=${textSearch}`;

interface returnProps {
  clothes: Clothe[];
  currentPageNumber: number;
  nextPage: VoidFunction;
  totalNumberOfPages: number;
  isLoading: boolean;
  isError: boolean;
}

export const useClothesData: (textSearch?: string) => returnProps = (
  textSearch = ''
) => {
  const { data, error, size, setSize } = useSWRInfinite<SearchResponse<{}>>(
    (pageIndex) => getKey(pageIndex, textSearch),
    fetcher,
    {
      initialSize: 1,
    }
  );

  const props = useMemo(() => {
    const clothes = flatten(data?.map((d) => typeSenseResponseToClothe(d)));
    const totalNumberOfPages = Math.ceil((data?.[0]?.found ?? 1) / 10);
    const nextPage = () => setSize(size + 1);

    return {
      clothes,
      totalNumberOfPages,
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
