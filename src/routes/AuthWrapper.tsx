import React, { FC, ReactNode } from "react";
import { Navigate, Route } from "react-router-dom";
import { Spin } from "antd";
import { useRecoilState } from "recoil";
import { isInitializedState, isLoggedInState } from "@/store/authState";

type TAuthWrapper = {
  children: ReactNode;
};

export const AuthWrapper: FC<TAuthWrapper> = ({ children }) => {
  // const [isLoggedIn] = useRecoilState(isLoggedInState);
  const isLoggedIn = Boolean(localStorage.getItem("IS_LOGGED_IN"));
  console.log(isLoggedIn, "isLoggedIN");

  const [isInitialized] = useRecoilState(isInitializedState);

  if (!isInitialized) return <Spin />;

  return <>{isLoggedIn ? children : <Navigate to="/login" replace />}</>;
};
