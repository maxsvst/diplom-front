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

import { PracticalClass } from "../../types";
import OutlinedButton from "../outlined-button/OutlinedButton";

interface PracticalClassFormProps {
  practicalClasses: Partial<PracticalClass>[];
  register: any;
  errors: any;
  onSubmit: (data: any) => void;
  onDelete: (practicalClassId: any) => void;
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

export const PracticalClassForm = ({
  register,
  practicalClasses,
  errors,
  onSubmit,
  onDelete,
  isDisabled,
}: PracticalClassFormProps) => {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <Accordion
          style={{ width: "100%" }}
        // defaultExpanded={practicalClasses.length ? true : false}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="div" variant="h6">
              Практические занятия
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {practicalClasses.length ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>
                        <b>Название практического занятия </b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {practicalClasses.map(
                      ({ practicalClassId, practicalClassName }) => (
                        <TableRow
                          key={practicalClassId}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>
                            <IconButton color="error" onClick={() => onDelete(practicalClassId)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell>{practicalClassName}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <span>Практические занятия не добавлены</span>
            )}
          </AccordionDetails>
        </Accordion>
        <Button
          variant="contained"
          onClick={() => setisModalOpen(true)}
          sx={{ height: "60px", width: "200px" }}
        >
          Добавить ПЗ
        </Button>
      </div>
      <Modal open={isModalOpen} onClose={() => setisModalOpen(false)}>
        <div className="modal-content">
          <Box
            component="form"
            onSubmit={(e) => {
              !errors.practicalClassName && setisModalOpen(false)
              onSubmit(e)
            }}
            sx={style}
            noValidate
            autoComplete="off"
          >
            <TextField
              {...register("practicalClassName")}
              id="practicalClassName"
              label="Практическое занятие"
              isDisabled={isDisabled}
              helperText={
                !!errors.practicalClassName &&
                String(errors.practicalClassName?.message)
              }
            />

            <OutlinedButton
              isDisabled={isDisabled}
              type="submit"
              text="Добавить ПЗ"
            />
          </Box>
        </div>
      </Modal>
    </div>
  );
};
