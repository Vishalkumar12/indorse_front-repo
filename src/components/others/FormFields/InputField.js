import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { errorType } from "../../../constants";
//  =================================================== 

function InputField({ control, normalize, defaultValue, rules, label, name, type, optional, readOnly, placeholder, onInputChange, autoComplete, maxLength, autoFocus, onBlur }) {

  const handleOnChange = (e, onChange) => {
    if (normalize !== undefined) {
      onChange(normalize(e.target.value));
      if (onInputChange !== undefined) {
        onInputChange(normalize(e.target.value));
      }
    } else {
      onChange(
        type === "number"
          ? parseInt(e.target.value)
          : e.target.value?.replace(/^\s*\s*$/, "")
      );
      if (onInputChange !== undefined) {
        onInputChange(
          type === "number"
            ? parseInt(e.target.value)
            : e.target.value?.replace(/^\s*\s*$/, "")
        );
      }
    }
  };
  //  =================================================== 

  return (
    <>
      <Controller
        control={control}
        rules={rules}
        defaultValue={defaultValue !== undefined ? defaultValue : ""}
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
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
                placeholder={placeholder ? placeholder : label}
                readOnly={readOnly !== undefined ? true : false}
                type={type}
                autoComplete={autoComplete}
                maxLength={maxLength}
                autoFocus={autoFocus}
                onChange={(e) => handleOnChange(e, field.onChange)}
                onBlur={() => onBlur !== undefined ? onBlur(field.value) : null}
              />
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

export default InputField;

//  ===================== THE END ============================== 
