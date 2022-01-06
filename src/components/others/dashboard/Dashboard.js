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
 

  let data;
  // Set Complete Login Data in "data" variable
  if (
    localStorage.getItem("loginData") !== "undefined" &&
    JSON.parse(localStorage.getItem("loginData")) != null
  )
    data = JSON.parse(localStorage.getItem("loginData"));

  return ( data?.User?.status === 1) ? (
    <>
      
      <main>
        <Header > </Header>
        {/* This is the Header Component of our application.  */}
        <section className="section-welcome">
          <h1 className="h1-welcome"> Welcome To Indorse</h1>  
        </section>
      </main>
    </>
  ) : (
    <Redirect to="/login" /> // Redirect to Login Page
  );
};

export default Dashboard;

// ========================== THE END ==================================
