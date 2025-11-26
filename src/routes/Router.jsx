import { createBrowserRouter } from "react-router";
import HomePageLayout from "../layout/HomePageLayout";
import Home from "../pages/Home";
import AllToys from "../pages/AllToys";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ToyDetails from "../pages/ToyDetails";
import AuthLayout from "../layout/AuthLayout";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import Error from "../pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePageLayout,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/all-toys",
        element: <AllToys></AllToys>,
      },

      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/toy-details/:id",
        element: (
          <PrivateRoute>
            <ToyDetails></ToyDetails>
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },

  {
    path: "/*",
    element: <Error>Error404</Error>,
  },
]);

export default router;
