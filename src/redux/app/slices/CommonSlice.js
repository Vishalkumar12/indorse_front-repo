import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiService } from "../../../services/apiService";
// ==========================================================================

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  certificates: [],
  attachmentIds: null,
  getUserId: null,
  states: JSON.parse(window.localStorage.getItem("states")) || [],
  dropDownList: null,
};
// ==========================================================================

// This method is used to fetch certificates list.
export const fetchCertificatesList = createAsyncThunk(
  "common/listCertificates",
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.get("admin/listCertificates");
      if (response.status === 200) return response?.data?.responseData?.data;
      else return thunkAPI.rejectWithValue(response?.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
// ==========================================================================

// This method is used to upload attachments.
export const uploadAttachments = createAsyncThunk(
  "common/getAttachments",
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.post("attachment/upload", payload);
      if (response.status === 200) return response?.data?.responseData;
      else return thunkAPI.rejectWithValue(response?.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
// ==========================================================================

// This method is used to fetch Dropdown values.
export const getDropDownList = createAsyncThunk(
  "common/getDropDowns",
  async (payload, thunkAPI) => {
    try {
      const response = await apiService.get("user/listDropDowns", {
        params: payload,
      });
      if (response.status === 200) return response?.data?.responseData;
      else return thunkAPI.rejectWithValue(response?.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

// ==========================================================================
// This method is used to fetch States from the API.
export function getStates(props) {
  return apiService({
    method: "GET",
    params: props,
    url: `user/getStates`,
  });
}

// ==========================================================================
// This method is used to fetch Cities from the API.
export function getCities(props) {
  return apiService({
    method: "GET",
    params: props,
    url: `user/getCities`,
  });
}

// ==========================================================================
export function getGeneralSettings(props) {
  return apiService({
    method: 'GET',
    params: props,
    url: `admin/getMinWageSettings`
  })
};

// ==========================================================================
export function updateGeneralSettings(props) {
  return apiService({
    method: 'PATCH',
    data: props,
    url: `admin/updateMinWageSettings`
  })
};

export const CommonSlice = createSlice({
  name: "common",
  initialState,

  reducers: {
    updateUserId: (state, { payload }) => {
      state.getUserId = payload;
    },
    setStatesArray: (state) => {
      const states = JSON.parse(window.localStorage.getItem("states")) || [];
      state.states = states;
    },
  },
  extraReducers: {
    // ==========================================================================

    // Fetch Certificates API Stages - PENDING, FULFILLED & REJECTED

    // When an API is in Pending Stage
    [fetchCertificatesList.pending]: (state) => {
      state.isFetching = true;
    },

    // When an API is in Fulfilled Stage
    [fetchCertificatesList.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.certificates = payload;
    },

    // When an API is in Rejected Stage
    [fetchCertificatesList.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        payload && payload.message ? payload.message : "Got Error";
    },
    // ==========================================================================
    // Upload Attachment API Stages - PENDING, FULFILLED & REJECTED

    // When an API is in Pending Stage
    [uploadAttachments.pending]: (state) => {
      state.isFetching = true;
    },

    // When an API is in Fulfilled Stage
    [uploadAttachments.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.attachmentIds = payload;
    },

    // When an API is in Rejected Stage
    [uploadAttachments.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        payload && payload.message ? payload.message : "Got Error";
    },
    //  ===================================================

    // Fetch Dropdown list API Stages - PENDING, FULFILLED & REJECTED

    // When an API is in Pending Stage
    [getDropDownList.pending]: (state) => {
      state.isFetching = true;
    },
    // When an API is in Fulfilled Stage
    [getDropDownList.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.dropDownList = payload;
    },
    // When an API is in Rejected Stage
    [getDropDownList.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage =
        payload && payload.message ? payload.message : "Got Error";
    },
    // ==========================================================================
  },
});
// ==========================================================================

/* This code is used to export our reducers actions */
export const { updateUserId, setStatesArray } = CommonSlice.actions;

/* This code is used to export this (current) slice as a name of commonSelector  */
export const commonSelector = (state) => state.common;

// ============================== Finish ===============================
