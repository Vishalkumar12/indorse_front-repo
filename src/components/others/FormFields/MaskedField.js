import { Fragment } from "react";
import { useController } from "react-hook-form";
import InputMask from "react-input-mask-3.0";

// Component imports - -
import { errorType } from "../../../constants";

//  =================================================== 
function MaskedField({ control, defaultValue, rules, label, name, type, optional, mask, readOnly, placeholder, maskPlaceholder }) {
  // use hooks
  const { field, fieldState: { error }, } = useController({ name, control, rules, defaultValue });

  // handle input onChange
  const handleOnChange = (e) => {
    let value = e.target.value;
    const unmask = value.replace(/[^\d]/g, '');
    field.onChange(unmask);
  };

  let value = typeof field.value !== 'string' ? field.value.toString() : field.value

  //  =================================================== 

  return (
    <>
      <div className={`form-in ${error !== undefined ? "error" : ""}`}>
        {label ? (<label>{label} {optional && <small>{optional}</small>}</label>) : ("")}

        <InputMask type={type} mask={mask} maskPlaceholder={maskPlaceholder} placeholder={placeholder} value={value} onChange={handleOnChange} />

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
};

MaskedField.defaultProps = {
  defaultValue: '',
  type: 'text',
  mask: '',
  maskPlaceholder: null
};


export default MaskedField;

//  ==================== THE END =============================== 
