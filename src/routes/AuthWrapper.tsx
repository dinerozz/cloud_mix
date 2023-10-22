import React, { FC, ReactNode, useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from "@/context/authContext";
import { Spin } from "antd";

type TAuthWrapper = {
  children: ReactNode;
};

export const AuthWrapper: FC<TAuthWrapper> = ({ children }) => {
  const { isLoggedIn, isInitialized } = useContext(AuthContext);

  if (!isInitialized) return <Spin />;

  return <>{isLoggedIn ? children : <Navigate to="/login" replace />}</>;
};
