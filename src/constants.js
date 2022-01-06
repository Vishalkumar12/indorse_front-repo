// This is the constants file. Here, we stored all the constants data.

// ----------------- TRUCKS ON TRACK - API's BASE URLs ------------------

export const API_BASE_URL = "http://34.125.117.193:3001/"; //DEVELOPMENT
//export const API_BASE_URL = ""; //PRODUCTION

// ---------------------- React Hook Form Field validations error type -- start ---------------------
export const errorType = [
  "manual",
  "required",
  "pattern",
  "validate",
  "minLength",
  "maxLength",
  "max",
  "min",
];

// ---------------------- React Hook Form Field validations error type -- finish ---------------------

export const ListDateFormat = "D MMM YYYY";

// ---------------------- File pond ---------------------
export const PER_FILE_SIZE = "5MB";
export const AUDIO_FILE_SIZE = "100MB";
// ---------------------- File pond ---------------------

// Country codes data
export const countryNameCodesData = [
  {
    value: "+1",
    label: "+1 US",
  },
];

// Timezones data
export const timeZones = [
  {
    value: "-05:00",
    label: "Eastern standard time",
  },
  {
    value: "+05:30",
    label: "Indian standard time",
  },
  {
    value: "-06:00",
    label: "Central standard time",
  },
  {
    value: "-07:00",
    label: "Mountain standard time",
  },
  {
    value: "-08:00",
    label: "Pacific standard time",
  },
];

// UOM data
export const uomData = [
  {
    label: "PER_HOUR",
    value: 0,
  },
  {
    label: "PER_LOAD",
    value: 1,
  },
  {
    label: "PER_TON",
    value: 2,
  },
];

export const uomData_ = {
  0: "PER_HOUR",
  1: "PER_LOAD",
  2: "PER_TON",
};

// Dispatch Status List
export const dispatchStatus = {
  0: "Pending",
  1: "Accepted",
  2: "Rejected",
};

// Dispatch Status Colors
export const dispatchStatusColors = {
  0: "yellow",
  1: "green",
  2: "red",
};

// Vehicle Types
export const vehicleType = {
  TRUCK: 1,
  TRAILER: 2,
};

// Available User's Roles in Trucks on Track Project
export const availableRoles = [
  { label: "Company", value: 2 },
  { label: "Broker", value: 3 },
  { label: "Trucker", value: 4 },
];

// Gender List
export const GENDER = {
  1: "Male",
  2: "Female",
};

// Assigned Dispatch Status List
export const ASSIGNED_DISPATCH_STATUS = {
  0: "Pending",
  1: "Accepted",
  2: "Declined",
  3: "Canceled",
};

// Payroll Types List
export const PAYROLL_TYPE = [
  { label: "Yard to yard", value: 1 },
  { label: "Project site", value: 2 },
];

export const PAYROLL_TYPE_ = {
  1: "Yard to yard",
  2: "Project site",
};


// Events data list without modifications.
export const originalEventsData = {
  NOT_STARTED: 0,
  CLOCKED_IN: 5,
  DRIVER_LEFT_FOR_PROJECT_SITE: 10,
  ARRIVED_PROJECT_SITE: 15,
  LOADING_STARTED: 20,
  LOADING_COMPLETED: 25,
  LAST_TRIP_MARKED: 30,
  LEFT_PROJECT_SITE: 35,
  ENTERED_FACILITY: 40,
  UNLOADING_STARTED: 45,
  UNLOADING_COMPLETED: 50,
  CUSTOMER_SIGN_CAPTURED: 55,
  DRIVER_SIGN_CAPTURED: 60,
  DRIVER_LEFT_FOR_YARD: 65,
  YARD_REACHED: 70,
  FINISHED: 75,
  BREAKDOWN: 80,
};
/* ============= Events data list with modifications. ============= */
export const modifiedEventsData = {};
for (let data in originalEventsData)
  modifiedEventsData[data.replaceAll("_", " ")] = originalEventsData[data];
/* ================================================================== */

// Account Pending Component's Important Messages
export const impMsg = "Important Message";
export const accountPendingMsg =
  " Your Account verification status is currently in pending stage.";
export const accountPendingMsg2nd =
  "We are working on this. Please try again later.";

// Create Account "Upload Atleast one certificate" message
export const certificateUploadValidationMsg =
  "Note: From each certificate category atleast one certificate selection is mandatory to submit this form.";

// ================================ THE END ===============================
