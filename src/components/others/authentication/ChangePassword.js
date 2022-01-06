import InputField from "../FormFields/InputField";
import { apiService } from "../../../services/apiService";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

/* ================================================================== */

// This component is used to change user's existing login password.

const ChangePassword = () => {
  const history = useHistory();

  const {
    handleSubmit,
    control,
    getValues,
    // setValue,
    // setError,
    // clearErrors,
    // formState: { isSubmitting },
  } = useForm();

  // This method is used to fetch change password form data and send it to the api calling method.
  const onSubmit = ({ oldPassword, newPassword, confirmNewPassword }) => {
    let requestData = {
      oldPassword,
      newPassword,
      confirmNewPassword,
    };
    // Change Password API calling
    changePasswordApiCall(requestData);
  };

  // This method is used to call Change Password API.
  const changePasswordApiCall = async ({
    oldPassword,
    newPassword,
    confirmNewPassword,
  }) => {
    try {
      const response = await apiService.post("user/changePassword", {
        oldPassword,
        newPassword,
        confirmNewPassword,
      });
      if (response.status === 200) {
        toast.success(response?.data?.message);
        localStorage.clear();
        history.replace("/login");
      } else toast.error(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  /* ================================================================== */

  return (
    <>
      <div style={{ padding: "20px 0 0 50px", width: "55%" }}>
        <h1 style={{ fontSize: "23px" }}>Change your Password </h1>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <InputField
            control={control}
            label="Old Password"
            name="oldPassword"
            type="password"
            fieldClass="form-control"
            placeholder="Please enter your old password"
            autoComplete="off"
            autoFocus={true}
            rules={{
              required: {
                value: true,
                message: "Old Password is required",
              },
              minLength: {
                value: 8,
                message: "Old Password must be more than 8 characters",
              },
              maxLength: {
                value: 20,
                message: "Old Password cannot be more than 20 characters",
              },
            }}
          />
          <InputField
            control={control}
            label="New Password"
            name="newPassword"
            type="password"
            fieldClass="form-control"
            placeholder="Please enter your new password"
            autoComplete="off"
            rules={{
              required: {
                value: true,
                message: "New Password is required",
              },
              minLength: {
                value: 8,
                message: "New Password must be more than 8 characters",
              },
              maxLength: {
                value: 20,
                message: "New Password cannot be more than 20 characters",
              },
            }}
          />
          <InputField
            control={control}
            label="Confirm New Password"
            name="confirmNewPassword"
            type="password"
            fieldClass="form-control"
            placeholder="Please confirm your new password"
            autoComplete="off"
            rules={{
              required: {
                value: true,
                message: "Confirm New Password is required",
              },
              validate: (value) =>
                value === getValues().newPassword ||
                "Both the password should be same.",
            }}
          />

          <div>
            <button
              type="button"
              className="btn btn-primary"
              style={{ display: "inline-block" }}
              onClick={() => history.goBack()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary mx-2"
              style={{ display: "inline-block" }}
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;

// ===================================== THE END ===================================
