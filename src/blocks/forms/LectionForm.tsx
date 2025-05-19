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

import { Lection } from "../../types";
import OutlinedButton from "../outlined-button/OutlinedButton";

interface LectionFormProps {
  lections: Partial<Lection>[];
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

export const LectionForm = ({
  register,
  lections,
  errors,
  onSubmit,
  isDisabled,
}: LectionFormProps) => {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", width: "100%" }}>
        <Accordion
          style={{ width: "100%" }}
          defaultExpanded={lections.length ? true : false}
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
                      <TableCell>
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
            onSubmit={onSubmit}
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
