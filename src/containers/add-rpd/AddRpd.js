import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import Input from "../../blocks/input/Input";
import OutlinedButton from "../../blocks/outlined-button/OutlinedButton";

import "./add-rpd.css";

import * as api from "../../api/api";
import { useForm } from "react-hook-form";

const CheckboxLabel = { inputProps: { "aria-label": "Checkbox demo" } };

export default function AddRpd() {
  let topicsInputValueInitialState = {};
  let laboratoryClassesInputValueInitialState = {};
  let practicalClassesInputValueInitialState = {};
  let lectionsInputValueInitialState = {};
  let selfStudyInputValueInitialState = {};

  const [discipline, setDiscipline] = useState({});
  const [year, setYear] = useState("");
  const [additionalHours, setAdditionalHours] = useState(0);
  const [currentDisciplineId, setCurrentDisciplineId] = useState();
  const [pickedCompetences, setPickedCompetences] = useState([]);
  const [laboratoryClassesInputValue, setLaboratoryClassesInputValue] =
    useState(laboratoryClassesInputValueInitialState);
  const [practicalClassesInputValue, setPracticalClassesInputValue] = useState(
    practicalClassesInputValueInitialState
  );
  const [lectionsInputValue, setLectionsInputValue] = useState(
    lectionsInputValueInitialState
  );
  const [selfStudyInputValue, setSelfStudyInputValue] = useState(
    selfStudyInputValueInitialState
  );

  const [disciplines, setDisciplines] = useState([]);
  const [topics, setTopics] = useState([]);
  const [laboratoryClasses, setLaboratoryClasses] = useState([]);
  const [practicalClasses, setPracticalClasses] = useState([]);
  const [lections, setLections] = useState([]);
  const [disciplineCompetences, setDisciplineCompetences] = useState([]);

  const { register, handleSubmit } = useForm();

  const disciplineLaboratoryHours = Object.values(
    laboratoryClassesInputValue
  ).reduce((acc, currentValue) => Number(acc) + Number(currentValue.hours), 0);

  const disciplinePracticalHours = Object.values(
    practicalClassesInputValue
  ).reduce((acc, currentValue) => Number(acc) + Number(currentValue.hours), 0);

  const disciplineLectionHours = Object.values(lectionsInputValue).reduce(
    (acc, currentValue) => Number(acc) + Number(currentValue.hours),
    0
  );

  const selfStudyHours = Object.values(selfStudyInputValue).reduce(
    (acc, currentValue) => Number(acc) + Number(currentValue.hours),
    0
  );

  const totalHours =
    disciplineLaboratoryHours +
    disciplinePracticalHours +
    disciplineLectionHours +
    selfStudyHours +
    Number(additionalHours);

  let topicArray = [];

  topics.map((topic) =>
    topicArray.push({
      topicId: topic.id,
      topicName: topic.topicName,
      totalHours:
        Object.values(lectionsInputValue)
          .filter((item) => item.topicIdValue === topic.id)
          .reduce(
            (acc, currentValue) => Number(acc) + Number(currentValue.hours),
            0
          ) +
        Object.values(practicalClassesInputValue)
          .filter((item) => item.topicIdValue === topic.id)
          .reduce(
            (acc, currentValue) => Number(acc) + Number(currentValue.hours),
            0
          ) +
        Object.values(laboratoryClassesInputValue)
          .filter((item) => item.topicIdValue === topic.id)
          .reduce(
            (acc, currentValue) => Number(acc) + Number(currentValue.hours),
            0
          ) +
        Object.values(selfStudyInputValue)
          .filter((item) => item.topicIdValue === topic.id)
          .reduce(
            (acc, currentValue) => Number(acc) + Number(currentValue.hours),
            0
          ),
      topicLectionHours: Object.values(lectionsInputValue)
        .filter((item) => item.topicIdValue === topic.id)
        .reduce(
          (acc, currentValue) => Number(acc) + Number(currentValue.hours),
          0
        ),
      topicPracticalClassHours: Object.values(practicalClassesInputValue)
        .filter((item) => item.topicIdValue === topic.id)
        .reduce(
          (acc, currentValue) => Number(acc) + Number(currentValue.hours),
          0
        ),
      topicLaboratoryClassHours: Object.values(laboratoryClassesInputValue)
        .filter((item) => item.topicIdValue === topic.id)
        .reduce(
          (acc, currentValue) => Number(acc) + Number(currentValue.hours),
          0
        ),
      topicSelfstudyHours: Object.values(selfStudyInputValue)
        .filter((item) => item.topicIdValue === topic.id)
        .reduce(
          (acc, currentValue) => Number(acc) + Number(currentValue.hours),
          0
        ),
    })
  );

  const disciplinehHandleChange = (event) => {
    setDiscipline(event.target.value);
  };

  const yearHandleChange = (event) => {
    setYear(event.target.value);
  };

  const disciplineClick = (discipline) => {
    setCurrentDisciplineId(discipline.id);
  };

  const getAllDisciplines = async () => {
    const allDisciplines = await api.getAllDisciplines();
    console.log(allDisciplines);
    setDisciplines([...allDisciplines.data]);
  };

  const getAllData = async (currentDisciplineId) => {
    if (currentDisciplineId) {
      const topics = await api.getAllTopics(currentDisciplineId);
      const responseLaboratoryClasses = await api.getAllLaboratoryClasses(
        currentDisciplineId
      );

      const responsePracticalClasses = await api.getAllPracticalClasses(
        currentDisciplineId
      );
      const responseLections = await api.getAllLections(currentDisciplineId);
      const competences = await api.getAllCompetences();
      const competenceObjects = await api.getDisciplineCompetence(
        currentDisciplineId
      );
      const disciplineCompetences = competenceObjects.data.flatMap((item) =>
        competences.data.filter(
          (competence) => competence.id === item.competenceId
        )
      );

      topics.data.forEach((item) => {
        topicsInputValueInitialState[item.id] = "";
      });
      responseLaboratoryClasses.data.forEach((item) => {
        laboratoryClassesInputValueInitialState[item.laboratoryClassId] = "";
      });

      responsePracticalClasses.data.forEach((item) => {
        practicalClassesInputValueInitialState[item.practicalClassId] = "";
      });

      responseLections.data.forEach((item) => {
        lectionsInputValueInitialState[item.id] = "";
      });

      setTopics([...topics.data]);
      setLaboratoryClasses([...responseLaboratoryClasses.data]);
      setPracticalClasses([...responsePracticalClasses.data]);
      setLections([...responseLections.data]);
      setDisciplineCompetences([...disciplineCompetences]);
    }
  };

  const submitRpd = async () => {
    await api.addRpd(
      currentDisciplineId,
      totalHours,
      disciplineLectionHours,
      disciplinePracticalHours,
      disciplineLaboratoryHours,
      selfStudyHours,
      Number(additionalHours),
      year
    );

    const rpdId = await api.getUniqueRpd(
      currentDisciplineId,
      totalHours,
      disciplineLectionHours,
      disciplinePracticalHours,
      disciplineLaboratoryHours,
      selfStudyHours,
      Number(additionalHours),
      year
    );

    Promise.all(
      topicArray.map((item) =>
        api.addRpdTopic(
          rpdId.data.id,
          item.topicId,
          item.totalHours,
          item.topicLectionHours,
          item.topicPracticalClassHours,
          item.topicLaboratoryClassHours,
          item.topicSelfstudyHours
        )
      ),
      pickedCompetences.map((item) =>
        api.addRpdCompetence(rpdId.data.id, Number(item))
      ),
      Object.values(laboratoryClassesInputValue).map((item) =>
        api.addRpdLaboratoryClass(
          rpdId.data.id,
          item.laboratoryClassIdValue,
          Number(item.hours)
        )
      ),
      Object.values(practicalClassesInputValue).map((item) =>
        api.addRpdPracticalClass(
          rpdId.data.id,
          item.practicalClassIdValue,
          Number(item.hours)
        )
      ),
      Object.values(lectionsInputValue).map((item) =>
        api.addRpdLections(
          rpdId.data.id,
          item.lectionIdValue,
          Number(item.hours)
        )
      )
    );

    api
      .createDocument(rpdId.data.id)
      .then((res) => res.data)
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `РПД.docx`);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
  };

  const competenceHandler = (competences) => {
    const isItemExist = pickedCompetences.filter(
      (item) => competences === item
    );
    if (isItemExist.length !== 0) {
      setPickedCompetences(
        pickedCompetences.filter((item) => item !== competences)
      );
    } else {
      setPickedCompetences([...pickedCompetences, competences]);
    }
  };

  const laboratoryClassHoursHandler = (input) => {
    const name = input.name;
    const hours = input.value;
    const laboratoryClassHoursTopicId = laboratoryClasses.find(
      (item) => item.laboratoryClassName === name
    );
    const topicIdValue = laboratoryClassHoursTopicId.topicId;
    const laboratoryClassIdValue =
      laboratoryClassHoursTopicId.laboratoryClassId;

    setLaboratoryClassesInputValue({
      ...laboratoryClassesInputValue,
      [name]: { hours, topicIdValue, laboratoryClassIdValue },
    });
  };

  const practicalClassHoursHandler = (input) => {
    const name = input.name;
    const hours = input.value;
    const practicalClassHoursTopicId = practicalClasses.find(
      (item) => item.practicalClassName === name
    );
    const topicIdValue = practicalClassHoursTopicId.topicId;
    const practicalClassIdValue = practicalClassHoursTopicId.practicalClassId;

    setPracticalClassesInputValue({
      ...practicalClassesInputValue,
      [name]: { hours, topicIdValue, practicalClassIdValue },
    });
  };

  const lectionsHoursHandler = (input) => {
    const name = input.name;
    const hours = input.value;
    const lectionHoursTopicId = lections.find(
      (item) => item.lectionName === name
    );
    const topicIdValue = lectionHoursTopicId.topicId;
    const lectionIdValue = lectionHoursTopicId.id;

    setLectionsInputValue({
      ...lectionsInputValue,
      [name]: { hours, topicIdValue, lectionIdValue },
    });
  };

  const selfStudyHoursHandler = (input) => {
    const id = input.name;
    const hours = input.value;
    const selfStudyTopicId = topics.find((item) => item.id === Number(id));
    const topicIdValue = selfStudyTopicId.id;

    setSelfStudyInputValue({
      ...selfStudyInputValue,
      [id]: { hours, topicIdValue },
    });
  };

  useEffect(() => {
    getAllDisciplines();
    getAllData(currentDisciplineId);
  }, [currentDisciplineId]);

  return (
    <div className="add-rpd">
      <span className="add-rpd__title">Добавление РПД</span>
      <Box
        onSubmit={handleSubmit(submitRpd)}
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            marginTop: "15px",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl sx={{ width: "99%" }}>
          <InputLabel>Дисциплина</InputLabel>
          <Select
            {...register("discipline", { required: true })}
            id="discipline"
            value={discipline?.fullName}
            label="discipline"
            onChange={disciplinehHandleChange}
          >
            {disciplines.length !== 0 &&
              disciplines.map((discipline) => (
                <MenuItem
                  key={discipline.id}
                  onClick={() => disciplineClick(discipline)}
                  value={`${discipline.fullName}`}
                >
                  {discipline.fullName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "99%" }}>
          <InputLabel>Год дисциплины</InputLabel>
          <Select
            {...register("year", { required: true })}
            value={year}
            label="year"
            onChange={yearHandleChange}
          >
            <MenuItem value={2023}>2023</MenuItem>
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
          </Select>
        </FormControl>
        <span className="add-rpd__helper">
          {"Общее количество часов: " + totalHours}
        </span>
        <span className="add-rpd__local-title">Добавление тем</span>
        {topics.map((topic) => (
          <div key={topic.id}>
            <span className="add-rpd__educational-unit">
              {"Тема №" +
                topic.id +
                " " +
                topic.topicName +
                " " +
                "Количество часов: " +
                topicArray.find((item) => item.topicId === topic.id).totalHours}
            </span>
          </div>
        ))}
        <div>
          <span className="add-rpd__local-title">Добавление лекций</span>
          {lections.map((lection) => (
            <div className=".add-rpd__educational-unit-block" key={lection.id}>
              <span className="add-rpd__educational-unit">
                {"Тема №" + lection.topicId + " " + lection.lectionName}
              </span>
              <Input
                key={lection.id}
                inputValue={lectionsInputValue[lection.id]}
                register={register(lection.lectionName, {
                  onChange: (e) => lectionsHoursHandler(e.target),
                  required: true,
                })}
                id="lectionHours"
                label="Количество часов"
                variant="outlined"
              />
            </div>
          ))}
          <span className="add-rpd__helper">
            {"Лекционных часов: " + disciplineLectionHours}
          </span>
        </div>
        <div>
          <span className="add-rpd__local-title">
            Добавление лабораторных занятий
          </span>
          {laboratoryClasses.map((laboratoryClass) => (
            <div key={laboratoryClass.laboratoryClassId}>
              <span className="add-rpd__educational-unit">
                {"Тема №" +
                  laboratoryClass.topicId +
                  " " +
                  laboratoryClass.laboratoryClassName}
              </span>
              <Input
                key={laboratoryClass.laboratoryClassId}
                inputValue={
                  laboratoryClassesInputValue[laboratoryClass.laboratoryClassId]
                }
                register={register(`${laboratoryClass.laboratoryClassName}`, {
                  onChange: (e) => laboratoryClassHoursHandler(e.target),
                  required: true,
                })}
                id="laboratoryClassHours"
                label="Количество часов"
                variant="outlined"
              />
            </div>
          ))}
          <span className="add-rpd__helper">
            {"Лабораторных часов: " + disciplineLaboratoryHours}
          </span>
        </div>
        <div>
          <span className="add-rpd__local-title">
            Добавление практических занятий
          </span>
          {practicalClasses.map((practicalClass) => (
            <div key={practicalClass.practicalClassId}>
              <span className="add-rpd__educational-unit">
                {"Тема №" +
                  practicalClass.topicId +
                  " " +
                  practicalClass.practicalClassName}
              </span>
              <Input
                key={practicalClass.practicalClassId}
                inputValue={
                  practicalClassesInputValue[practicalClass.practicalClassId]
                }
                register={register(`${practicalClass.practicalClassName}`, {
                  onChange: (e) => practicalClassHoursHandler(e.target),
                  required: true,
                })}
                id="practicalClassHours"
                label="Количество часов"
                variant="outlined"
              />
            </div>
          ))}
        </div>
        <span className="add-rpd__helper">
          {"Практических часов: " + disciplinePracticalHours}
        </span>
        <div>
          <span className="add-rpd__local-title">
            Добавление самостоятельной работы студента
          </span>
          {topics.map((topic) => (
            <div key={topic.id}>
              <span className="add-rpd__educational-unit">
                {"Тема №" + topic.id + " Самостоятельная работа"}
              </span>
              <Input
                key={topic.id}
                inputValue={selfStudyInputValue[topic.id]}
                register={register(`${topic.id}`, {
                  onChange: (e) => selfStudyHoursHandler(e.target),
                  required: true,
                })}
                id="selfStudyHours"
                label="Количество часов"
                variant="outlined"
              />
            </div>
          ))}
          <span className="add-rpd__helper">
            {"Количество часов на самостоятельную работу: " + selfStudyHours}
          </span>
        </div>
        <div>
          <span className="add-rpd__local-title">Добавление контроля</span>
          <div>
            <span className="add-rpd__educational-unit">
              Количество часов на контроль
            </span>
            <Input
              inputValue={additionalHours}
              register={register("additionalHours", {
                onChange: (e) => setAdditionalHours(e.target.value),
                required: true,
              })}
              id="additionalHours"
              label="Количество часов"
              variant="outlined"
            />
          </div>
          <span className="add-rpd__helper">
            {"Часы на контроль: " + additionalHours}
          </span>
        </div>

        <div>
          <span className="add-rpd__local-title">Добавление компетенций</span>
          {disciplineCompetences.map((competence) => (
            <div className="add-rpd__education-unit-competence" key={competence.id}>
              <Checkbox
                onChange={(e) => competenceHandler(e.target.value)}
                value={competence.id}
                {...CheckboxLabel}
              />
              {competence.competenceType}
              <br />
              {competence.competenceCode}
              {competence.competenceName}
              <br />
              {competence.indicatorCode}
              {competence.indicatorName}
              <br />
            </div>
          ))}
        </div>
        <OutlinedButton type="submit" text="Добавить РПД" />
      </Box>
    </div>
  );
}
