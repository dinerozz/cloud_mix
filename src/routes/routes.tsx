import { NavigateProps } from "react-router-dom";

import { DialogsPage } from "@/components/pages/DialogsPage";
import React from "react";
import { SignUp } from "@/components/pages/SignUp";
import { Login } from "@/components/pages/Login";

interface Routes extends NavigateProps {
  path: string;
  element: JSX.Element & NavigateProps;
}

export const privateRoutes = [
  {
    path: "/chat",
    element: <DialogsPage />,
  },
];

export const publicRoutes = [
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
