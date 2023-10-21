// eslint-disable-next-line import/named
import { NavigateProps } from "react-router-dom";

import { DialogsPage } from "../components/pages/DialogsPage";
import React from "react";

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
