import React from "react";
import { Icon } from "react-icons-kit";
import TextField from "@mui/material/TextField";

export default function PasswordInput({
  register,
  type,
  id,
  label,
  icon,
  toggleHandler,
}) {
  return (
    <div className="">
      <TextField
        {...register}
        type={type}
        id={id}
        label={label}
        variant="outlined"
        className=""
      />
      <Icon icon={icon} size={25} onClick={toggleHandler} className="" />
    </div>
  );
}
