import { useState } from "react";
import { Ollama } from "react-ollama";

import * as api from "../../api/api";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import {
  ExamQuestion,
  LaboratoryClass,
  Lection,
  PracticalClass,
  Topic,
} from "../../types";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import "./parse-docs.css";
import { useNavigate } from "react-router-dom";
import {
  importExamQuestions,
  importLaboratoryClasses,
  importLections,
  importPracticalClasses,
  importTopics,
} from "../../helpers/data";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const ParseDocs = () => {
  const ollama = new Ollama({
    host: "http://localhost:11434", // Укажите правильный адрес
  });

  const navigate = useNavigate();

  const [discipline, setDiscipline] = useState<any>();
  const [disciplines, setDisciplines] = useState<any[]>([]);

  const [topics, setTopics] = useState<Partial<Topic>[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const [laboratoryClasses, setLaboratoryClasses] = useState<
    Partial<LaboratoryClass>[]
  >([]);
  const [selectedLaboratoryClasses, setSelectedLaboratoryClasses] = useState<
    string[]
  >([]);
  const [practicalClasses, setPracticalClasses] = useState<
    Partial<PracticalClass>[]
  >([]);
  const [selectedPracticalClasses, setSelectedPracticalClasses] = useState<
    string[]
  >([]);
  const [lections, setLections] = useState<Partial<Lection>[]>([]);
  const [selectedLections, setSelectedLections] = useState<string[]>([]);
  const [examQuestions, setExamQuestions] = useState<Partial<ExamQuestion>[]>(
    []
  );
  const [selectedExamQuestions, setSelectedExamQuestions] = useState<string[]>(
    []
  );

  const [file, setFile] = useState<any | null>(null);

  const [isResponseLoading, setIsResponseLoading] = useState(false);
  // const [ollamaRequest, setOllamaResquest] = useState('')
  // const [ollamaResponse, setOllamaResponse] = useState<{ topicId: string, topicName: string }[]>([])
  const ollamaTopicsRequest = `Сгенерируй список тем по дисциплине ${discipline} для бакалавриата в формате JSON. Список должен представлять собой массив объектов, где каждый объект является темой и имеет следующую структуру:

\`\`\`json
[
  {
    "topicId": "уникальный UUID",
    "topicName": "Название темы"
  },
  {
    "topicId": "уникальный UUID",
    "topicName": "Название темы"
  }
]
\`\`\`

**ОЧЕНЬ ВАЖНО:**

*   **НЕ добавляй никаких пояснений, размышлений, вступлений или заключений.**
*   **Верни ТОЛЬКО валидный JSON, соответствующий указанному формату.  Никаких исключений!**
*   Значение "topicId" должно быть валидным, сгенерированным UUID (версии 4) в виде строки.  Пример: "a1b2c3d4-e5f6-4789-9abc-def012345678".
*   "topicName" должно быть строкой с названием темы, связанной с дисциплиной "Управление данными".
*   Убедись, что все UUID уникальны.
`;

  const ollamaLessonsRequest = `Сгенерируй материалы по дисциплине ${selectedTopics.join(
    ", "
  )} для бакалавриата в формате JSON.  Материалы должны быть представлены в виде объекта JSON со следующей структурой:

\`\`\`json
{
  "lections": [
    {
      "lectionId": "уникальный UUID",
      "lectionName": "Название лекции"
    },
    {
      "lectureId": "уникальный UUID",
      "lectureName": "Название лекции"
    }
  ],
  "practicalClasses": [
    {
      "practicalClassId": "уникальный UUID",
      "practicalClassName": "Название практического занятия"
    },
    {
      "practicalClassId": "уникальный UUID",
      "practicalClassName": "Название практического занятия"
    }
  ],
  "laboratoryClasses": [
    {
      "laboratoryClassId": "уникальный UUID",
      "laboratoryClassName": "Название лабораторной работы"
    },
    {
      "laboratoryClassId": "уникальный UUID",
      "laboratoryClassName": "Название лабораторной работы"
    }
  ],
  "examQuestions": [
    {
      "examQuestionId": "уникальный UUID",
      "examQuestionName": "Текст вопроса к экзамену"
    },
    {
      "examQuestionId": "уникальный UUID",
      "examQuestionName": "Текст вопроса к экзамену"
    }
  ]
}
\`\`\`

**ОЧЕНЬ ВАЖНО:**

*   **НЕ добавляй никаких пояснений, размышлений, вступлений или заключений.**
*   **Верни ТОЛЬКО валидный JSON, соответствующий указанному формату.  Никаких исключений!**
*   Все ID (lectureId, practicalClassId, laboratoryClassId, examQuestionId) должны быть валидными, сгенерированными UUID (версии 4) в виде строк.  Пример: "a1b2c3d4-e5f6-4789-9abc-def012345678".
*   Все названия и тексты (lectureName, practicalClassName, laboratoryClassName, examQuestionText) должны быть строками, связанными с дисциплиной \$\{discipline}.
*   Убедись, что все UUID уникальны в пределах каждой категории (лекции, практики, лабораторные, вопросы).
*   Сгенерируй разумное количество элементов в каждом списке (например, 5-10).
`;

  const getOllamaTopicsResponse = async () => {
    try {
      setIsResponseLoading(true);
      //   const topics = await api.sendPrompt(ollamaTopicsRequest);

      setTimeout(() => setTopics(importTopics), 3000);
      // setOllamaResponse(topics)
    } catch (error) {
      setIsResponseLoading(false);
    } finally {
      setIsResponseLoading(false);
    }
  };

  const getOllamaLessonsResponse = async () => {
    try {
      setIsResponseLoading(true);
      // const { lections, practicalClasses, laboratoryClasses, examQuestions } =
      //   await api.sendPrompt(ollamaLessonsRequest);
      setTimeout(() => {
        setLections(importLections);
        setPracticalClasses(importPracticalClasses);
        setLaboratoryClasses(importLaboratoryClasses);
        setExamQuestions(importExamQuestions);
      }, 3000);

      // setOllamaResponse(topics)
    } catch (error) {
      setIsResponseLoading(false);
    } finally {
      setIsResponseLoading(false);
    }
  };

  const addDisciplineHandler = async () => {
    try {
      setIsResponseLoading(true);
      // const { lections, practicalClasses, laboratoryClasses, examQuestions } =
      //   await api.sendPrompt(ollamaLessonsRequest);
      await api.importData();

      // setOllamaResponse(topics)
    } catch (error) {
      setIsResponseLoading(false);
    } finally {
      setIsResponseLoading(false);
    }
  };

  const handleChangeDiscipline = (e: any) => {
    setDiscipline(e.target.value);
  };

  const handleChangeLaboratoryClasses = (
    event: SelectChangeEvent<typeof selectedLaboratoryClasses>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedLaboratoryClasses(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangePracticalClasses = (
    event: SelectChangeEvent<typeof selectedPracticalClasses>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedPracticalClasses(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeLections = (
    event: SelectChangeEvent<typeof selectedLections>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedLections(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeExamQuestions = (
    event: SelectChangeEvent<typeof selectedExamQuestions>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedExamQuestions(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeTopics = (
    event: SelectChangeEvent<typeof selectedTopics>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedTopics(typeof value === "string" ? value.split(",") : value);
  };

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Пожалуйста, выберите файл");
      return;
    }

    try {
      setIsResponseLoading(true);
      const xlsx = await api.uploadXlsx(file);
      setDisciplines(xlsx);
    } catch (error) {
      setIsResponseLoading(false);
    } finally {
      setIsResponseLoading(false);
    }
  };

  console.log(file);

  return (
    <div className="parse-docs">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <span className="parse-docs__title">
          Обработка учебного плана и генерация учебных единиц
        </span>
        <Button
          variant="outlined"
          onClick={() => navigate("/add-rpd")}
          sx={{ height: "60px", width: "200px" }}
          startIcon={<ArrowBackRoundedIcon />}
        >
          К РПД
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate("/add-discipline")}
          sx={{ height: "60px", width: "200px" }}
          endIcon={<ArrowForwardRoundedIcon />}
        >
          К дисциплинам
        </Button>
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Прикрепите учебный план
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileChange}
            multiple
          />
        </Button>
        <Button variant="contained" onClick={handleUpload}>
          Загрузить УП
        </Button>
        {isResponseLoading && (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <FormControl fullWidth>
          <InputLabel id="discipline-select-label">Выбор дисциплины</InputLabel>
          <Select
            labelId="discipline-select-label"
            id="discipline-select"
            value={discipline}
            label="Выберите дисциплину"
            onChange={handleChangeDiscipline}
            disabled={!disciplines?.length}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 300,
                },
              },
            }}
          >
            {!!disciplines &&
              disciplines.map(
                ({ indeks, naimenovanie }) =>
                  naimenovanie && (
                    <MenuItem
                      key={indeks}
                      value={naimenovanie}
                      data-id={indeks}
                    >
                      {naimenovanie}
                    </MenuItem>
                  )
              )}
          </Select>
        </FormControl>
        <Button
          sx={{ height: "60px", width: "200px" }}
          variant="contained"
          disabled={!discipline}
          onClick={getOllamaTopicsResponse}
        >
          Генерация тем
        </Button>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-multiple-checkbox-label">Темы</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedTopics}
            onChange={handleChangeTopics}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            disabled={!topics.length}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 300,
                },
              },
            }}
          >
            {topics &&
              topics!.map(({ topicId, topicName }) => (
                <MenuItem key={topicId} value={topicName}>
                  <Checkbox checked={selectedTopics!.includes(topicName!)} />
                  <ListItemText primary={topicName} />
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button
          sx={{ height: "60px", width: "200px" }}
          variant="contained"
          disabled={!selectedTopics.length}
          onClick={getOllamaLessonsResponse}
        >
          Генерация учебных единиц
        </Button>
      </div>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">
          Лабораторные занятия
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedLaboratoryClasses}
          onChange={handleChangeLaboratoryClasses}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          disabled={!laboratoryClasses.length}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 300,
              },
            },
          }}
        >
          {laboratoryClasses &&
            laboratoryClasses!.map(
              ({ laboratoryClassId, laboratoryClassName }) => (
                <MenuItem key={laboratoryClassId} value={laboratoryClassName}>
                  <Checkbox
                    checked={selectedLaboratoryClasses!.includes(
                      laboratoryClassName!
                    )}
                  />
                  <ListItemText primary={laboratoryClassName} />
                </MenuItem>
              )
            )}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">
          Практические занятия
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedPracticalClasses}
          onChange={handleChangePracticalClasses}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          disabled={!practicalClasses.length}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 300,
              },
            },
          }}
        >
          {practicalClasses &&
            practicalClasses!.map(
              ({ practicalClassId, practicalClassName }) => (
                <MenuItem key={practicalClassId} value={practicalClassName}>
                  <Checkbox
                    checked={selectedPracticalClasses!.includes(
                      practicalClassName!
                    )}
                  />
                  <ListItemText primary={practicalClassName} />
                </MenuItem>
              )
            )}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">Лекции</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedLections}
          onChange={handleChangeLections}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          disabled={!lections.length}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 200,
              },
            },
          }}
        >
          {lections &&
            lections!.map(({ lectionId, lectionName }) => (
              <MenuItem key={lectionId} value={lectionName}>
                <Checkbox checked={selectedLections!.includes(lectionName!)} />
                <ListItemText primary={lectionName} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">
          Вопросы к экзамену
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedExamQuestions}
          onChange={handleChangeExamQuestions}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          disabled={!examQuestions.length}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 200,
              },
            },
          }}
        >
          {examQuestions &&
            examQuestions!.map(({ examQuestionId, examQuestionName }) => (
              <MenuItem key={examQuestionId} value={examQuestionName}>
                <Checkbox
                  checked={selectedExamQuestions!.includes(examQuestionName!)}
                />
                <ListItemText primary={examQuestionName} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={addDisciplineHandler}>
        Добавить дисциплину
      </Button>
    </div>
  );
};
