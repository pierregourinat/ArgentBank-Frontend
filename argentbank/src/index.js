import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/Nav.css";
import "./styles/Banner.css";
import "./styles/Footer.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";
import User from "./routes/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/user",
    element: <User />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
