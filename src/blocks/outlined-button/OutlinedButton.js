import React from "react";
import Button from "@mui/material/Button";

export default function OutlinedButton({
  isDisabled,
  type,
  handleClick,
  text,
}) {
  return (
    <Button
      variant="outlined"
      disabled={isDisabled}
      type={type}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
}
