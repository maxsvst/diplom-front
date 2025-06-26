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

import { Objective } from "../../types";
import OutlinedButton from "../outlined-button/OutlinedButton";

interface ObjectiveFormProps {
    objectives: Partial<Objective>[];
    register: any;
    errors: any;
    onSubmit: (data: any) => void;
    onDelete: (objectiveId: any) => void;
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

export const ObjectiveForm = ({
    register,
    objectives,
    errors,
    onSubmit,
    onDelete,
    isDisabled,
}: ObjectiveFormProps) => {
    const [isModalOpen, setisModalOpen] = useState<boolean>(false);

    return (
        <div>
            <div style={{ display: "flex", gap: "10px" }}>
                <Accordion
                    style={{ width: "100%" }}
                    // defaultExpanded={objectives.length ? true : false}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography component="div" variant="h6">
                            Задачи дисциплины
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {objectives.length ? (
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell colSpan={2}>
                                                <b>Название задачи дисциплины</b>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {objectives.map(
                                            ({ objectiveId, objectiveName }) => (
                                                <TableRow
                                                    key={objectiveId}
                                                    sx={{
                                                        "&:last-child td, &:last-child th": { border: 0 },
                                                    }}
                                                >
                                                    <TableCell>
                                                        <IconButton color="error" onClick={() => onDelete(objectiveId)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell>{objectiveName}</TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <span>Задачи дисциплины не добавлены</span>
                        )}
                    </AccordionDetails>
                </Accordion>
                <Button
                    variant="contained"
                    onClick={() => setisModalOpen(true)}
                    sx={{ height: "60px", width: "200px" }}
                >
                    Добавить задачу
                </Button>
            </div>
            <Modal open={isModalOpen} onClose={() => setisModalOpen(false)}>
                <div className="modal-content">
                    <Box
                        component="form"
                        onSubmit={(e) => {
                            !errors.objectiveName && setisModalOpen(false)
                            onSubmit(e)
                        }}
                        sx={style}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            {...register("objectiveName")}
                            id="objectiveName"
                            label="Задача дисциплины"
                            isDisabled={isDisabled}
                            helperText={
                                !!errors.objectiveName &&
                                String(errors.objectiveName?.message)
                            }
                        />

                        <OutlinedButton
                            isDisabled={isDisabled}
                            type="submit"
                            text="Добавить задачу"
                        />
                    </Box>
                </div>
            </Modal>
        </div>
    );
};
