// components/AuthButton.jsx
import React from "react";

const AuthButton = ({ text, onClick, type = "submit", className = "" }) => {
  return (
    <button type={type} onClick={onClick} className={`${className}`}>
      {text}
    </button>
  );
};

export default AuthButton;
