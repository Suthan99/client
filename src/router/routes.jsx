import React, { lazy } from "react";
import { allRoutesPath } from "./routesPath";

import Home from "../pages/Home";
import RegisterPage from "../pages/auth/register";
import LoginPage from "../pages/auth/login";
import Cart from "../pages/addtocard/addtocard";
import Upcoming from "../pages/Upcoming";
import OrderPage from "../pages/order";

// import HOME from '../pages/HOME';

// add all routes to publicRoute array before login

const publicRoute = [
  {
    path: allRoutesPath.HOME,
    element: <Home />,
  },
  {
    path: allRoutesPath.ADDTOCART,
    element: <Cart />,
  },
  {
    path: allRoutesPath.ORDER,
    element: <OrderPage />,
  },
  {
    path: "*",
    element: <Upcoming />,
  },
];
const routes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <RegisterPage />,
  },
];

export { routes, publicRoute };
