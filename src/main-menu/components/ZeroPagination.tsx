import { FC, useEffect } from "react";
// import { makeStyles, createStyles } from "@material-ui/styles";
// import { Box } from "@mui/material";
import { usePagination } from "../hooks";

// const useStyles = makeStyles((theme) => {
//   return createStyles({
//     example: {},
//   });
// });

type ZeroPaginationProps = {};

const PAGE_SIZE = 6;

export const ZeroPagination: FC<ZeroPaginationProps> = () => {
  // hooks start
  const { data, error, mutate, size, setSize, isValidating, changeParams } =
    usePagination();

  const issues = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;
  // hooks end

  // useEffect functions start
  // useEffect functions end

  // logic functions start
  // logic functions end

  // render functions start
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <button
        onClick={() => {
          //   setSize(1);
        }}
      >
        load issues
      </button>
      <p>
        showing {size} page(s) of {isLoadingMore ? "..." : issues.length}{" "}
        issue(s){" "}
        <button
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => {
            const zero = data?.length ? data?.length : 0;
            console.log(zero);
            setSize(size + 1);
            changeParams({ page_number: zero });
          }}
        >
          {isLoadingMore
            ? "loading..."
            : isReachingEnd
            ? "no more issues"
            : "load more"}
        </button>
        <button disabled={isRefreshing} onClick={() => mutate()}>
          {isRefreshing ? "refreshing..." : "refresh"}
        </button>
        <button disabled={!size} onClick={() => setSize(0)}>
          clear
        </button>
      </p>
      {isEmpty ? <p>Yay, no issues found.</p> : null}
      {issues.map((issue: any) => {
        return (
          <p key={issue.id} style={{ margin: "6px 0" }}>
            - {issue.title}
          </p>
        );
      })}
    </div>
  );
  // render functions end
};
