import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { AuthenticationSlice } from "../app/slices/Authentication";


//  ===================================================

/* Combine All the reducers inside root reducer using combineReducer(). */
const rootReducer = combineReducers({
  authentication: AuthenticationSlice.reducer
});

//  ===================================================

/* Created (Configure) the redux store and added dependencies like reducer, middleware, etc. */
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
  // logger

  // Restrict Redux Devtool in Production
  devTools: process.env.NODE_ENV !== "production",
});
// ================================= FINISH =====================================
