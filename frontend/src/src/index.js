import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

import "./index.css";
import Login from "./pages/Login";
import QRList from "./pages/QRList";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider><QRList /></UserProvider>,
  },
  {
    path: "/login/",
    element: <Login />,
  },
  {
    path: "/register/",
    element: <Register />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);

reportWebVitals();
