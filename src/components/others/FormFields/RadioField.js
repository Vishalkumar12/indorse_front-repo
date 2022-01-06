import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { errorType } from "../../../constants";
//  =================================================== 

function RadioField({ control, defaultValue, rules, label, name, value, readOnly, int }) {
  return (
    <>
      <Controller
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <div className={`form-in ${error !== undefined ? "error" : ""}`}>
              <div className="radio">
                <input
                  {...field}
                  type="radio"
                  value={value}
                  checked={field.value !== "" && field.value === value}
                  readOnly={readOnly !== undefined ? true : false}
                  onChange={(e) =>
                    int !== undefined
                      ? field?.onChange(parseInt(e.target.value))
                      : field?.onChange(e.target.value)
                  }
                />
                <label>{label}</label>
              </div>
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
          );
        }}
      />
    </>
  );
}

RadioField.defaultProps = {
  defaultValue: "",
};

export default RadioField;

//  ====================== THE END ============================= 
