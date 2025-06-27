import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Login from "./pages/Login";
import QRList from "./pages/QRList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <QRList />,
  },
  {
    path: "/login/",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

reportWebVitals();
