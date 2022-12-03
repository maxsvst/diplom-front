import React from "react";
import "../../css/components.css";

function Input({ register, placeholder }) {
  return (
      <div className="input-login__wrapper">
        <input
          {...register}
          className="input-login__form-login"
          type="text"
          placeholder={placeholder}
        />
      </div>
  );
}

export default Input;
