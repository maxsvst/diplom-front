// import { Box, TextField } from "@mui/material";
// import OutlinedButton from "../outlined-button/OutlinedButton";

// interface LaboratoryClassFormProps {
//   register: any;
//   errors: any;
//   onSubmit: (data: any) => void;
//   isDisabled: boolean;
// }

// export const LaboratoryClassForm = ({
//   register,
//   errors,
//   onSubmit,
//   isDisabled,
// }: LaboratoryClassFormProps) => {
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
//         {...register("laboratoryClassName")}
//         id="laboratoryClassName"
//         label="Лабораторное занятие"
//         isDisabled={isDisabled}
//         helperText={
//           !!errors.laboratoryClassName &&
//           String(errors.laboratoryClassName?.message)
//         }
//       />

//       <OutlinedButton
//         isDisabled={isDisabled}
//         type="submit"
//         text="Добавить ЛЗ"
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

import { LaboratoryClass } from "../../types";
import OutlinedButton from "../outlined-button/OutlinedButton";

interface LaboratoryClassFormProps {
  laboratoryClasses: Partial<LaboratoryClass>[];
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

export const LaboratoryClassForm = ({
  register,
  laboratoryClasses,
  errors,
  onSubmit,
  isDisabled,
}: LaboratoryClassFormProps) => {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <Accordion
          style={{ width: "100%" }}
          defaultExpanded={laboratoryClasses.length ? true : false}
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
                      <TableCell>
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
            onSubmit={onSubmit}
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
