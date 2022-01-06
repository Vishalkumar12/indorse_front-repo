import { Redirect } from "react-router-dom";
import { load } from "../utilities";
//  ===================================================

export const ROUTES = {
  ROOT: {
    path: "/",
    exact: true,
    render: () => <Redirect to="/login" />,
  },
  LOGIN: {
    path: "/login",
    exact: true,
    component: load("others/authentication/Login"),
  },
  LOGOUT: {
    path: "/logout",
    component: load("others/authentication/Logout"),
  },
  SIGNUP: {
    path: "/signUp",
    component: load("others/authentication/SignUp/SignUp"),
  },
  DASHBOARD: {
    path: "/dashboard",
    component: load("others/dashboard/Dashboard"),
  },
  // _________________________________________________________________

  PAGE_NOT_FOUND: {
    component: load("others/pageNotFound/PageNotFound"),
  },
};
// ================================ THE END ======================================
