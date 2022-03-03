import { FC } from "react";
import { SWRConfig } from "swr";
import { CssBaseline } from "@mui/material";
import { ErrorBoundary } from "./ErrorBoundary";
import { Router } from "./Router";

export const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <ErrorBoundary>
        <SWRConfig
          value={{
            // 窗口聚焦时自动重新验证
            revalidateOnFocus: false,
          }}
        >
          <Router />
        </SWRConfig>
      </ErrorBoundary>
    </>
  );
};
