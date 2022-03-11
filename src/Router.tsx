import { BrowserRouter, Routes, Route } from "react-router-dom";
import { APP_PATHS } from "./@common/config";

// TODO: import component
import { SWRTable, SWRPagination, ZeroPagination } from "main-menu";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_PATHS.ROOT} element={<SWRPagination />} />
        <Route path={APP_PATHS.PAGINATION} element={<ZeroPagination />} />
      </Routes>
    </BrowserRouter>
  );
};
