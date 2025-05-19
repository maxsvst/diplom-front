import Button from "@mui/material/Button";

type OutlinedButtonType = "submit" | "button" | "reset" | undefined;

interface OutlinedButtonProps {
  text: string;
  isDisabled?: boolean;
  type?: OutlinedButtonType;
  handleClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function OutlinedButton({
  isDisabled,
  type,
  handleClick,
  text,
}: OutlinedButtonProps) {
  return (
    <Button
      variant="outlined"
      sx={{
        // margin: "10px 0 0 10px",
        width: "100%",
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
