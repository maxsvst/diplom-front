import React from "react";

import TextField from "@mui/material/TextField";

export default function Input({
  item,
  value,
  register,
  id,
  label,
  defaultValue,
  variant,
  isDisabled,
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
