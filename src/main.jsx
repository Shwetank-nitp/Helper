import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Provider, useSelector } from "react-redux";
import store from "./Store/store.js";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Search from "./Component/Home/Search.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "./theme.js";
import SnackBarComponent from "./Component/SnackBar/SnackBarComponent.jsx";
import { SnackbarContextProvider } from "./hooks/useSnackBar.jsx";
import AllPosts from "./Component/Posts/AllPost.jsx";
import Login from "./Component/Auth/Login/Login.jsx";
import SignIn from "./Component/Auth/SignIn/SignIn.jsx";
import Profile from "./Component/Profile/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Search />,
      },
      {
        path: "/requests",
        element: <AllPosts />,
      },
      {
        path: "/donations",
        element: <AllPosts />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/",
    element: <Outlet />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signin", element: <SignIn /> },
    ],
  },
]);

function HealthCareApplication() {
  const { mode } = useSelector((state) => state.ThemeSlice);
  return (
    <ThemeProvider theme={appTheme(mode)}>
      <CssBaseline />
      <SnackbarContextProvider>
        <SnackBarComponent vertical="top" horizontal="center" />
        <RouterProvider router={router} />
      </SnackbarContextProvider>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HealthCareApplication />
    </Provider>
  </React.StrictMode>
);
