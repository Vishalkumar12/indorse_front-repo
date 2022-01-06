import { Fragment } from "react";
import { useController } from "react-hook-form";
// import moment from 'moment';

// ------------------- Component imports ---------------------
import { errorType } from "../../../constants";

//  =================================================== 

function DateTimeField({
  control, defaultValue, format, rules, name, label, type, optional,
}) {
  // use hooks
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue });

  //  =================================================== 

  return (
    <>
      <div className={`form-in ${error !== undefined ? "error" : ""}`}>
        {type !== "hidden" &&
          (label ? (
            <label>
              {label} {optional && <small>{optional}</small>}
            </label>
          ) : (
            ""
          ))}
        <input
          {...field}
          value={field?.value}
          type={type}
          onChange={(e) => field?.onChange(e.target.value)}
        />
        <i className="input-icon calendar-icon"></i>
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

DateTimeField.defaultProps = {
  defaultValue: "",
  // type: 'datetime-lo÷cal',
  type: "date",
  format: "DD-MM-YYYY",
};


export default DateTimeField;

//  ======================= THE END ============================ 
