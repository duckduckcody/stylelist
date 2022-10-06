import useSWR from 'swr';

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useClothesData: (
  page: number,
  firstPageData?: {}[]
) => {
  data: any;
  isLoading: boolean;
  isError: boolean;
} = (page, firstPageData) => {
  // https://swr.vercel.app/docs/pagination
  let { data, error } = useSWR(`/api/getClothes?page=${page}`, fetcher);

  if (firstPageData) {
    data = firstPageData.concat(data);
  }

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
