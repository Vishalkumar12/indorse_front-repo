import axios from "axios";
import { clearSession } from "../utilities";
import { API_BASE_URL } from "../constants";
import { toast } from "react-toastify";
//  ===================================================

/* Create an Instance of Axios */
export const apiService = axios.create({
  baseURL: API_BASE_URL,
});

// ------------------------ Axios interceptor request -------------------------
apiService.interceptors.request.use(
  function (config) {
    let accessToken = null;

    // Fetching JWT Token from the local storage.
    if (window.localStorage.getItem("jwtToken"))
      accessToken = window.localStorage.getItem("jwtToken");

    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    // Send JWT token in every request if access token value found.
    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;

    config.params = {
      ...config.params, // Here, we send params in URL as a Query Params.
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// ------------------------ Axios interceptor response -------------------------
apiService.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      typeof error?.response !== "undefined" &&
      typeof error?.response?.status !== "undefined"
    ) {
      switch (error.response.status) {
        // Unauthorized User - HTTP STATUS 401 - Error Handling
        case 401:
          error?.response?.data?.message
            ? toast.error(error?.response?.data?.message)
            : toast.error("Sorry, Something went wrong, please try again");
          clearSession();
          break;

        // 400 and 403 messages are handled on particular component.
        // case 400:
        // case 403:

        // Server Side Issues Handling
        case 500:
          error?.response?.data?.message
            ? toast.error(error?.response?.data?.message)
            : toast.error("Sorry, Something went wrong, please try again");
          break;
        default:
        //   toast.error("Sorry, Something went wrong, please try again");
      }
    }

    return Promise.reject(error);
  }
);
// ============================ THE END ==================================
