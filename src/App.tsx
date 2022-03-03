import { FC } from "react";
import { CssBaseline } from "@mui/material";
import { ErrorBoundary } from "./ErrorBoundary";
import { Router } from "./Router";

export const App: FC = () => {
  return (
    <>
      <CssBaseline />
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </>
  );
};
