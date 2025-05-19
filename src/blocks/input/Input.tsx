import TextField from "@mui/material/TextField";

type InputVariant = "standard" | "filled" | "outlined" | undefined;

interface InputProps {
  id: string;
  label: string;
  value?: string | number;
  register?: object;
  isDisabled?: boolean;
  defaultValue?: string;
  variant?: InputVariant;
}

export default function Input({
  value,
  isDisabled,
  register,
  id,
  label,
  defaultValue,
  variant,
}: InputProps) {
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
