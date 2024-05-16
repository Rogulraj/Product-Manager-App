// packages
import { lazy } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

// pages
const Home = lazy(() => import("@pages/Home/Home"));
const AddProduct = lazy(() => import("@pages/AddProduct/AddProduct"));
const Analytics = lazy(() => import("@pages/Analytics/Analytics"));

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
      path: "/analytics",
      element: <Analytics />,
    },
    {
      path: "*",
      element: <Navigate to={"/"} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
