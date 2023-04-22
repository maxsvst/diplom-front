import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";

import Input from "../../blocks/input/Input";
import OutlinedButton from "../../blocks/outlined-button/OutlinedButton";
import { LOCALHOST } from "../../helpers/common";

export default function EditDiscipline() {
  const [editCompetence, setEditCompetence] = useState(false);
  const [disciplines, setDisciplines] = useState([]);
  const [previousData, setPreviousData] = useState({});

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    axios(LOCALHOST + "/discipline/getAllDisciplines").then((response) => {
      //todo: Доделать фильтрацию для исключения дубликатов
      setDisciplines([...response.data]);
    });
  }, []);

  const disciplineClickHandler = async (id) => {
    // Правильно ли в 1 функции вызвыать столько запросов ? объединять ли все поля в 1 объект типа запрос.then(запрос).then(запрос)
    //
    //Хранить все в объекте data или в разных
    const data = await axios(
      LOCALHOST + "/discipline/getDiscipline?id=" + id
    ).then((response) => response.data);
    setPreviousData(data);
    await axios(LOCALHOST + "/topic/getTopic?id=" + id);
    await axios(
      LOCALHOST + "/LaboratoryClass/getLaboratoryClass?disciplineId=" + id
    );
    await axios(
      LOCALHOST + "/PracticalClass/getPracticalClass?disciplineId=" + id
    );
    await axios(LOCALHOST + "/lections/getLections?disciplineId=" + id);
    await axios(
      LOCALHOST + "/examQuestions/getExamQuestions?disciplineId=" + id
    );
  };

  console.log(previousData);

  return (
    <>
      {disciplines.map((item) => (
        <div onClick={() => disciplineClickHandler(item.id)} key={item.id}>
          {item.shortName}
        </div>
      ))}
      <Box
        onSubmit={handleSubmit()}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          {JSON.stringify(previousData) !== "{}"
            ? previousData.fullName
            : "Предыдущее название дисциплины"}
          <Input
            register={register("fullName")}
            id="fullName"
            label="Название дисциплины"
          />
        </div>
        <div>
          {JSON.stringify(previousData) !== "{}"
            ? previousData.shortName
            : "Предыдущее название дисциплины"}
          <Input
            register={register("shortName")}
            id="shortName"
            label="Сокращённое название"
          />
        </div>
        <div>
          {JSON.stringify(previousData) !== "{}"
            ? previousData.cathedra
            : "Предыдущая кафедра"}
          <Input
            register={register("cathedra")}
            id="cathedra"
            label="Кафедра"
          />
        </div>
        <div>
          {JSON.stringify(previousData) !== "{}"
            ? previousData.studyField
            : "Предыдущее направление подготовки"}
          <Input
            register={register("studyField")}
            id="studyField"
            label="Направление"
          />
        </div>
        <div>
          {JSON.stringify(previousData) !== "{}"
            ? previousData.code
            : "Предыдущий код дисциплины"}
          <Input register={register("code")} id="code" label="Шифр" />
        </div>
        <div>
          Предыдущее значение
          <Input register={register("topicName")} id="topicName" label="Тема" />
        </div>
        <div>
          Предыдущее значение
          <Input
            register={register("laboratoryClassName")}
            id="laboratoryClassName"
            label="Лабораторное занятие"
          />
        </div>
        <div>
          Предыдущее значение
          <Input
            register={register("practicalClassName")}
            id="practicalClassName"
            label="Практическое занятие"
          />
        </div>
        <div>
          Предыдущее значение
          <Input
            register={register("lectionsName")}
            id="lectionsName"
            label="Лекция"
          />
        </div>
        <div>
          Предыдущее значение
          <Input
            register={register("question")}
            id="question"
            label="Вопросы к экзамену"
          />
        </div>
        {editCompetence && (
          <Box
            onSubmit={handleSubmit()}
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              Предыдущее значение
              <Input
                register={register("competenceType")}
                id="competenceType"
                label="Тип компетенции"
              />
            </div>
            <div>
              Предыдущее значение
              <Input
                register={register("competenceCode")}
                id="competenceCode"
                label="Код компетенции"
              />
            </div>
            <div>
              Предыдущее значение
              <Input
                register={register("competenceName")}
                id="competenceName"
                label="Назавание компетенции"
              />
            </div>
            <div>
              Предыдущее значение
              <Input
                register={register("indicatorCode")}
                id="indicatorCode"
                label="Код индикатора"
              />
            </div>
            <div>
              Предыдущее значение
              <Input
                register={register("indicatorName")}
                id="indicatorName"
                label="Название индикатора"
              />
            </div>
          </Box>
        )}
        <Button
          variant="outlined"
          onClick={() => setEditCompetence(!editCompetence)}
        >
          Добавить дисциплину
        </Button>
        <OutlinedButton type="submit" text="Отправить" />
      </Box>
    </>
  );
}
