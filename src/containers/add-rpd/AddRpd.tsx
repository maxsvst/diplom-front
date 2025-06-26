import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Snackbar,
  TextField,
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

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

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
  addRpd,
  setCreditUnits,
  setCourse,
  setSemester,
  setControlWeek,
  setControlWork,
  setCourseProject,
  setCredit,
  setExam,
  addRpdCompetence,
} from "../../app/slices/rpdSlice";
import Row from "../../blocks/row/Row";

import * as api from "../../api/api";

import "./add-rpd.css";

export default function AddRpd() {
  const [snackbarState, setSnackbarState] = useState<{
    open: boolean;
    severity: "success" | "error";
    message: string;
  }>({ open: false, severity: "success", message: "" });
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const {
    exam,
    credit,
    topics,
    course,
    semester,
    discipline,
    createDate,
    controlWeek,
    controlWork,
    creditUnits,
    disciplines,
    topicsStatus,
    courseProject,
    disciplinesStatus,
  } = useSelector((state: RootState) => state.rpd);

  const handleChangeDiscipline = (e: SelectChangeEvent) => {
    dispatch(setDiscipline(e.target.value));

    dispatch(setCreditUnits(Number(4)));
    dispatch(setCourse(Number(2)));
    dispatch(setSemester(Number(3)));
    dispatch(setExam(true));
    dispatch(setCourseProject(true));

    if (disciplines) {
      const disciplineId = disciplines.find(
        ({ fullName }) => fullName === e.target.value
      )?.disciplineId;

      dispatch(fetchTopics(disciplineId!));
      dispatch(fetchCompetences(disciplineId!));
      dispatch(fetchExamQuestions(disciplineId!));
    }
  };

  console.log(exam);

  const handleChangeYear = (date: Dayjs | null) => {
    dispatch(setDate(date));
  };

  useEffect(() => {
    dispatch(fetchDisciplines());
  }, [dispatch]);

  useEffect(() => {
    if (discipline && topicsStatus === "succeeded" && topics) {
      topics?.forEach(({ topicId }) => {
        dispatch(fetchLaboratoryClasses(topicId!));
        dispatch(fetchPracticalClasses(topicId!));
        dispatch(fetchLections(topicId!));
      });
    }
  }, [dispatch, discipline, topicsStatus, topics]);

  const submitRpd = async () => {
    try {
      if (disciplines) {
        const disciplineId = disciplines.find(
          ({ fullName }) => fullName === discipline
        )?.disciplineId;

        if (disciplineId) {
          await dispatch(addRpd(disciplineId!));
          setSnackbarState({
            open: true,
            severity: "success",
            message: "РПД добавлена",
          });
        } else {
          setSnackbarState({
            open: true,
            severity: "error",
            message: "Дисциплина не найдена",
          });
        }
      } else {
        setSnackbarState({
          open: true,
          severity: "error",
          message: "Список дисциплин пуст",
        });
      }
    } catch (error) {
      console.error("Error during import:", error);
      setSnackbarState({
        open: true,
        severity: "error",
        message: "Импорт не удался",
      });
    }
  };

  return (
    <div className="add-rpd">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <span className="add-rpd__title">Добавление РПД</span>
        <Button
          variant="outlined"
          onClick={() => navigate("/add-discipline")}
          sx={{ height: "60px", width: "200px" }}
          startIcon={<ArrowBackRoundedIcon />}
        >
          К дисциплинам
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate("/parse-docs")}
          sx={{ height: "60px", width: "200px" }}
          endIcon={<ArrowForwardRoundedIcon />}
        >
          К парсингу УП
        </Button>
      </div>
      {disciplinesStatus === "succeeded" ? (
        <FormControl fullWidth>
          <InputLabel id="discipline-select-label">Выбор дисциплины</InputLabel>
          <Select
            labelId="discipline-select-label"
            id="discipline-select"
            value={discipline}
            label="Выберите дисциплину"
            onChange={handleChangeDiscipline}
            disabled={!disciplines?.length}
          >
            {!!disciplines &&
              disciplines.map(({ disciplineId, fullName }) => (
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

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "auto auto",
          gap: 4,
        }}
      >
        <Box
          sx={{
            gridColumn: "1 / -1",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Зачётные единицы"
              value={creditUnits}
              onChange={(e) => dispatch(setCreditUnits(Number(e.target.value)))}
              variant="outlined"
              type="number"
              placeholder="Зачётные единицы"
              required
            />

            <TextField
              label="Курс"
              value={course}
              onChange={(e) => dispatch(setCourse(Number(e.target.value)))}
              variant="outlined"
              type="number"
              placeholder="Курс"
            />

            <TextField
              label="Семестр"
              value={semester}
              onChange={(e) => dispatch(setSemester(Number(e.target.value)))}
              variant="outlined"
              type="number"
              placeholder="Семестр"
            />

            <TextField
              label="Неделя контроля"
              value={controlWeek}
              onChange={(e) => dispatch(setControlWeek(Number(e.target.value)))}
              variant="outlined"
              type="number"
              placeholder="Неделя контроля"
            />
          </Box>
        </Box>

        <Box
          sx={{
            gridColumn: "1 / -1",
            gridRow: "2",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={controlWork}
                  onChange={(e) => dispatch(setControlWork(e.target.checked))}
                />
              }
              label="РГЗ, контрольная работа"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={courseProject}
                  onChange={(e) => dispatch(setCourseProject(e.target.checked))}
                />
              }
              label="Курсовой проект"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={credit}
                  onChange={(e) => dispatch(setCredit(e.target.checked))}
                />
              }
              label="Зачёт"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={exam}
                  onChange={(e) => dispatch(setExam(e.target.checked))}
                />
              }
              label="Экзамен"
            />
          </Box>
        </Box>
      </Box>

      {topics && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Название темы</b>
                </TableCell>
                <TableCell align="right">
                  <b>Количество часов</b>
                </TableCell>
                <TableCell />
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
      <Button variant="contained" onClick={submitRpd}>
        Создать РПД
      </Button>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={2000}
        onClose={() =>
          setSnackbarState((prevState) => ({ ...prevState, open: false }))
        }
      >
        <Alert
          onClose={() =>
            setSnackbarState((prevState) => ({ ...prevState, open: false }))
          }
          severity={snackbarState.severity}
          variant="standard"
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
