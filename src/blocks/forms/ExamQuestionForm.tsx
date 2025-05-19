// import { Box, TextField } from "@mui/material";
// import Input from "../input/Input";
// import OutlinedButton from "../outlined-button/OutlinedButton";

// interface ExamQuestionFormProps {
//   register: any;
//   errors: any;
//   onSubmit: (data: any) => void;
//   isDisabled: boolean;
// }

// export const ExamQuestionForm = ({
//   register,
//   errors,
//   onSubmit,
//   isDisabled,
// }: ExamQuestionFormProps) => {
//   return (
//     <Box
//       component="form"
//       onSubmit={onSubmit}
//       sx={{
//         "& > :not(style)": {
//           m: 1,
//           display: "flex",
//           flexDirection: "column",
//           marginTop: "15px",
//         },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <TextField
//         {...register("question")}
//         id="question"
//         label="Вопросы к экзамену"
//         isDisabled={isDisabled}
//         helperText={!!errors.question && String(errors.question?.message)}
//       />

//       <OutlinedButton
//         isDisabled={isDisabled}
//         type="submit"
//         text="Добавить вопрос к экзамену"
//       />
//     </Box>
//   );
// };

import { useState } from "react";

import Box from "@mui/material/Box";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { ExamQuestion } from "../../types";
import OutlinedButton from "../outlined-button/OutlinedButton";

interface ExamQuestionFormProps {
  examQuestions: Partial<ExamQuestion>[];
  register: any;
  errors: any;
  onSubmit: (data: any) => void;
  isDisabled: boolean;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

export const ExamQuestionForm = ({
  register,
  examQuestions,
  errors,
  onSubmit,
  isDisabled,
}: ExamQuestionFormProps) => {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <Accordion
          style={{ width: "100%" }}
          defaultExpanded={examQuestions.length ? true : false}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="div" variant="h6">
              Вопросы к экзамену
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {examQuestions.length ? (
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Название вопроса к экзамену</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {examQuestions.map(
                      ({ examQuestionId, examQuestionName }) => (
                        <TableRow
                          key={examQuestionId}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{examQuestionName}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <span>Вопросы к экзамену не добавлены</span>
            )}
          </AccordionDetails>
        </Accordion>
        <Button
          variant="contained"
          onClick={() => setisModalOpen(true)}
          sx={{ height: "60px", width: "200px" }}
        >
          Добавить вопрос
        </Button>
      </div>
      <Modal open={isModalOpen} onClose={() => setisModalOpen(false)}>
        <div className="modal-content">
          <Box
            component="form"
            onSubmit={onSubmit}
            sx={style}
            noValidate
            autoComplete="off"
          >
            <TextField
              {...register("examQuestionName")}
              id="examQuestionName"
              label="Вопрос к экзамену"
              isDisabled={isDisabled}
              helperText={
                !!errors.examQuestionName &&
                String(errors.examQuestionName?.message)
              }
            />

            <OutlinedButton
              isDisabled={isDisabled}
              type="submit"
              text="Добавить вопрос"
            />
          </Box>
        </div>
      </Modal>
    </div>
  );
};
