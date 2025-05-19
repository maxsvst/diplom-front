// import { Box, TextField } from "@mui/material";
// import Input from "../input/Input";
// import OutlinedButton from "../outlined-button/OutlinedButton";

// interface CompetenceFormProps {
//   register: any;
//   errors: any;
//   onSubmit: (data: any) => void;
//   isDisabled: boolean;
// }

// export const CompetenceForm = ({
//   register,
//   errors,
//   onSubmit,
//   isDisabled,
// }: CompetenceFormProps) => {
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
//         {...register("competenceType")}
//         id="competenceType"
//         label="Тип компетенции"
//         isDisabled={isDisabled}
//         helperText={
//           !!errors.competenceType && String(errors.competenceType?.message)
//         }
//       />

//       <TextField
//         {...register("competenceCode")}
//         id="competenceCode"
//         label="Код компетенции"
//         isDisabled={isDisabled}
//         helperText={
//           !!errors.competenceCode && String(errors.competenceCode?.message)
//         }
//       />

//       <TextField
//         {...register("competenceName")}
//         id="competenceName"
//         label="Название компетенции"
//         isDisabled={isDisabled}
//         helperText={
//           !!errors.competenceName && String(errors.competenceName?.message)
//         }
//       />

//       <TextField
//         {...register("indicatorCode")}
//         id="indicatorCode"
//         label="Код индикатора"
//         isDisabled={isDisabled}
//         helperText={
//           !!errors.indicatorCode && String(errors.indicatorCode?.message)
//         }
//       />

//       <TextField
//         {...register("indicatorName")}
//         id="indicatorName"
//         label="Название индикатора"
//         isDisabled={isDisabled}
//         helperText={
//           !!errors.indicatorName && String(errors.indicatorName?.message)
//         }
//       />

//       <OutlinedButton
//         isDisabled={isDisabled}
//         type="submit"
//         text="Добавить компетенцию"
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

import { Competence } from "../../types";
import OutlinedButton from "../outlined-button/OutlinedButton";

interface CompetenceFormProps {
  competences: Partial<Competence>[];
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

export const CompetenceForm = ({
  register,
  competences,
  errors,
  onSubmit,
  isDisabled,
}: CompetenceFormProps) => {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <Accordion
          style={{ width: "100%" }}
          defaultExpanded={competences.length ? true : false}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="div" variant="h6">
              Компетенции
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {competences.length ? (
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Код компетенции</b>
                      </TableCell>
                      <TableCell>
                        <b>Тип компетенции</b>
                      </TableCell>
                      <TableCell>
                        <b>Название компетенции</b>
                      </TableCell>
                      <TableCell>
                        <b>Код индикатора</b>
                      </TableCell>
                      <TableCell>
                        <b>Название индикатора</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {competences.map(
                      ({
                        competenceId,
                        competenceCode,
                        competenceType,
                        competenceName,
                        indicatorCode,
                        indicatorName,
                      }) => (
                        <TableRow
                          key={competenceId}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{competenceCode}</TableCell>
                          <TableCell>{competenceType}</TableCell>
                          <TableCell>{competenceName}</TableCell>
                          <TableCell>{indicatorCode}</TableCell>
                          <TableCell>{indicatorName}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <span>Компетенции не добавлены</span>
            )}
          </AccordionDetails>
        </Accordion>
        <Button
          variant="contained"
          onClick={() => setisModalOpen(true)}
          sx={{ height: "60px", width: "200px" }}
        >
          Добавить компетенцию
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
              {...register("competenceType")}
              id="competenceType"
              label="Тип компетенции"
              isDisabled={isDisabled}
              helperText={
                !!errors.competenceType &&
                String(errors.competenceType?.message)
              }
            />

            <TextField
              {...register("competenceCode")}
              id="competenceCode"
              label="Код компетенции"
              isDisabled={isDisabled}
              helperText={
                !!errors.competenceCode &&
                String(errors.competenceCode?.message)
              }
            />

            <TextField
              {...register("competenceName")}
              id="competenceName"
              label="Название компетенции"
              isDisabled={isDisabled}
              helperText={
                !!errors.competenceName &&
                String(errors.competenceName?.message)
              }
            />

            <TextField
              {...register("indicatorCode")}
              id="indicatorCode"
              label="Код индикатора"
              isDisabled={isDisabled}
              helperText={
                !!errors.indicatorCode && String(errors.indicatorCode?.message)
              }
            />

            <TextField
              {...register("indicatorName")}
              id="indicatorName"
              label="Название индикатора"
              isDisabled={isDisabled}
              helperText={
                !!errors.indicatorName && String(errors.indicatorName?.message)
              }
            />

            <OutlinedButton
              isDisabled={isDisabled}
              type="submit"
              text="Добавить компетенцию"
            />
          </Box>
        </div>
      </Modal>
    </div>
  );
};
