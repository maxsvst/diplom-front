import { useState } from "react";

import Box from "@mui/material/Box";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Checkbox,
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

import { Purpose } from "../../types";
import OutlinedButton from "../outlined-button/OutlinedButton";

interface PurposeFormProps {
    purposes: Partial<Purpose>[];
    register: any;
    errors: any;
    onSubmit: (data: any) => void;
    onDelete: (purposeId: any) => void;
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

export const PurposeForm = ({
    register,
    purposes,
    errors,
    onSubmit,
    onDelete,
    isDisabled,
}: PurposeFormProps) => {
    const [isModalOpen, setisModalOpen] = useState<boolean>(false);

    return (
        <div>
            <div style={{ display: "flex", gap: "10px" }}>
                <Accordion
                    style={{ width: "100%" }}
                    // defaultExpanded={purposes.length ? true : false}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography component="div" variant="h6">
                            Цели дисциплины
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {purposes.length ? (
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell colSpan={2}>
                                                <b>Название цели дисциплины</b>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {purposes.map(
                                            ({ purposeId, purposeName }) => (
                                                <TableRow
                                                    key={purposeId}
                                                    sx={{
                                                        "&:last-child td, &:last-child th": { border: 0 },
                                                    }}
                                                >
                                                    <TableCell>
                                                        <IconButton color="error" onClick={() => onDelete(purposeId)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell>{purposeName}</TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <span>Цели дисциплины не добавлены</span>
                        )}
                    </AccordionDetails>
                </Accordion>
                <Button
                    variant="contained"
                    onClick={() => setisModalOpen(true)}
                    sx={{ height: "60px", width: "200px" }}
                >
                    Добавить цель
                </Button>
            </div>
            <Modal open={isModalOpen} onClose={() => setisModalOpen(false)}>
                <div className="modal-content">
                    <Box
                        component="form"
                        onSubmit={(e) => {
                            !errors.purposeName && setisModalOpen(false)
                            onSubmit(e)
                        }}
                        sx={style}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            {...register("purposeName")}
                            id="purposeName"
                            label="Цель дисциплины"
                            isDisabled={isDisabled}
                            helperText={
                                !!errors.purposeName &&
                                String(errors.purposeName?.message)
                            }
                        />

                        <OutlinedButton
                            isDisabled={isDisabled}
                            type="submit"
                            text="Добавить цель"
                        />
                    </Box>
                </div>
            </Modal>
        </div>
    );
};
