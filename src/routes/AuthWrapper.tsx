import React, { FC, ReactNode } from "react";
import { Navigate, Route } from "react-router-dom";
import { Spin } from "antd";
import { useRecoilState } from "recoil";
import { isInitializedState } from "@/store/authState";

type TAuthWrapper = {
  children: ReactNode;
};

export const AuthWrapper: FC<TAuthWrapper> = ({ children }) => {
  const isLoggedIn = Boolean(localStorage.getItem("IS_LOGGED_IN"));

  const [isInitialized] = useRecoilState(isInitializedState);

  if (!isInitialized) return <Spin />;

  return <>{isLoggedIn ? children : <Navigate to="/login" replace />}</>;
};
