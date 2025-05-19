import "./passwordInput.css";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface PasswordInputProps {
  register: object;
  id: string;
  label: string;
  errorMessage: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

export default function PasswordInput({
  register,
  id,
  label,
  errorMessage,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        {...register}
        id={id}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      {!!errorMessage && (
        <FormHelperText error>{String(errorMessage)}</FormHelperText>
      )}
    </FormControl>
    // <TextField
    //   variant="outlined"
    //   sx={{ position: "relative" }}
    //   {...register}
    //   type={type}
    //   id={id}
    //   label={label}
    // />
  );
}
