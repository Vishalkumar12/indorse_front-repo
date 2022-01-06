import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { errorType } from "../../../constants";

//  =================================================== 

function TextareaField({ control, rules, label, name, type, rows, optional, defaultValue, readOnly, style, placeholder }) {
  return (
    <>
      <Controller
        control={control}
        rules={rules}
        defaultValue={defaultValue !== undefined ? defaultValue : ''}
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <div className={`form-in ${error !== undefined ? 'error' : ''}`}>
              {(label ? <label>{label} {optional && <small>{(optional)}</small>}</label> : '')}
              <textarea {...field}
                style={style !== undefined ? style : {}}
                placeholder={placeholder ? placeholder : label}
                readOnly={readOnly}
                type={type}
                rows={rows}
              />
              {errorType?.map(type => {
                return <Fragment key={type}>{error?.type === type && error?.message !== "" ? <span className="error-msg">{error?.message}</span> : null}</Fragment>
              })}
            </div>
          );
        }}
      />
    </>
  )
};

TextareaField.defaultProps = {
  rows: '1',
};


export default TextareaField;

//  ====================== THE END ============================= 
