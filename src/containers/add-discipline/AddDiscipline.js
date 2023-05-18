import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";

import * as yup from "./addDisciplineSchema";
import * as api from "../../api/api";
import OutlinedButton from "../../blocks/outlined-button/OutlinedButton";
import Input from "../../blocks/input/Input";

import { isObjectEmpty } from "../../helpers/common";

export default function AddDiscipline() {
  const [topicCompetenceDisabled, setTopicCompetenceDisabled] = useState(true);
  const [lessonsDisabled, setLessonsDisabled] = useState(true);
  const [addCompetence, setAddCompetence] = useState(false);
  const [discipline, setDiscipline] = useState({});
  const [topic, setTopic] = useState({});

  const { register: disciplineValidation, handleSubmit: handleDiscipline } =
    useForm({
      resolver: yupResolver(yup.disciplineSchema),
    });

  const { register: topicValidation, handleSubmit: handleTopic } = useForm({
    resolver: yupResolver(yup.topicSchema),
  });

  const {
    register: laboratoryClassValidation,
    handleSubmit: handlelaboratoryClass,
  } = useForm({
    resolver: yupResolver(yup.laboratoryClassSchema),
  });

  const {
    register: practicalClassValidation,
    handleSubmit: handlePracticalClass,
  } = useForm({
    resolver: yupResolver(yup.practicalClassSchema),
  });

  const { register: lectionValidation, handleSubmit: handleLection } = useForm({
    resolver: yupResolver(yup.lectionSchema),
  });

  const { register: examQuestionValidation, handleSubmit: handleExamQuestion } =
    useForm({
      resolver: yupResolver(yup.examQuestionSchema),
    });

  const { register: competenceValidation, handleSubmit: handleCompetence } =
    useForm({
      resolver: yupResolver(yup.competenceSchema),
    });

  const submitDiscipline = async (data) => {
    const { fullName, shortName, cathedra, studyField, code } = data;

    try {
      await api.addDiscipline(fullName, shortName, cathedra, studyField, code);
      let response = await api.getDiscipline(fullName);
      setDiscipline({ ...response.data });
      setTopicCompetenceDisabled(false);
    } catch (error) {
      console.error(error);
    }
  };

  const submitTopic = async (data) => {
    const { topicName } = data;
    console.log("Дисциплина");
    try {
      await api.addTopic(discipline.id, topicName);
      let response = await api.getTopic(topicName);
      setTopic({ ...response.data });
      setLessonsDisabled(false);
    } catch (error) {
      console.error(error);
    }
  };

  const submitLaboratoryClass = async (data) => {
    const { laboratoryClassName } = data;

    try {
      await api.addLaboratoryClass(
        discipline.id,
        topic.id,
        laboratoryClassName
      );
      await api.getLaboratoryClass(laboratoryClassName);
    } catch (error) {
      console.error(error);
    }
  };

  const submitPracticalClass = async (data) => {
    const { practicalClassName } = data;

    try {
      await api.addPracticalClass(discipline.id, topic.id, practicalClassName);
      await api.getPracticalClass(practicalClassName);
    } catch (error) {
      console.error(error);
    }
  };

  const submitLection = async (data) => {
    const { lectionName } = data;

    try {
      await api.addLection(discipline.id, topic.id, lectionName);
      await api.getLection(lectionName);
    } catch (error) {
      console.error(error);
    }
  };

  const submitExamQuestion = async (data) => {
    const { question } = data;

    try {
      await api.addExamQuestion(discipline.id, topic.id, question);
      await api.getExamQuestion(question);
    } catch (error) {
      console.error(error);
    }
  };

  const submitCompetence = async (data) => {
    const {
      competenceType,
      competenceCode,
      competenceName,
      indicatorCode,
      indicatorName,
    } = data;

    try {
      await api.addCompetence(
        competenceType,
        competenceCode,
        competenceName,
        indicatorCode,
        indicatorName
      );
      const response = await api.getUniqueCompetence(
        competenceType,
        competenceCode,
        competenceName,
        indicatorCode,
        indicatorName
      );
      api.addDisciplineCompetence(discipline.id, response.data.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        onSubmit={handleDiscipline(submitDiscipline)}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Input
          register={disciplineValidation("fullName")}
          id="fullName"
          label="Название дисциплины"
        />

        <Input
          register={disciplineValidation("shortName")}
          id="shortName"
          label="Сокращённое название"
        />

        <Input
          register={disciplineValidation("cathedra")}
          id="cathedra"
          label="Кафедра"
        />

        <Input
          register={disciplineValidation("studyField")}
          id="studyField"
          label="Направление"
        />

        <Input register={disciplineValidation("code")} id="code" label="Шифр" />

        <OutlinedButton type="submit" text="Добавить дисциплину" />
      </Box>
      {isObjectEmpty(discipline)
        ? ""
        : `Вы добавляете тему в рамках дисциплины ${discipline.fullName}`}
      <Box
        onSubmit={handleTopic(submitTopic)}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Input
          register={topicValidation("topicName")}
          isDisabled={topicCompetenceDisabled}
          id="topicName"
          label="Тема"
        />
        <OutlinedButton
          isDisabled={topicCompetenceDisabled}
          type="submit"
          text="Добавить тему"
        />
      </Box>
      {isObjectEmpty(topic) && lessonsDisabled
        ? ""
        : `Вы добавляете занятия в рамках темы ${topic.topicName}`}
      <Box
        onSubmit={handlelaboratoryClass(submitLaboratoryClass)}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Input
          register={laboratoryClassValidation("laboratoryClassName")}
          id="laboratoryClassName"
          label="Лабораторное занятие"
          isDisabled={lessonsDisabled}
        />
        <OutlinedButton
          isDisabled={lessonsDisabled}
          type="submit"
          text="Добавить ЛЗ"
        />
      </Box>

      <Box
        onSubmit={handlePracticalClass(submitPracticalClass)}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Input
          register={practicalClassValidation("practicalClassName")}
          id="practicalClassName"
          label="Практическое занятие"
          isDisabled={lessonsDisabled}
        />
        <OutlinedButton
          isDisabled={lessonsDisabled}
          type="submit"
          text="Добавить ПЗ"
        />
      </Box>

      <Box
        onSubmit={handleLection(submitLection)}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Input
          register={lectionValidation("lectionName")}
          id="lectionName"
          label="Лекция"
          isDisabled={lessonsDisabled}
        />
        <OutlinedButton
          isDisabled={lessonsDisabled}
          type="submit"
          text="Добавить лекцию"
        />
      </Box>

      <Box
        onSubmit={handleExamQuestion(submitExamQuestion)}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Input
          register={examQuestionValidation("question")}
          id="question"
          label="Вопросы к экзамену"
          isDisabled={lessonsDisabled}
        />
        <OutlinedButton
          isDisabled={lessonsDisabled}
          type="submit"
          text="Добавить вопрос к экзамену"
        />
      </Box>

      <Button
        variant="outlined"
        onClick={() => setAddCompetence(!addCompetence)}
      >
        Показать добавление компетенции
      </Button>

      {addCompetence && (
        <Box
          onSubmit={handleCompetence(submitCompetence)}
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Input
            register={competenceValidation("competenceType")}
            id="competenceType"
            label="Тип компетенции"
            isDisabled={topicCompetenceDisabled}
          />

          <Input
            register={competenceValidation("competenceCode")}
            id="competenceCode"
            label="Код компетенции"
            isDisabled={topicCompetenceDisabled}
          />

          <Input
            register={competenceValidation("competenceName")}
            id="competenceName"
            label="Назавание компетенции"
            isDisabled={topicCompetenceDisabled}
          />

          <Input
            register={competenceValidation("indicatorCode")}
            id="indicatorCode"
            label="Код индикатора"
            isDisabled={topicCompetenceDisabled}
          />

          <Input
            register={competenceValidation("indicatorName")}
            id="indicatorName"
            label="Название индикатора"
            isDisabled={topicCompetenceDisabled}
          />
          <OutlinedButton
            isDisabled={topicCompetenceDisabled}
            type="submit"
            text="Добавить компетенцию"
          />
        </Box>
      )}
    </>
  );
}
