import { Fragment, useEffect, useState } from "react";
// import { useController } from "react-hook-form";
import moment from 'moment';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from '@mui/lab/DateRangePicker';
// import { errorType } from "../../../constants";

//  =================================================== 

function DateRangePickerField({ startDateName, endDateName, setValue, label, data }) {

  // local states
  const [dateValue, setDateValue] = useState([
    data?.[startDateName] ? moment(data?.[startDateName], 'DD-MM-YYYY') : null,
    data?.[endDateName] ? moment(data?.[endDateName], 'DD-MM-YYYY') : null]);

  // reset date
  // const resetDate = () => {
  //   setDateValue([null, null]);
  // }

  // lifecycle hook
  useEffect(() => {
    if (dateValue?.[0]) {
      setValue(startDateName, moment(dateValue?.[0]).format('DD-MM-YYYY'));
      setValue(endDateName, moment(dateValue?.[1]).format('DD-MM-YYYY'));
    };
  }, [dateValue, startDateName, endDateName, setValue]);

  useEffect(() => {
    if (!data?.[startDateName])
      setDateValue([null, null]);
  }, [data, startDateName])

  //  =================================================== 

  return (
    <>
      <div className={`form-in`}>
        {label ? (<label>{label}</label>) : ("")}
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DateRangePicker
            value={dateValue}
            onChange={(newValue) => setDateValue(newValue)}
            renderInput={(startProps, endProps) => (
              <Fragment>
                <input ref={startProps.inputRef} {...startProps.inputProps} />
                <span style={{ margin: 5 }}> to </span>
                <input ref={endProps.inputRef} {...endProps.inputProps} />
              </Fragment>
            )}
          />
        </LocalizationProvider>
        {/* <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            value={date}
            views={["day", "month", "year"]}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => <TextField className={`DatePicker-custom ${error !== undefined ? "error" : ""}`} {...params} />}
          />
        </LocalizationProvider> */}
        {/* {errorType?.map((type) => {
          return (
            <Fragment key={type}>
              {error?.type === type && error?.message !== "" ? (
                <span className="error-msg">{error?.message}</span>
              ) : null}
            </Fragment>
          );
        })} */}
      </div>
    </>
  );
}

// DateRangePickerField.defaultProps = {
//   defaultValue: "",
// };


export default DateRangePickerField;

//  ======================= THE END ============================ 
