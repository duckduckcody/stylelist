import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';
import { SearchResponse } from 'typesense/lib/Typesense/Documents';
import { Clothe, clotheSchema } from '../types/Clothe';

const fetcher = (url: string) => fetch(url).then((r) => r.json());
const getKey = (pageIndex: number) => `/api/getClothes?page=${pageIndex + 1}`;

export const useClothesData: () => {
  clothes: Clothe[];
  currentPageNumber: number;
  nextPage: VoidFunction;
  totalNumberOfPages: number;
  isLoading: boolean;
  isError: boolean;
} = () => {
  const { data, error, size, setSize } = useSWRInfinite<SearchResponse<{}>>(
    getKey,
    fetcher,
    {
      initialSize: 1,
    }
  );

  const clothes: Clothe[] = [];
  data?.forEach((data) => {
    data?.hits?.forEach((clothe) => {
      const clotheParse = clotheSchema.safeParse(clothe.document);
      if (clotheParse.success) {
        clothes.push(clotheParse.data);
      } else {
        console.error(
          'Bad clothe data received in useClothesData',
          clotheParse.error
        );
      }
    });
  });

  const nextPage = useCallback(() => {
    setSize(size + 1);
  }, [size, setSize]);

  const totalNumberOfPages = useMemo(
    () => Math.ceil((data?.[0]?.found ?? 1) / 10),
    [data]
  );

  return {
    clothes,
    currentPageNumber: size,
    nextPage,
    totalNumberOfPages,
    isError: error,
    isLoading: !error && !data,
  };
};
