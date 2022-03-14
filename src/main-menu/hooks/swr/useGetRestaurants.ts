import { useEffect } from "react";
import Fetch from "utils/axios";
import useSWRInfinite from "swr/infinite";
import {
  AResponse,
  GetRestaurantsReqParams,
  GetRestaurantsResObj,
} from "@api.Restaurant";
// import {
//   DISH_OPTION_HEADER_ARG,
//   NOT_SUPPORT_HEADER_ARG,
//   SUPPORT_HEADER_ARG,
// } from "utils/isSupport";

type SWRKey = {
  url: string;
  params: GetRestaurantsReqParams;
};

const Token = process.env.REACT_APP_API_TOKEN;

export const useGetRestaurants = (
  params: Omit<GetRestaurantsReqParams, "page">,
  isSupportOndemandVersion: boolean,
  isSupportDishOptionVersion: boolean,
) => {
  const fetcher = (
    swrKey: SWRKey,
  ): Promise<AResponse<GetRestaurantsResObj>> => {
    return Fetch.post(swrKey.url, swrKey.params, {
      headers: {
        // "inner-test": isSupportOndemandVersion ? "Y" : "N",
        // [`${DISH_OPTION_HEADER_ARG}`]: isSupportDishOptionVersion
        //   ? SUPPORT_HEADER_ARG
        //   : NOT_SUPPORT_HEADER_ARG,
        "inner-test": "Y",
        "options-version": "Y",
        lang: "zh",
        Authorization: `${Token}`,
      },
    });
  };

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite<
    AResponse<GetRestaurantsResObj>,
    Error
  >(
    (index): SWRKey | null => {
      // check param
      return params
        ? {
            url: "/ec/mkpl/restaurants",
            // page从0开始
            params: { page: index, size: params.size, param: params.param },
          }
        : null;
    },
    fetcher,
    {
      revalidateAll: false,
      revalidateIfStale: false,
      revalidateFirstPage: false,
    },
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isRefreshing = isValidating && data && data.length === size;

  return {
    data,
    mutate,
    size,
    setSize,
    isValidating,
    isLoadingMore,
    // isEmpty,
    // isReachingEnd,
    isRefreshing,
  } as const;
};
