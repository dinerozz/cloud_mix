import { DialogsPage } from "@/components/pages/DialogsPage";
import React from "react";
import { SignUp } from "@/components/pages/SignUp";
import { Login } from "@/components/pages/Login";

export const privateRoutes = [
  {
    path: "/chat",
    element: <DialogsPage />,
  },
  {
    path: "/chat/:id",
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
