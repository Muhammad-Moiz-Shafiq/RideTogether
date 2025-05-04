import React from "react";

const FormInput = ({
  label,
  type = "text",
  id,
  name,
  value,
  onChange,
  required = false,
  error = "",
  halfWidth = false,
}) => {
  return (
    <div className={`input-group ${halfWidth ? "half-width" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
      {error && (
        <div
          className="error-message"
          style={{ display: error ? "block" : "none" }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput;
