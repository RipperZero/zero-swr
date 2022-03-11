import { useEffect, useRef } from "react";
// import Fetch from "utils/axios";
import useSWRInfinite from "swr/infinite";

type SWRKey = {
  url: string;
  params: {
    page_number: number;
  };
};

const PAGE_SIZE = 6;

export const usePagination = () => {
  const paramsRef = useRef<any>(null);

  const changeParams = (params: SWRKey["params"]) => {
    paramsRef.current = params;
    console.log(paramsRef.current);
  };

  const fetcher = (url: string, params: SWRKey["params"]) => {
    // const fetcher = (swrKey: SWRKey) => {
    //   const url = `${swrKey.url}${swrKey.params.page_number}`;
    console.log(params);
    console.log(paramsRef.current);
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
    (url) => fetcher(url, paramsRef.current),
    {
      revalidateFirstPage: false,
      revalidateAll: false,
      revalidateIfStale: false,
    },
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  return {
    data,
    error,
    mutate,
    size,
    setSize,
    isValidating,
    changeParams,
  } as const;
};
