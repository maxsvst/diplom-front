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

import { Lection } from "../../types";
import OutlinedButton from "../outlined-button/OutlinedButton";

interface LectionFormProps {
  lections: Partial<Lection>[];
  register: any;
  errors: any;
  onSubmit: (data: any) => void;
  onDelete: (lectionId: any) => void;
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

export const LectionForm = ({
  register,
  lections,
  errors,
  onSubmit,
  onDelete,
  isDisabled,
}: LectionFormProps) => {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", width: "100%" }}>
        <Accordion
          style={{ width: "100%" }}
        // defaultExpanded={lections.length ? true : false}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="div" variant="h6">
              Лекции
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {lections.length ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>
                        <b>Название лекции</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lections &&
                      lections.map(({ lectionId, lectionName }) => (
                        <TableRow
                          key={lectionId}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>
                            <IconButton color="error" onClick={() => onDelete(lectionId)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell>{lectionName}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <span>Лекции не добавлены</span>
            )}
          </AccordionDetails>
        </Accordion>
        <Button
          variant="contained"
          onClick={() => setisModalOpen(true)}
          sx={{ height: "60px", width: "200px" }}
        >
          Добавить лекцию
        </Button>
      </div>
      <Modal open={isModalOpen} onClose={() => setisModalOpen(false)}>
        <div className="modal-content">
          <Box
            component="form"
            onSubmit={(e) => {
              !errors.lectionName && setisModalOpen(false)
              onSubmit(e)
            }}
            sx={style}
            noValidate
            autoComplete="off"
          >
            <TextField
              {...register("lectionName")}
              id="lectionName"
              label="Лекция"
              isDisabled={isDisabled}
              helperText={
                !!errors.lectionName && String(errors.lectionName?.message)
              }
            />

            <OutlinedButton
              isDisabled={isDisabled}
              type="submit"
              text="Добавить лекцию"
            />
          </Box>
        </div>
      </Modal>
    </div>
  );
};
