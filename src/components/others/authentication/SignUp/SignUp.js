import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  authenticationSelector,
  clearInitialState,
  postSignupData,
} from "../../../../redux/app/slices/Authentication";
import InputField from "../../FormFields/InputField";
import "./SignUp.css";
import { API_BASE_URL } from "../../../../constants";
import { apiService } from "../../../../services/apiService";
/* ================================================================== */

// This component is used for New User Registration i.e, Signup.

const SignUp = () => {
  const dispatch = useDispatch();
  const {
    isSuccess,
    isError,
    errorMessage,
    isFetching,
    signUpSuccessMessage,
    accountCreateSuccessMessage,
  } = useSelector(authenticationSelector);
  const history = useHistory();

  const [showVerifyCodePopup, setShowVerifyCodePopup] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [showResendOtp, setShowResendOtp] = useState(false);
  // This "showLoader" state variable is used to show and hide loader based on Api's response.
  const [showLoader, setShowLoader] = useState(false);

  const {
    handleSubmit,
    control, 
    setValue,
    // setError,
    getValues,
    clearErrors,
    // formState: { isSubmitting },
  } = useForm();

  // CSS of Resend Verification code link
  const resendCodeStyle = {
    cursor: "pointer",
    textAlign: "center",
    color: "blue",
    display: "inline-block",
    margin: "0 auto",
  };

  // This method is used to close Verify OTP popup.
  const handleClose = () => {
    setShowVerifyCodePopup(false);
    setRemainingTime(null);
    setShowResendOtp(false);
    setValue("verificationCode", null);
    clearErrors("verificationCode");
  };

  // This method is used to open Verify OTP popup.
  const handleShow = useCallback(() => {
    setShowVerifyCodePopup(true);
    setValue("verificationCode", null);
  }, [setValue]);

  // This method is used to get Login Form Data and call api to submit login data.
  const onSubmit = (formValues) => {
    let signUpData = {
      // username: formValues.username, /* Optional Parameter */
      email: formValues.emailAddress,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
      mobile : formValues.mobileNumber,
      name : formValues.name,
      countryCode : '+91'
    };
    // Call Signup Api from Authentication Slice
    dispatch(postSignupData(signUpData));
  };

  // Set Authentication's Slice state to initial State when our component's render (load) 1st time and when our
  // component's destroy.
  useEffect(() => {
    dispatch(clearInitialState());
    localStorage.clear();
    return () => {
      dispatch(clearInitialState());
    };
  }, [dispatch]);

  // Perform Operations based on API's fetching, success or in error stage.
  useEffect(() => {
    if (isFetching) setShowLoader(true);

    if (isSuccess) {
      setShowLoader(false);

      // toast.success(signUpSuccessMessage);
      // console.log("signUpSuccessMessage:: ", signUpSuccessMessage);

      toast.success(accountCreateSuccessMessage);
      console.log("accountCreateSuccessMessage::", accountCreateSuccessMessage);

      // Set Authentication's Slice state to initial State after getting success in api's.
      dispatch(clearInitialState());
      handleShow();
      setRemainingTime(120); //Set 30 seconds in OTP timer state variable.
    }
    if (isError) {
      setShowLoader(false);
      toast.error(errorMessage);
    }
    // Set Authentication's Slice state to initial State after getting failure in api's.
    dispatch(clearInitialState());
  }, [
    isSuccess,
    isError,
    dispatch,
    history,
    handleShow,
    isFetching,
    signUpSuccessMessage,
    accountCreateSuccessMessage,
    errorMessage,
  ]);

  // This code is used to handle 30 seconds Otp Timer
  useEffect(() => {
    const timer =
      remainingTime > 0 &&
      setInterval(() => setRemainingTime(remainingTime - 1), 1000);
    if (remainingTime === 0) setShowResendOtp(true);

    return () => {
      clearInterval(timer);
    };
  }, [remainingTime]);

  // This method is used to call Verification Code API
  const verifyOtpApiCall = async (verificationCode) => {
    if (verificationCode.toString().length === 4) {
      const verificationToken =
        localStorage.getItem("jwtToken") !== "undefined" &&
        localStorage.getItem("jwtToken") !== null
          ? localStorage.getItem("jwtToken")
          : null;
      const userId = localStorage.getItem("userId")
      try {
        const response = await apiService.post(
          `${API_BASE_URL}user/verifyAccount`,
          {
            userId : userId,
            otp: verificationCode
          }
        );
        if (response.status === 200) {
          toast.success(response?.data?.message);

          /* Set Has All Access value in Local Storage */
          localStorage.setItem(
            "hasAllAccess",
            JSON.stringify(response?.data?.responseData?.hasAllAccess)
          );
          // Redirect to Create Account Page (Final Step)
          history.push("/login");

          // Set user id in local storage
          localStorage.setItem(
            "userId",
            JSON.stringify(response?.data?.responseData?.id)
          );
        } else toast.error(response?.data?.message);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    } else {
      toast.error("Verification code should contain 4 digits only.");
    }
  };

  // This method is used to call resend verification code API
  const resendVerificationCode = async () => {
    setShowResendOtp(false);
    const verificationToken =
      localStorage.getItem("jwtToken") !== "undefined" &&
      localStorage.getItem("jwtToken") !== null
        ? localStorage.getItem("jwtToken")
        : null;
    try {
      const response = await apiService.post(`${API_BASE_URL}user/resendCode`, {
        token: verificationToken,
      });

      if (response.status === 200) {
        toast.success(response?.data?.message);
        setRemainingTime(30);
      } else toast.error(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // This method is used to fetch verification code value and hit verification code api.
  const submitVerificationCode = (formValues) =>
    verifyOtpApiCall(formValues.verificationCode);

  /* ================================================================== */

  return (
    <>
      <section className="login-section signup-section">
        <div className="container">
          <div className="signup-div mx-auto" id="signup-div">
            <h1>Indorse</h1>
            <h6 className="text-gray m32">
              To Create an account with us, please fill in the form.
            </h6>

            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                control={control}
                autoComplete="off"
                label="Name"
                name="name"
                type="text"
                placeholder="Please enter your name"
                fieldClass="form-control"
                autoFocus={true}
                rules={{
                  required: {
                    value: true,
                    message: "Name is required",
                  }
                }}
              />

              <InputField
                control={control}
                autoComplete="off"
                label="Mobile Number"
                name="mobileNumber"
                type="text"
                placeholder="Please enter your Mobile Number"
                fieldClass="form-control"
                autoFocus={true}
                rules={{
                  required: {
                    value: true,
                    message: "Mobile Number is required",
                  }
                }}
              />

              <InputField
                control={control}
                autoComplete="off"
                label="Email Address"
                name="emailAddress"
                type="text"
                placeholder="Please enter your email address"
                fieldClass="form-control"
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
                autoComplete="off"
                label="Password"
                name="password"
                type="password"
                fieldClass="form-control"
                placeholder="Please enter your password"
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
              <InputField
                control={control}
                autoComplete="off"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Please confirm your password"
                fieldClass="form-control"
                rules={{
                  required: {
                    value: true,
                    message: "Confirm Password is required",
                  },
                  validate: (value) =>
                    value === getValues().password ||
                    "Both the password should be same.",
                }}
              />
              <div className="form-in form-btn">
                <button
                  className={
                    showLoader ? "btn-lg w-100 buttonload" : "btn-lg w-100"
                  }
                  type="submit"
                >
                  {showLoader && <i className="fa fa-refresh fa-spin"></i>}{" "}
                  Create Account
                </button>
              </div>
            </form>
          </div>
          <Link to="/login">
            <p className="form-below text-center">
              Already have an account? Login
            </p>
          </Link>
        </div>
      </section>
      {/* ======================================================================== */}
      {/* <!-- Verification Code Popup --> */}

      {showVerifyCodePopup && (
        <>
          <div id="myModal" className="main">
            <div className="main-content">
              <h3 className="popup-title">SignUp OTP Verification </h3>
              <br />
              <form
                className="popup-form-content"
                onSubmit={handleSubmit(submitVerificationCode)}
              >
                <InputField
                  control={control}
                  label="Verification code"
                  name="verificationCode"
                  type="text"
                  fieldClass="form-control"
                  placeholder="Please enter verification code here"
                  autoComplete="off"
                  maxLength="4"
                  rules={{
                    required: {
                      value: true,
                      message: "Verification code is required",
                    },
                    pattern: {
                      value: /^[0-9]{4}$/,
                      message: "Please enter valid verification code",
                    },
                    minLength: {
                      value: 4,
                      message:
                        "Verification code should not be greater or less than 4 digits.",
                    },
                    maxLength: {
                      value: 4,
                      message:
                        "Verification code should not be greater or less than 4 digits.",
                    },
                  }}
                />
                <div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ display: "inline-block" }}
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary mx-2"
                    style={{ display: "inline-block" }}
                  >
                    Submit
                  </button>
                </div>
                <br />
                <p
                  style={resendCodeStyle}
                  disabled
                  onClick={resendVerificationCode}
                >
                  <button
                    disabled={!showResendOtp}
                    className={
                      !showResendOtp
                        ? "resendCodeDisabled"
                        : "resendCodeEnabled"
                    }
                  >
                    Resend Verification Code
                  </button>
                </p>

                {/* OTP TIMER HANDLING  */}
                {remainingTime > 10 && (
                  <small className="otpTimer">00:{remainingTime} sec.</small>
                )}
                {remainingTime === 10 && (
                  <small className="otpTimer">00:{remainingTime} sec.</small>
                )}

                {remainingTime < 10 &&
                remainingTime > 0 &&
                remainingTime != null ? (
                  <small className="otpTimer">00:0{remainingTime} sec.</small>
                ) : null}
              </form>
            </div>
          </div>
        </>
      )}

      {/* ======================================================================== */}
    </>
  );
};

export default SignUp;

// =================================== THE END ================================
