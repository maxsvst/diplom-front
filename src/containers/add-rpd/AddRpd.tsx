import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { AppDispatch, RootState } from "../../app/store";
import {
  fetchDisciplines,
  setDiscipline,
  setDate,
  fetchTopics,
  fetchLaboratoryClasses,
  fetchPracticalClasses,
  fetchLections,
  fetchCompetences,
  fetchExamQuestions,
} from "../../app/slices/rpdSlice";
import Row from "../../blocks/row/Row";

import "./add-rpd.css";

export default function AddRpd() {
  const dispatch: AppDispatch = useDispatch();
  const {
    discipline,
    disciplines,
    createDate,
    disciplinesStatus,
    topics,
    topicsStatus,
  } = useSelector((state: RootState) => state.rpd);

  const handleChangeDiscipline = (e: SelectChangeEvent) => {
    dispatch(setDiscipline(e.target.value));

    if (disciplines) {
      const disciplineId = disciplines.find(
        ({ fullName }) => fullName === e.target.value
      )?.disciplineId;

      dispatch(fetchTopics(disciplineId!));
      dispatch(fetchCompetences(disciplineId!));
      dispatch(fetchExamQuestions(disciplineId!));
    }
  };

  const handleChangeYear = (date: Dayjs | null) => {
    dispatch(setDate(date));
  };

  useEffect(() => {
    if (disciplinesStatus === "idle") {
      dispatch(fetchDisciplines());
    }
  }, [dispatch, disciplinesStatus]);

  useEffect(() => {
    // console.log(discipline, topics);
    if (discipline && topicsStatus === "succeeded" && topics) {
      topics?.forEach(({ topicId }) => {
        dispatch(fetchLaboratoryClasses(topicId!));
        dispatch(fetchPracticalClasses(topicId!));
        dispatch(fetchLections(topicId!));
      });
    }
  }, [discipline, topicsStatus, topics]);

  return (
    <div className="add-rpd">
      <span className="add-rpd__title">Добавление РПД</span>
      {disciplinesStatus === "succeeded" ? (
        <FormControl fullWidth>
          <InputLabel>Выбор дисциплины</InputLabel>
          <Select value={discipline} onChange={handleChangeDiscipline}>
            {disciplines!.map(({ disciplineId, fullName }) => (
              <MenuItem
                key={disciplineId}
                value={fullName}
                data-id={disciplineId}
              >
                {fullName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <Skeleton width={100} height={50} />
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Выбор даты формирования РПД"
          value={createDate}
          onChange={handleChangeYear}
        />
      </LocalizationProvider>
      {topics && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Название темы</b>
                </TableCell>
                <TableCell align="right">
                  <b>Количество часов</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topics.map((topic) => (
                <Row key={topic.topicId} row={topic} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
