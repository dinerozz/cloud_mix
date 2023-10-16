// eslint-disable-next-line import/named
import { NavigateProps } from 'react-router-dom';

import { Home } from '../components/pages/Home';
import React from "react";

interface Routes extends NavigateProps {
  path: string;
  element: JSX.Element & NavigateProps;
}

export const publicRoutes = [
  {
    path: '/',
    element: <Home />,
  },
];



