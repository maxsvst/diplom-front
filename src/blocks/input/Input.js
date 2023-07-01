import React from "react";

import TextField from "@mui/material/TextField";

export default function Input({
  value,
  isDisabled,
  register,
  id,
  label,
  defaultValue,
  variant,
}) {
  return (
    <TextField
      value={value}
      required
      disabled={isDisabled}
      {...register}
      id={id}
      label={label}
      defaultValue={defaultValue}
      variant={variant}
    />
  );
}
