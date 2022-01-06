import { lazy } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
//  ===================================================

// This method is used  to load component based on different routes.
export function load(component) {
  return lazy(() => import(`./components/${component}`));
}

// This method is used to clear Local Storage data.
export const clearSession = () => {
  localStorage.clear();
  // Redirect on root (Home Page)
  window.location = "/";
};

// This method is used to check user authentication i.e, user is logged in or not
export const authentication = () => {
  if (
    localStorage.getItem("jwtToken") !== "undefined" &&
    localStorage.getItem("jwtToken") !== null
  )
    return true;
  else return false;
};

// Number format for float values
export const NormalizeNumber = (value) => {
  let val = typeof value === "number" ? value.toString() : value;
  let val2 =
    val?.indexOf(".") >= 0
      ? val?.substr(0, val?.indexOf("."))?.substr(0, 4) +
        val?.substr(val?.indexOf("."), 3)
      : val?.substr(0, 4);
  let val3 = parseFloat(val2);
  return isNaN(val3) ? "" : val3;
};

// This method is used to check various access control levels and return true or false.
export const getAclChecks = (permissionType) => {
  const Permissions = JSON.parse(localStorage.getItem("userPermissions"));
  var result = false;
  if (Permissions?.includes("admin")) result = true;
  else result = Permissions?.includes(permissionType);

  return result;
};

// This method is used to remove empty fields.
export const removeEmptyFields = (data) => {
  Object.keys(data).forEach((key) => {
    if (
      data[key] === "" ||
      data[key] == null ||
      data[key]?.length === 0 ||
      data[key] === false
    )
      delete data[key];
  });
  return data;
};

// This method is used for download the documents.
export const download = async (url, exe, name) => {
  fetch(url, {
    method: "GET",
    headers: {},
  })
    .then((response) => {
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${name}${exe}`); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// This method is used for showing the Confirm Alert popup
export const confirmAction = ({
  yes,
  no,
  message,
  yesLabel,
  noLabel,
  hide,
  heading,
}) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <>
          <div className="modal modal-content custom-modal">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              {hide ? null : (
                <h5 className="con-head">
                  {heading ? heading : "Confirmation"}
                </h5>
              )}
              <p className="con-desc">{message}</p>
              <div className="btn-grp">
                <button
                  className="btn-white"
                  onClick={
                    no !== undefined
                      ? () => {
                          onClose();
                          no();
                        }
                      : () => {
                          onClose();
                        }
                  }
                >
                  {noLabel ? noLabel : "No"}
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    yes();
                    onClose();
                  }}
                >
                  {yesLabel ? yesLabel : "Yes"}
                </button>
              </div>
            </div>
          </div>
        </>
      );
    },
  });
};

// This method is used to format and hide the phone numbers.
export const formatHidePhoneNumber = (val) => {
  let x = val ? val?.match(/(\d{0,3})(\d{0,3})(\d{0,4})/) : "";
  return "(XXX) XXX" + (x?.[3] ? "-" + x?.[3] : "");
};

// This method is used for format phone numbers.
export const formatPhoneNumber = (val) => {
  let x = val ? val?.match(/(\d{0,3})(\d{0,3})(\d{0,4})/) : "";
  return "(" + x?.[1] + ") " + x?.[2] + (x?.[3] ? "-" + x?.[3] : "");
};

// This method is used for hide the email address
export const hideEmail = function (email) {
  return email.replace(/(.{2})(.*)(?=@)/, function (gp1, gp2, gp3) {
    for (let i = 0; i < gp3.length; i++) {
      gp2 += "*";
    }
    return gp2;
  });
};

// This method is used for currency formats
export const currencyFormat = (val) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return formatter.format(val);
};

// This method is used to convert seconds to time string
export const convertSecondsToTimeString = (timeInSconds) => {
  const sec = parseInt(timeInSconds, 10);
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - hours * 3600) / 60);
  let seconds = sec - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return hours !== "00"
    ? hours + ":" + minutes + ":" + seconds
    : minutes + ":" + seconds;
};

// This method is used to fetch Month name (January, February, etc.) based on month number
export const getMonthName = (monthNumber) => {
  let monthName = null; // Hold full month's Name value
  let shortMonthName = null; // Hold short month's Name value

  switch (monthNumber) {
    case "1":
      monthName = "January";
      shortMonthName = "JAN";
      break;

    case "2":
      monthName = "February";
      shortMonthName = "FEB";
      break;

    case "3":
      monthName = "March";
      shortMonthName = "MAR";
      break;

    case "4":
      monthName = "April";
      shortMonthName = "APR";

      break;
    case "5":
      monthName = "May";
      shortMonthName = "MAY";
      break;

    case "6":
      monthName = "June";
      shortMonthName = "JUN";
      break;

    case "7":
      monthName = "July";
      shortMonthName = "JUL";

      break;
    case "8":
      monthName = "August";
      shortMonthName = "AUG";
      break;

    case "9":
      monthName = "September";
      shortMonthName = "SEP";
      break;

    case "10":
      monthName = "October";
      shortMonthName = "OCT";
      break;

    case "11":
      monthName = "November";
      shortMonthName = "NOV";
      break;

    case "12":
      monthName = "December";
      shortMonthName = "DEC";
      break;

    default:
      monthName = null;
      shortMonthName = null;
  }
  return [monthName, shortMonthName]; // Return Full & Short month's name
};

// This method is used to find the day's suffix.
// Example, return "st" for 1 (1st), return "nd" for 2 (2nd), return "rd" for 3 (3rd), return "th" for 12 (12th) and so on..
export const findDaySuffix = (value) => {
  let suffixValue = null;

  // 12 "th" (12th) is an exceptional case.
  // 12 is not pronounce as 12nd but it is pronounce as 12th.

  if (value.toString() === "12") suffixValue = "th";
  // Handle other values
  else {
    if (value.toString().charAt(value.length - 1) === "1") suffixValue = "st";
    else if (value.toString().charAt(value.length - 1) === "2")
      suffixValue = "nd";
    else if (value.toString().charAt(value.length - 1) === "3")
      suffixValue = "rd";
    else suffixValue = "th";
  }
  return suffixValue;
};
// =================================== FINISH ==================================
