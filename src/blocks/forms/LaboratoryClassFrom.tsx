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

import { LaboratoryClass } from "../../types";
import OutlinedButton from "../outlined-button/OutlinedButton";

interface LaboratoryClassFormProps {
  laboratoryClasses: Partial<LaboratoryClass>[];
  register: any;
  errors: any;
  onSubmit: (data: any) => void;
  onDelete: (laboratoryClassId: any) => void;
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

export const LaboratoryClassForm = ({
  register,
  laboratoryClasses,
  errors,
  onSubmit,
  onDelete,
  isDisabled,
}: LaboratoryClassFormProps) => {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <Accordion
          style={{ width: "100%" }}
        // defaultExpanded={laboratoryClasses.length ? true : false}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="div" variant="h6">
              Лабораторное занятие
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {laboratoryClasses.length ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>
                        <b>Название лабораторного занятия</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {laboratoryClasses &&
                      laboratoryClasses.map(
                        ({ laboratoryClassId, laboratoryClassName }) => (
                          <TableRow
                            key={laboratoryClassId}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>
                              <IconButton color="error" onClick={() => onDelete(laboratoryClassId)}>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell>{laboratoryClassName}</TableCell>
                          </TableRow>
                        )
                      )}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <span>Лабораторные занятия не добавлены</span>
            )}
          </AccordionDetails>
        </Accordion>
        <Button
          variant="contained"
          onClick={() => setisModalOpen(true)}
          sx={{ height: "60px", width: "200px" }}
        >
          Добавить ЛЗ
        </Button>
      </div>
      <Modal open={isModalOpen} onClose={() => setisModalOpen(false)}>
        <div className="modal-content">
          <Box
            component="form"
            onSubmit={(e) => {
              !errors.laboratoryClassName && setisModalOpen(false)
              onSubmit(e)
            }}
            sx={style}
            noValidate
            autoComplete="off"
          >
            <TextField
              {...register("laboratoryClassName")}
              id="laboratoryClassName"
              label="Лабораторное занятие"
              isDisabled={isDisabled}
              helperText={
                !!errors.laboratoryClassName &&
                String(errors.laboratoryClassName?.message)
              }
            />

            <OutlinedButton
              isDisabled={isDisabled}
              type="submit"
              text="Добавить ЛЗ"
            />
          </Box>
        </div>
      </Modal>
    </div>
  );
};
