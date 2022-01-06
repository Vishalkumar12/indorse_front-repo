import { Fragment } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { errorType } from "../../../constants";

//  =================================================== 

function SelectField({ control, rules, label, name, onSelect, defaultValue, options, multi,
  optional, readOnly, placeholder, int }) {

  const handleChange = (val, onChange) => {
    if (onSelect) onSelect(val);

    if (multi) return onChange(val.map((c) => c?.value));
    else return onChange(val.value);
  };

  const handleValue = (value) => {
    if (value !== '') {
      if (multi) return options.filter((c) => value?.includes?.(c.value));
      else return options.find((c) => c.value === value);
    } else
      return ''
  };

  //  =================================================== 

  return (
    <>
      <Controller
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        name={name}
        render={({
          field: { onChange, value, ref },
          fieldState: { error },
        }) => {
          return (
            <div className={`form-in ${error !== undefined ? 'error' : ''}`}>
              {(label ? (
                <label>
                  {label} {optional && <small>{optional}</small>}
                </label>
              ) : (""))}
              <Select
                inputRef={ref}
                isDisabled={readOnly}
                value={handleValue(
                  int !== undefined
                    ? parseInt(value)
                      ? parseInt(value)
                      : value
                    : value
                )}
                onChange={(val) => handleChange(val, onChange)}
                options={options}
                placeholder={placeholder ? placeholder : label}
                isMulti={multi}
                className={`react-select-style ${error !== undefined ? 'error' : ''}`}
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

SelectField.defaultProps = {
  defaultValue: "",
};

export default SelectField;

//  ======================== THE END =========================== 
