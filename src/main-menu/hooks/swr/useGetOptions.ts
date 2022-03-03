import Fetch from "utils/axios";
import useSWR from "swr";
import { GetDishOptionResObj } from "@api.Restaurant";

export const useGetOptions = () => {
  const fetcher = (url: string) =>
    Fetch.get(url, undefined, {
      headers: { lang: "zh" },
    }).then((res) => res.object);

  const { data, error, isValidating } = useSWR<GetDishOptionResObj>(
    "/ec/mkpl/option?product_id=915959",
    fetcher,
  );

  return {
    data,
    isLoading: !error && !data,
    error,
    isValidating,
  };
};
