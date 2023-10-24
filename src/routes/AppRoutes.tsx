import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import React, { useEffect } from "react";
import { AuthWrapper } from "@/routes/AuthWrapper";
import { useRecoilState } from "recoil";
import { isInitializedState, isLoggedInState } from "@/store/authState";

export const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [, setIsInitialized] = useRecoilState(isInitializedState);

  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");
    if (token) {
      setIsLoggedIn(true);
    }
    setIsInitialized(true);
  }, []);

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
        <Route path="*" element={<Navigate to={"/chat"} replace />} />
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
