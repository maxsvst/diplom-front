import React from "react";
import { Icon } from "react-icons-kit";
import TextField from "@mui/material/TextField";

import "./passwordInput.css";

export default function PasswordInput({
  register,
  type,
  id,
  label,
  icon,
  toggleHandler,
}) {
  return (
    <TextField
      variant="outlined"
      sx={{ position: "relative" }}
      {...register}
      type={type}
      id={id}
      label={label}
    />
  );
}
