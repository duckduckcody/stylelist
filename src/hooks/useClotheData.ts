import useSWR from 'swr';
import { SearchResponse } from 'typesense/lib/Typesense/Documents';
import { Clothe, clotheSchema } from '../types/Clothe';

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useClothesData: () => {
  clothes: Clothe[];
  isLoading: boolean;
  isError: boolean;
} = () => {
  let { data, error } = useSWR<SearchResponse<{}>>(`/api/getClothes`, fetcher);

  const clothes: Clothe[] = [];
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

  return {
    clothes,
    isError: error,
    isLoading: !error && !data,
  };
};
