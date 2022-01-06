import { Suspense, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ROUTES } from "../../../routes/routes";
import Header from "../header/Header";
import { Redirect } from "react-router";
import { getStates, setStatesArray } from "../../../redux/app/slices/CommonSlice";
import { Route } from "react-router-dom";

// ===================================================

// This is the Dashboard Component of our Application. From this component
// we redirect user to particular route from which he/she requested.

const Dashboard = () => {
  const dispatch = useDispatch();

  // ===================================================

  let permissions, data;
  // Set Complete Login Data in "data" variable
  if (
    localStorage.getItem("loginData") !== "undefined" &&
    JSON.parse(localStorage.getItem("loginData")) != null
  )
    data = JSON.parse(localStorage.getItem("loginData"));

  // Set List of allowed User's Permissions in "permissions" variable
  if (
    localStorage.getItem("userPermissions") !== "undefined" &&
    localStorage.getItem("userPermissions") != null
  )
    permissions = JSON.parse(localStorage.getItem("userPermissions"));

  // ===================================================

  // This method is used to fetch States List from the API.
  const fetchStates = useCallback(async () => {
    try {
      const resp = await getStates();
      const states = resp?.data?.responseData?.data?.map?.((item) => {
        return { label: item?.name, value: item?.name };
      });
      // Store List of States in Local Storage.
      window.localStorage.setItem("states", JSON.stringify(states));
      dispatch(setStatesArray(states));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    const states = window.localStorage.getItem("states") || null;
    if (states === null) fetchStates();
  }, [fetchStates]);

  // ===================================================

  return (permissions?.length > 0 && data?.User?.status === 1) ||
    data?.hasAllAccess === 1 ? (
    <>
      <main>
        {/* This is the Header Component of our application.  */}
        <Header />

        {/* =================================================== */}
        <section className="right-side">
          <Suspense fallback={<div className="initial-loader" />}>
            <Route {...ROUTES.CHANGE_PASSWORD} />

          </Suspense>
        </section>

        {/* =================================================== */}
      </main>
    </>
  ) : (
    <Redirect to="/login" /> // Redirect to Login Page
  );
};

export default Dashboard;

// ========================== THE END ==================================
