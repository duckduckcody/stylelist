import flatten from 'lodash.flatten';
import { useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';
import { SearchResponse } from 'typesense/lib/Typesense/Documents';
import { typeSenseResponseToClothe } from '../lib/typeSenseResponseToClothe';
import { Clothe } from '../types/Clothe';

const fetcher = (url: string) => fetch(url).then((r) => r.json());
const getKey = (pageIndex: number, textSearch: string, sort: string) =>
  `/api/getClothes?page=${pageIndex + 1}&q=${textSearch}&sort=${sort}`;

interface returnProps {
  clothes: Clothe[];
  nextPage: VoidFunction;
  isLoading: boolean;
  isError: boolean;
}

export const useClothesData: (textSearch: string, sort: string) => returnProps =
  (textSearch = '', sort = '') => {
    const { data, error, size, setSize } = useSWRInfinite<SearchResponse<{}>>(
      (pageIndex) => getKey(pageIndex, textSearch, sort),
      fetcher,
      {
        initialSize: 1,
      }
    );

    const props = useMemo(() => {
      const clothes = flatten(data?.map((d) => typeSenseResponseToClothe(d)));
      const nextPage = () => setSize(size + 1);

      return {
        clothes,
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
