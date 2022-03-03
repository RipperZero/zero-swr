import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "@mui/material";
import { APP_PATHS } from "./@common/config";

// TODO: import component
import { SWRTable } from "main-menu";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_PATHS.ROOT} element={<SWRTable />} />
      </Routes>
    </BrowserRouter>
  );
};
