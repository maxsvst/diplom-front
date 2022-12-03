import React from "react";
import { Icon } from "react-icons-kit";
import "../../css/components.css";

function InputPassword({
  type,
  register,
  icon,
  toggleHandler,
  placeholder
}) {
  return (
      <div className="input-password__wrapper">
        <input
          {...register}
          className="input-password__form-password"
          type={type}
          placeholder={placeholder}
        />
        <Icon
          icon={icon}
          size={25}
          onClick={toggleHandler}
          className="input-password__form-icon"
        />
      </div>
  );
}

export default InputPassword;
