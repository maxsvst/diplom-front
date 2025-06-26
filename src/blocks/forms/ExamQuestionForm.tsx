import { useState } from "react";

import Box from "@mui/material/Box";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
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

import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { ExamQuestion, Topic } from "../../types";
import OutlinedButton from "../outlined-button/OutlinedButton";

interface ExamQuestionFormProps {
  examQuestions: Partial<ExamQuestion>[];
  topics: Partial<Topic>[];
  register: any;
  errors: any;
  onSubmit: (data: any) => void;
  onDelete: (examQuestionId: any) => void;
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
    display: "flex",
    flexDirection: "column",
    marginTop: "15px",
  },
};

export const ExamQuestionForm = ({
  register,
  examQuestions,
  topics,
  errors,
  onSubmit,
  onDelete,
  isDisabled,
}: ExamQuestionFormProps) => {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <Accordion
          style={{ width: "100%" }}
          // defaultExpanded={examQuestions.length ? true : false}
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
                        <b>Тема</b>
                      </TableCell>
                      <TableCell colSpan={2}>
                        <b>Название вопроса к экзамену</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topics.map((topic, index) =>
                      <TableRow
                        key={topic.topicId}
                      >
                        <TableCell sx={{
                          borderWidth: 0,
                          borderBottomWidth: 1,
                          borderRightWidth: 1,
                          borderRightColor: 'rgba(224, 224, 224, 1)',
                          borderStyle: 'solid',
                          ...(index === topics.length - 1 ? { borderBottom: 'none' } : {})
                        }}>
                          <b>{topic.topicName}</b>
                        </TableCell>
                        {examQuestions.map(
                          ({ examQuestionId, examQuestionName, topicId }, index) => topic.topicId === topicId && (
                            <TableRow
                              key={examQuestionId}
                              sx={{
                                display: 'flex',
                                width: '100%',
                              }}
                            >
                              <TableCell sx={{
                                flex: '0 0 auto',
                                ...(index === examQuestions.length - 1 ? { borderBottom: 'none' } : {})
                              }}>
                                <IconButton color="error" onClick={() => onDelete(examQuestionId)} >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell  >
                              <TableCell sx={{
                                flex: '1',
                                display: 'flex',
                                alignItems: 'center',
                                ...(index === examQuestions.length - 1 ? { borderBottom: 'none' } : {})
                              }}>
                                {examQuestionName}
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableRow>
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
            onSubmit={(e) => {
              !errors.examQuestionName && setisModalOpen(false)
              onSubmit(e)
            }}
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
