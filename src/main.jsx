import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root/Root';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Statistics from './components/Statistics/Statistics';
import GadgetDetail from './components/GadgetDetail/GadgetDetail';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/gadgets/:product_id",
        element: <GadgetDetail />,
        loader: () => fetch("/gadgetsData.json"),
      },
      {
        path: "/statistics",
        element: <Statistics />,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: () => fetch("/profilesData.json"),
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: () => fetch("/gadgetsData.json"),
      },
      {
        path: "/Login",
        element: <Login />,
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
