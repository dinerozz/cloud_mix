import { BrowserRouter, Route, Routes } from "react-router-dom";
import { privateRoutes } from "./routes/routes";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {privateRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
