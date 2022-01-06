import { Fragment, useEffect, useState } from "react";
import { useController } from "react-hook-form";
import moment from 'moment';
import TextField from "@mui/material/TextField";
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from '@mui/lab/DateTimePicker';

// Component imports - -
import { errorType } from "../../../constants";

//  =================================================== 
function DateTimePickerField({ control, defaultValue, rules, name, label, optional }) {
  // use hooks
  const { field, fieldState: { error } } = useController({ name, control, rules, defaultValue });

  // local states
  const [date, setDate] = useState(field?.value !== '' ? field.value : null);
  // moment(field.value, 'DD-MM-YYYY')

  // lifecycle hook
  useEffect(() => {
    if (date) {
      field.onChange(moment(date).utc().format('DD-MM-YYYY hh:mm a'));
    }
  }, [date, field]);

  //  =================================================== 

  return (
    <>
      <div className={`form-in ${error !== undefined ? "error" : ""}`}>
        {label ? (<label>{label} {optional && <small>{optional}</small>}</label>) : ("")}
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DateTimePicker
            value={date}
            views={["day", "month", "year", "hours", "minutes"]}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => <TextField className={`DatePicker-custom ${error !== undefined ? "error" : ""}`} {...params} />}
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

DateTimePickerField.defaultProps = {
  defaultValue: "",
};

export default DateTimePickerField;

//  ======================== THE END =========================== 
