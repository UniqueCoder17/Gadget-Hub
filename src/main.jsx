import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Root from "./components/Root/Root";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Statistics from "./components/Statistics/Statistics";
import GadgetDetail from "./components/GadgetDetail/GadgetDetail";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  // Login
  {
    path: "/login",
    element: <Login />,
  },

  // Redirect "/" -> "/login"
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  // Website
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        loader: () => fetch("/gadgetsData.json"),
      },
      {
        path: "statistics",
        element: (
          <ProtectedRoute>
            <Statistics />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        loader: () => fetch("/profilesData.json"),
      },
      {
        path: "gadgets/:product_id",
        element: (
          <ProtectedRoute>
            <GadgetDetail />
          </ProtectedRoute>
        ),
        loader: () => fetch("/gadgetsData.json"),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);