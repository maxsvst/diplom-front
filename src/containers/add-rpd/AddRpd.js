import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import CheckboxInput from "../../blocks/input-checkbox/InputCheckbox";
import OutlinedButton from "../../blocks/outlined-button/OutlinedButton";

import * as api from "../../api/api";
import { useForm } from "react-hook-form";

const CheckboxLabel = { inputProps: { "aria-label": "Checkbox demo" } };

export default function AddRpd() {
  const [discipline, setDiscipline] = useState("");
  const [year, setYear] = useState("");

  const [currentDisciplineId, setCurrentDisciplineId] = useState();
  const [currentTopicId, setCurrentTopicId] = useState();

  const [pickedLaboratoryClasses, setPickedLaboratoryClasses] = useState([]);
  const [pickedPracticalClasses, setPickedPracticalClasses] = useState([]);
  const [pickedLections, setPickedLections] = useState([]);
  const [pickedCompetences, setPickedCompetences] = useState([]);

  const [topicHours, setTopicHours] = useState("");
  const [laboratoryClassHours, setLaboratoryClassHours] = useState("");

  const [disciplines, setDisciplines] = useState([]);
  const [topics, setTopics] = useState([]);
  const [laboratoryClasses, setLaboratoryClasses] = useState([]);
  const [practicalClasses, setPracticalClasses] = useState([]);
  const [lections, setLections] = useState([]);
  const [disciplineCompetences, setDisciplineCompetences] = useState([]);

  const disciplinehHndleChange = (event) => {
    setDiscipline(event.target.value);
  };

  const yearhHandleChange = (event) => {
    setYear(event.target.value);
  };

  const disciplineClick = (discipline) => {
    setCurrentDisciplineId(discipline.id);
  };

  const getAllDisciplines = async () => {
    const allDisciplines = await api.getAllDisciplines();
    setDisciplines([...allDisciplines.data]);
  };

  const getAllTopicsAndCompetence = async (currentDisciplineId) => {
    if (currentDisciplineId) {
      const topics = await api.getAllTopics(currentDisciplineId);
      setTopics([...topics.data]);
      const competences = await api.getAllCompetences();
      const competenceObjects = await api.getDisciplineCompetence(
        currentDisciplineId
      );
      const disciplineCompetences = competenceObjects.data.flatMap((item) =>
        competences.data.filter(
          (competence) => competence.id === item.competenceId
        )
      );
      setDisciplineCompetences([...disciplineCompetences]);
    }
  };

  const getLessons = async (currentDisciplineId, currentTopicId) => {
    if (currentDisciplineId && currentTopicId) {
      const laboratoryClasses = await api.getAllLaboratoryClasses(
        currentDisciplineId,
        currentTopicId
      );
      setLaboratoryClasses([...laboratoryClasses.data]);

      const practicalClasses = await api.getAllPracticalClasses(
        currentDisciplineId,
        currentTopicId
      );
      setPracticalClasses([...practicalClasses.data]);

      const lections = await api.getAllLections(
        currentDisciplineId,
        currentTopicId
      );
      setLections([...lections.data]);
    }
  };

  const { register, handleSubmit } = useForm();

  const submitRpd = async (data) => {
    console.log(data);
  };

  const topicHandler = (topic) => {
    setCurrentTopicId(topic);
  };

  const topicHoursHandler = (topicHours) => {
    setTopicHours(topicHours);
  };

  const laboratoryClassHandler = (laboratoryClass) => {
    const isItemExist = pickedLaboratoryClasses.filter(
      (item) => laboratoryClass === item
    );
    if (isItemExist.length !== 0) {
      setPickedLaboratoryClasses(
        pickedLaboratoryClasses.filter((item) => item !== laboratoryClass)
      );
    } else {
      setPickedLaboratoryClasses([...pickedLaboratoryClasses, laboratoryClass]);
    }
  };

  const laboratoryClassHoursHandler = (laboratoryClassHours) => {
    setLaboratoryClassHours(laboratoryClassHours.target.value);
    console.log(laboratoryClassHours);
  };

  const practicalClassHandler = (practicalClasses) => {
    const isItemExist = pickedPracticalClasses.filter(
      (item) => practicalClasses === item
    );
    if (isItemExist.length !== 0) {
      setPickedPracticalClasses(
        pickedPracticalClasses.filter((item) => item !== practicalClasses)
      );
    } else {
      setPickedPracticalClasses([...pickedPracticalClasses, practicalClasses]);
    }
  };

  const lectionHandler = (lections) => {
    const isItemExist = pickedLections.filter((item) => lections === item);
    if (isItemExist.length !== 0) {
      setPickedLections(pickedLections.filter((item) => item !== lections));
    } else {
      setPickedLections([...pickedLections, lections]);
    }
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

  useEffect(() => {
    getAllDisciplines();
    getAllTopicsAndCompetence(currentDisciplineId);
    getLessons(currentDisciplineId, currentTopicId);
  }, [currentDisciplineId, currentTopicId]);

  return (
    <>
      <Box
        onSubmit={handleSubmit(submitRpd)}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth>
          <InputLabel>Дисциплина</InputLabel>
          <Select
            {...register("discipline", { required: true })}
            id="discipline"
            value={discipline}
            label="discipline"
            onChange={disciplinehHndleChange}
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
        <FormControl fullWidth>
          <InputLabel>Год дисциплины</InputLabel>
          <Select
            {...register("year", { required: true })}
            value={year}
            label="year"
            onChange={yearhHandleChange}
          >
            <MenuItem value={2023}>2023</MenuItem>
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
          </Select>
        </FormControl>
        <div>
          ДОБАВЛЕНИЕ ТЕМ
          {topics.map((topic) => (
            <CheckboxInput
              key={topic.id}
              childKey={topic.id}
              onChange={(e) => topicHandler(e.target.value)}
              checkboxValue={topic.id}
              teachingUnitName={topic.topicName}
              inputValue={topicHours}
              register={register(`${topic.topicName}`, {
                onChange: (e) => topicHoursHandler(e.target.value),
                required: true,
              })}
              id="topicHours"
            />
          ))}
          <div>
            ДОБАВЛЕНИЕ ЛР
            {laboratoryClasses.map((laboratoryClass) => (
              <CheckboxInput
                key={laboratoryClass.laboratoryClassId}
                childKey={laboratoryClass.laboratoryClassId}
                onChange={(e, laboratoryClass) =>
                  laboratoryClassHandler(e.target.value, laboratoryClass)
                }
                checkboxValue={laboratoryClass.laboratoryClassId}
                teachingUnitName={laboratoryClass.laboratoryClassName}
                inputValue={laboratoryClassHours}
                register={register(`${laboratoryClass.laboratoryClassName}`, {
                  onChange: (e, laboratoryClass) =>
                    laboratoryClassHoursHandler(
                      e
                    ),
                  required: true,
                })}
                id="laboratoryClassHours"
              />
            ))}
          </div>
          <div>
            ДОБАВЛЕНИЕ ПЗ
            {practicalClasses.map((practicalClass) => (
              <CheckboxInput
                key={practicalClass.practicalClassId}
                childKey={practicalClass.practicalClassId}
                onChange={(e) => practicalClassHandler(e.target.value)}
                checkboxValue={practicalClass.practicalClassId}
                teachingUnitName={practicalClass.practicalClassName}
                // inputValue={}
                register={register(`${practicalClass.practicalClassName}`, {
                  // onChange: (e) => topicHoursHandler(e.target.value),
                  required: true,
                })}
                id="practicalClassHours"
              />
            ))}
          </div>
          <div>
            ДОБАВЛЕНИЕ ЛЕКЦИЙ
            {lections.map((lection) => (
              <CheckboxInput
                key={lection.id}
                childKey={lection.id}
                onChange={(e) => lectionHandler(e.target.value)}
                checkboxValue={lection.id}
                teachingUnitName={lection.lectionName}
                // inputValue={}
                register={register(`${lection.lectionName}`, {
                  // onChange: (e) => topicHoursHandler(e.target.value),
                  required: true,
                })}
                id="lectionHours"
              />
            ))}
          </div>
        </div>
        <div>
          ДОБАВЛЕНИЕ КОМПЕТЕНЦИЙ
          {disciplineCompetences.map((competence) => (
            <div key={competence.id}>
              <Checkbox
                onChange={(e) => competenceHandler(e)}
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
    </>
  );
}
