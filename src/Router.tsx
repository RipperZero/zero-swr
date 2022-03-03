import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "@mui/material";
import { APP_PATHS } from "./@common/config";

// TODO: import component
// import { Counter } from "./counter";
// import { MainMenu } from "./main-menu";
// import { SignIn, SignUp } from "./sign-in";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={APP_PATHS.ROOT}
          element={<Button variant="contained">湖人总冠军</Button>}
        />
        {/* <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
};
