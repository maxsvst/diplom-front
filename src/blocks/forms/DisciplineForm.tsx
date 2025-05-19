import { Box, TextField } from "@mui/material";
import OutlinedButton from "../outlined-button/OutlinedButton";

interface DisciplineFormProps {
  register: any;
  errors: any;
  onSubmit: (data: any) => void;
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

export const DisciplineForm = ({
  register,
  errors,
  onSubmit,
}: DisciplineFormProps) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={style}
      noValidate
      autoComplete="off"
    >
      <TextField
        {...register("fullName")}
        id="fullName"
        label="Полное название дисциплины"
        helperText={!!errors.fullName && String(errors.fullName?.message)}
      />

      <TextField
        {...register("shortName")}
        id="shortName"
        label="Сокращённое название дисциплины"
        helperText={!!errors.shortName && String(errors.shortName?.message)}
      />

      <TextField
        {...register("cathedra")}
        id="cathedra"
        label="Кафедра"
        helperText={!!errors.cathedra && String(errors.cathedra?.message)}
      />

      <TextField
        {...register("studyField")}
        id="studyField"
        label="Направление подготовки"
        helperText={!!errors.studyField && String(errors.studyField?.message)}
      />

      <TextField
        {...register("code")}
        id="code"
        label="Шифр дисциплины"
        helperText={!!errors.code && String(errors.code?.message)}
      />
      <OutlinedButton type="submit" text="Добавить дисциплину" />
    </Box>
  );
};
