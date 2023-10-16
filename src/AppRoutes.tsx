import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {publicRoutes} from "./routes/routes";


export const AppRoutes = () => {


  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
