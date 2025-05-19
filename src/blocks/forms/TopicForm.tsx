import { Box, TextField } from "@mui/material";
import OutlinedButton from "../outlined-button/OutlinedButton";

interface TopicFormProps {
  register: any;
  errors: any;
  onSubmit: (data: any) => void;
  isDisabled: boolean;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
  "& > :not(style)": {
    m: 1,
    display: "flex",
    flexDirection: "column",
    marginTop: "15px",
  },
};

export const TopicForm = ({
  register,
  errors,
  onSubmit,
  isDisabled,
}: TopicFormProps) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={style}
      noValidate
      autoComplete="off"
    >
      <TextField
        {...register("topicName")}
        id="topicName"
        label="Тема"
        isDisabled={isDisabled}
        helperText={!!errors.topicName && String(errors.topicName?.message)}
      />

      <OutlinedButton
        isDisabled={isDisabled}
        type="submit"
        text="Добавить тему"
      />
    </Box>
  );
};
