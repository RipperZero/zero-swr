import Fetch from "utils/axios";
import useSWR from "swr";
// import useSWRImmutable from "swr/immutable";
import { GetDishOptionResObj } from "@api.Restaurant";

const TEST_ARG_A = "湖人总冠军";
const TEST_ARG_B = 666;

type SWRKey = {
  url: string;
  args: {
    argA: string;
    argB: number;
  };
};

export const useGetOptions = () => {
  // array fetcher start
  // const arrayArgsfetcher = (url: string, argA: number, argB: string) => {
  //   console.log(argA);
  //   console.log(argB);
  //   return Fetch.get(url, undefined, {
  //     headers: { lang: "zh" },
  //   }).then((res) => res.object);
  // };

  // const { data, error, isValidating } = useSWR<GetDishOptionResObj>(
  //   // 数组传参 自动推算类型
  //   ["/ec/mkpl/option?product_id=915959", TEST_ARG_A, TEST_ARG_B],
  //   arrayArgsfetcher,
  // );
  // array fetcher end

  // obj fetcher start
  const objArgsfetcher = (sewKeys: SWRKey) => {
    console.log(sewKeys.args);

    return Fetch.get(sewKeys.url, undefined, {
      headers: { lang: "zh" },
    }).then((res) => res.object);
  };

  const { data, error, isValidating, mutate } = useSWR<
    GetDishOptionResObj,
    Error,
    SWRKey
  >(
    // 对象传参
    {
      url: "/ec/mkpl/option?product_id=915959",
      args: {
        argA: TEST_ARG_A,
        argB: TEST_ARG_B,
      },
    },
    objArgsfetcher,
  );
  // obj fetcher end
  // const { data, error, isValidating } = useSWRImmutable<GetDishOptionResObj>(
  //   "/ec/mkpl/option?product_id=915959",
  //   fetcher,
  // );

  return {
    data,
    isLoading: !error && !data,
    error,
    isValidating,
    getOptionsMutate: mutate,
  } as const;
};
