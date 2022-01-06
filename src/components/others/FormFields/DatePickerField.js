import { Fragment, useEffect, useState } from "react";
import { useController } from "react-hook-form";
import moment from "moment";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { errorType } from "../../../constants";

//  ===================================================

function DatePickerField({
  control, defaultValue, rules, name, label, optional, disabled,
}) {
  // use hooks
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue });

  // local states
  const [date, setDate] = useState(field?.value !== "" ? field.value : null);
  // moment(field.value, 'DD-MM-YYYY')

  // lifecycle hook
  useEffect(() => {
    if (date) {
      field.onChange(moment(date).utc().format("DD-MM-YYYY"));
    }
  }, [date, field]);

  //  ===================================================

  return (
    <>
      <div className={`form-in ${error !== undefined ? "error" : ""}`}>
        {label ? (
          <label>
            {label} {optional && <small>{optional}</small>}
          </label>
        ) : (
          ""
        )}
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            value={date}
            views={["day", "month", "year"]}
            onChange={(newValue) => setDate(newValue)}
            disabled={disabled}
            renderInput={(params) => (
              <TextField
                className={`DatePicker-custom ${error !== undefined ? "error" : ""
                  }`}
                {...params}
              />
            )}
          />
        </LocalizationProvider>
        {errorType?.map((type) => {
          return (
            <Fragment key={type}>
              {error?.type === type && error?.message !== "" ? (
                <span className="error-msg">{error?.message}</span>
              ) : null}
            </Fragment>
          );
        })}
      </div>
    </>
  );
}

DatePickerField.defaultProps = {
  defaultValue: "",
};

export default DatePickerField;

//  ===================== THE END ==============================
