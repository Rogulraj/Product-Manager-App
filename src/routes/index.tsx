// packages
import { lazy } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

// constants
import { routePaths } from "@constants/routePaths";
import AddProduct from "@pages/AddProduct/AddProduct";

// pages
const Home = lazy(() => import("@pages/Home/Home"));

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/add-product",
      element: <AddProduct />,
    },
    {
      path: "*",
      element: <Navigate to={"/"} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
