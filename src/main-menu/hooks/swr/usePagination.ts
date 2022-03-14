import { useEffect, useRef } from "react";
import Fetch from "utils/axios";
import useSWRInfinite from "swr/infinite";

type SWRKey = {
  url: string;
  params: {
    page_number: number;
  };
};

const PAGE_SIZE = 6;

export const usePagination = () => {
  // const paramsRef = useRef<any>(null);

  // const changeParams = (params: SWRKey["params"]) => {
  //   paramsRef.current = params;
  //   console.log(paramsRef.current);
  // };

  const fetcher = (url: string) => {
    // const fetcher = (swrKey: SWRKey) => {
    //   const url = `${swrKey.url}${swrKey.params.page_number}`;
    return fetch(url).then((res) => res.json());
  };

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite<
    any,
    Error
  >(
    (index) => {
      // const swrKey = paramsRef.current
      //   ? {
      //       url: `https://api.github.com/repos/reactjs/react-a11y/issues?per_page=${PAGE_SIZE}&page=`,
      //       //   params: {
      //       //     page_number: index + 1,
      //       //   },
      //       params: paramsRef.current,
      //     }
      //   : null;
      const swrKey = `https://api.github.com/repos/reactjs/react-a11y/issues?per_page=${PAGE_SIZE}&page=${
        index + 1
      }`;
      // console.log(swrKey);
      return swrKey;
    },
    fetcher,
    // {
    //   revalidateFirstPage: false,
    //   revalidateAll: false,
    //   revalidateIfStale: false,
    // },
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  return {
    data,
    error,
    mutate,
    size,
    setSize,
    isValidating,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    isRefreshing,
    // changeParams,
  } as const;
};
