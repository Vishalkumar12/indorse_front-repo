import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiService } from "../../../services/apiService";

//  ===================================================

/* This is the initial state (data) of our Slice */
const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  isAccountCreated: false,
  ethnicOrigins: [],
  signUpSuccessMessage: "",
  loginSuccessMessage: "",
  accountCreateSuccessMessage: "",
  createAccountErrorsList: null,
};

//  ===================================================

/* This method is used to call Login Api -- Code Start */
export const postLoginData = createAsyncThunk(
  "authentication/login",
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.post("user/login", payload);
      if (response && response.status === 200) {
        /* Set Authentication Token in Local Storage */
        localStorage.setItem("jwtToken", response?.data?.responseData?.token);
        /* Set User Permissions in Local Storage */
        localStorage.setItem(
          "userPermissions",
          JSON.stringify(response?.data?.responseData?.Permissions)
        );
        /* Set Has All Access data in Local Storage */
        localStorage.setItem(
          "hasAllAccess",
          JSON.stringify(response?.data?.responseData?.hasAllAccess)
        );
        /* Set Complete Login API Response in Local Storage */
        localStorage.setItem(
          "loginData",
          JSON.stringify(response?.data?.responseData)
        );
        /* Remove Signup data and User Id from Local Storage if available */
        if (
          localStorage.getItem("signUpData") !== "undefined" &&
          localStorage.getItem("signUpData") != null
        )
          localStorage.removeItem("signUpData");

        if (
          localStorage.getItem("userId") !== "undefined" &&
          localStorage.getItem("userId") !== null
        )
          localStorage.removeItem("userId");

        return response?.data;
      } else return thunkAPI.rejectWithValue(response?.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
/* This method is used to call Login Api -- Code Finish */

//  ===================================================

/* This method is used to call Signup Api -- Code Start */
export const postSignupData = createAsyncThunk(
  "authentication/signUp",
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.post("user/signUp", payload);
      if (response.status === 200) {
        /* Set Authentication Token in Local Storage */
        localStorage.setItem("jwtToken", response?.data?.responseData?.token);

        /* Set User Permissions in Local Storage */
        localStorage.setItem(
          "userPermissions",
          JSON.stringify(response?.data?.responseData?.Permissions)
        );

        localStorage.setItem(
          "userId",
          JSON.stringify(response?.data?.responseData?.userId)
        );
        /* Set Has All Access data in Local Storage */
        localStorage.setItem(
          "hasAllAccess",
          JSON.stringify(response?.data?.responseData?.hasAllAccess)
        );
        /* Set Complete Login API Response in Local Storage */
        localStorage.setItem(
          "signUpData",
          JSON.stringify(response?.data?.responseData)
        );
        /* Remove Login data from Local Storage if available */
        if (
          localStorage.getItem("loginData") !== "undefined" &&
          localStorage.getItem("loginData") != null
        )
          localStorage.removeItem("loginData");

        return response?.data;
      } else return thunkAPI.rejectWithValue(response?.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
/* This method is used to call Signup Api -- Code Finish */

//  ===================================================

/* This method is used to call Create Account Api -- Code Start */
export const postCreateAccountData = createAsyncThunk(
  "authentication/signUp",
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.post("user/createAccount", payload);
      if (response.status === 201) return response?.data;
      else return thunkAPI.rejectWithValue(response?.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
/* This method is used to call Create Account Api -- Code Finish */

//  ===================================================

/* This method is used to call Fetch Ethnic Origin Api -- Code Start */
export const fetchEthnicOrigins = createAsyncThunk(
  "authentication/fetchEthnicOrigins",
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.get("user/listDropDowns", {
        params: {
          fieldName: "ETHNIC_ORIGIN",
        },
      });
      if (response.status === 200)
        return response.data && response.data.responseData
          ? response.data.responseData
          : response.data;
      else return thunkAPI.rejectWithValue(response?.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
/* This method is used to call Fetch Ethnic Origin Api -- Code Finish */

// ==================================================================================
export const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState,

  reducers: {
    /* This method is used to clear initial state based on our requirement. 
    For example after getting response from an api we can call this method to 
    set our redux slice state in previous form. */
    clearInitialState: (state) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
      state.signUpSuccessMessage = "";
      state.loginSuccessMessage = "";
      state.accountCreateSuccessMessage = "";
    },
    updateAccountCreatedState: (state) => {
      state.isAccountCreated = false;
    },
  },
  //  ===================================================

  extraReducers: {
    /* This code is used to handle Login API's 3 situations that is Pending, Success and Error -- Start */
    // When an API is in Pending Stage
    [postLoginData.pending]: (state) => {
      state.isFetching = true;
    },
    // When an API is in Fulfilled Stage
    [postLoginData.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.loginSuccessMessage = payload?.message
        ? payload?.message
        : "Login Successful";
    },
    // When an API is in Rejected Stage
    [postLoginData.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        payload && payload.message
          ? payload.message
          : "Login Api Failed. Please try again later.";
    },
    /* This code is used to handle Login API's 3 situations that is Pending, Success and Error -- Finish */

    //  ===================================================

    /* This code is used to handle Signup API's 3 situations that is Pending, Success and Error -- Start */
    // When an API is in Pending Stage
    [postSignupData.pending]: (state) => {
      state.isFetching = true;
    },
    // When an API is in Fulfilled Stage
    [postSignupData.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.signUpSuccessMessage = payload?.message
        ? payload?.message
        : "Signup successfully completed";
    },
    // When an API is in Rejected Stage
    [postSignupData.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        payload && payload.message
          ? payload.message
          : "Signup Api Failed. Please try again later.";
    },
    /* This code is used to handle Signup API's 3 situations that is Pending, Success and Error -- Finish */

    //  ===================================================

    /* This code is used to handle Create Account API's 3 situations that is Pending, Success and Error -- Start */
    // When an API is in Pending Stage
    [postCreateAccountData.pending]: (state) => {
      state.isFetching = true;
    },
    // When an API is in Fulfilled Stage
    [postCreateAccountData.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isAccountCreated = true;
      state.accountCreateSuccessMessage = payload?.message
        ? payload?.message
        : "New Account created successfully. We will inform you once your account is verified by admin.";
    },
    // When an API is in Rejected Stage
    [postCreateAccountData.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        payload && payload.message
          ? payload.message
          : "Create Account Api Failed. Please try again later.";
      state.createAccountErrorsList = payload?.errors;
    },
    /* This code is used to handle Create Account API' 3 situations that is Pending, Success and Error -- Finish */

    //  ===================================================

    // When an API is in Pending Stage
    [fetchEthnicOrigins.pending]: (state) => {
      state.isFetching = true;
    },
    // When an API is in Fulfilled Stage
    [fetchEthnicOrigins.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.ethnicOrigins = payload.data;
    },
    // When an API is in Rejected Stage
    [fetchEthnicOrigins.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        payload && payload.message
          ? payload.message
          : "Fetch Ethnic Origins Api Failed. Please try again later.";
    },
  },
});
// ==================================================================================

/* This code is used to export our reducers actions */
export const { clearInitialState, updateAccountCreatedState } =
  AuthenticationSlice.actions;

/* This code is used to export this (current) slice as a name of authenticationSelector  */
export const authenticationSelector = (state) => state.authentication;

// =============================== Finish ====================================
