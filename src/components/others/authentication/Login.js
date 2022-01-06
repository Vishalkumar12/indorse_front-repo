import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import InputField from "../FormFields/InputField";
import {
  authenticationSelector,
  clearInitialState,
  postLoginData,
} from "../../../redux/app/slices/Authentication";
import { authentication } from "../../../utilities";
// import AccountPendingMessage from "./AccountPendingMessage";
/* ================================================================== */

// This component is used for Login in our application.

const Login = () => {
  const dispatch = useDispatch();
  const { isSuccess, isError, errorMessage, isFetching, loginSuccessMessage } =
    useSelector(authenticationSelector);
  const history = useHistory();

  const [notificationPopup, setNotificationPopup] = useState(false);
  // This "showLoader" state variable is used to show and hide loader based on Api's response.
  const [showLoader, setShowLoader] = useState(false);

  const {
    handleSubmit,
    control,
    // setValue,
    // setError,
    // getValues,
    // formState: { isSubmitting },
  } = useForm();

  // Get Login Form Data and call api to submit login data.
  const onSubmit = (formValues) => {
    let loginData = {
      email : formValues.emailAddress,
      password: formValues.password
    };

    // Calling Login Api from Authentication Slice
    dispatch(postLoginData(loginData));
  };

  // Set Authentication's Slice state to initial State when our component's render (load) 1st time and when our
  // component's destroy.
  useEffect(() => {
    dispatch(clearInitialState());
    return () => {
      dispatch(clearInitialState());
    };
  }, [dispatch]);

  let data, permissions;

  // Set Complete Login Data in data variable
  if (
    localStorage.getItem("loginData") !== "undefined" &&
    JSON.parse(localStorage.getItem("loginData")) != null
  )
    data = JSON.parse(localStorage.getItem("loginData"));

  // Set List of allowed User's Permissions in permissions variable
  if (
    localStorage.getItem("userPermissions") !== "undefined" &&
    localStorage.getItem("userPermissions") != null
  )
    permissions = JSON.parse(localStorage.getItem("userPermissions"));

  // Operations based on while API is in Fetching, Success or in Error Stage
  useEffect(() => {
    if (isFetching) setShowLoader(true);

    if (isSuccess) {
      setShowLoader(false);
      // Note: data?.User?.status === 1 => 1 is for Approved Users (Approved by Administrator of our application).
      // Note: data?.User?.status === 2 => 2 is for UnApproved Users

      // For Approved Users
      if (data?.User?.status === 1 && permissions?.length > 0) {
        history.push("/dashboard");
        toast.success(loginSuccessMessage);
      }
      //For UnApproved User
      else if (data?.User?.status === 2 && permissions?.length > 0)
        setNotificationPopup(true);
      // For those users whose last step i.e, create account is not completed properly.
      else if (data?.User?.status === 2 && permissions?.length === 0)
        history.push("/createAccount");
      else history.push("/");

      // Set Authentication's Slice state to initial State after getting success in api's.
      dispatch(clearInitialState());
    }
    if (isError) {
      setShowLoader(false);
      toast.error(errorMessage);
      // Set Authentication's Slice state to initial State after getting failure in api's.
      dispatch(clearInitialState());
    }
  }, [
    isSuccess,
    isError,
    dispatch,
    history,
    isFetching,
    errorMessage,
    data,
    loginSuccessMessage,
    permissions,
  ]);

  // Redirect User to Dashboard Page if user is already logged in.
  if (
    //When Any normal user try to login
    (authentication() && data?.User?.status === 1 && permissions?.length > 0) ||
    //When Admin try to login
    data?.hasAllAccess === 1
  )
    return <Redirect to="/dashboard" />;

  /* ================================================================== */

  return (
    <>
      <section className="login-section">
        <div className="container">
          <div className="login-in" id="login-div" style={{ margin: "auto" }}>
            <h1>Indorse</h1>
            <h6 className="text-gray m32">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum semper interdum enim sit amet euismod.
            </h6>

            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <InputField
                control={control}
                label="Email Address"
                name="emailAddress"
                type="text"
                fieldClass="form-control"
                placeholder="Please enter your email address"
                autoComplete="off"
                autoFocus={true}
                rules={{
                  required: {
                    value: true,
                    message: "Email Address is required",
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter valid email address",
                  },
                }}
              />
              <InputField
                control={control}
                label="Password"
                name="password"
                type="password"
                fieldClass="form-control"
                placeholder="Please enter your password"
                autoComplete="off"
                rules={{
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be more than 8 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password cannot be more than 20 characters",
                  },
                }}
              />

              <div className="form-in form-btn">
                <button
                  className={
                    showLoader ? "btn-lg w-100 buttonload" : "btn-lg w-100"
                  }
                  type="submit"
                >
                  {showLoader && <i className="fa fa-refresh fa-spin"></i>}
                  Login
                </button>
              </div>
            </form>

          </div>
          <Link to="/signUp">
            <p className="form-below text-center p-4">
              Don’t have an account? SignUp
            </p>
          </Link>
        </div>
      </section>

      {/* ======================================================================== */}

      {/* <!-- Account Pending Message Popup --> */}

      {/* ======================================================================== */}
    </>
  );
};

export default Login;

// =================================== THE END ===============================
