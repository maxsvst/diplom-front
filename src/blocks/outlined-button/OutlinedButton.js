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
      sx={{
        margin: "10px 0 0 10px",
        width: "40%",
        fontFamily: "Montserrat",
        fontSize: "18px",
      }}
      disabled={isDisabled}
      type={type}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
}
