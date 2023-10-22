import { BrowserRouter, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import React from "react";
import { AuthWrapper } from "@/routes/AuthWrapper";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {privateRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<AuthWrapper>{route.element}</AuthWrapper>}
          />
        ))}
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
