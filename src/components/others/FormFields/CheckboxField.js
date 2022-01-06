import { Fragment } from "react";
import { Controller } from "react-hook-form";

// Component imports - -
import { errorType } from "../../../constants";

function CheckboxField({ control, defaultValue, rules, label, name, value, readOnly, int, onSelect, trueValue, falseValue }) {

  const handleChange = (val, onChange) => {
    if (onSelect)
      onSelect(val);

    if (trueValue !== undefined && falseValue !== undefined) {
      if (int !== undefined)
        return onChange(val ? parseInt(trueValue) : parseInt(falseValue));
      else
        return onChange(val ? trueValue : falseValue);
    }
    else
      return onChange(val);
  };

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
              <div className="checkbox">
                <input
                  {...field}
                  type="checkbox"
                  value={value}
                  checked={field.value !== "" && field.value === trueValue}
                  readOnly={readOnly !== undefined ? true : false}
                  onChange={(e) => handleChange(e.target.checked, field.onChange)}
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

CheckboxField.defaultProps = {
  defaultValue: "",
};

export default CheckboxField;
