import React, { useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";

import * as api from "../../api/api";
import Input from "../../blocks/input/Input";
import OutlinedButton from "../../blocks/outlined-button/OutlinedButton";

const initialState = {
  editCompetence: false,
  disciplines: [],
  previousDiscipline: {},
  previousLaboratoryClass: {},
  previousPracticalClass: {},
  previousLection: {},
  previousExamQuestion: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "editCompetence":
      return {
        ...state,
        editCompetence: action.payload,
      };
    case "disciplines":
      return {
        ...state,
        disciplines: action.payload,
      };
    case "disciplineData":
      return {
        ...state,
        previousDiscipline: action.payload.previousDiscipline,
        previousLaboratoryClass: action.payload.previousLaboratoryClass,
        previousPracticalClass: action.payload.previousPracticalClass,
        previousLection: action.payload.previousLection,
        previousExamQuestion: action.payload.previousExamQuestion,
      };
    default:
      return state;
  }
};

export default function EditDiscipline() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { register, handleSubmit } = useForm();

  // useEffect(() => {
  //   api
  //     .getAllDisciplines()
  //     .then((response) =>
  //       dispatch({ type: "disciplines", payload: [...response.data] })
  //     );
  // }, []);

  const disciplineClickHandler = async (id) => {
    const discipline = await api.getDiscipline(id);
    const disciplineId = discipline.data.id;

    const [laboratoryClass, practicalClass, lection, examQuestion] =
      await Promise.all([
        api.getLaboratoryClass(disciplineId),
        api.getPracticalClass(disciplineId),
        api.getLection(disciplineId),
        api.getExamQuestion(disciplineId),
      ]);

    dispatch({
      type: "disciplineData",
      payload: {
        previousDiscipline: discipline.data,
        previousLaboratoryClass: laboratoryClass.data,
        previousPracticalClass: practicalClass.data,
        previousLection: lection.data,
        previousExamQuestion: examQuestion.data,
      },
    });
  };

  return (
    <>
      {state.disciplines.map((item) => (
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
          <Input
            register={register("fullName")}
            id="fullName"
            label="Название дисциплины"
            defaultValue={
              JSON.stringify(state.previousDiscipline) !== "{}"
                ? state.previousDiscipline.fullName
                : ""
            }
            variant="outlined"
          />

          <Input
            register={register("shortName")}
            id="shortName"
            label="Сокращённое название"
            defaultValue={
              JSON.stringify(state.previousDiscipline) !== "{}"
                ? state.previousDiscipline.shortName
                : ""
            }
            variant="outlined"
          />

          <Input
            register={register("cathedra")}
            id="cathedra"
            label="Кафедра"
            defaultValue={
              JSON.stringify(state.previousDiscipline) !== "{}"
                ? state.previousDiscipline.cathedra
                : ""
            }
            variant="outlined"
          />

          <Input
            register={register("studyField")}
            id="studyField"
            label="Направление"
            defaultValue={
              JSON.stringify(state.previousDiscipline) !== "{}"
                ? state.previousDiscipline.studyField
                : ""
            }
            variant="outlined"
          />

          <Input
            register={register("code")}
            id="code"
            label="Шифр"
            defaultValue={
              JSON.stringify(state.previousDiscipline) !== "{}"
                ? state.previousDiscipline.code
                : ""
            }
            variant="outlined"
          />
        </div>
        <div>
          <Input
            register={register("topicName")}
            id="topicName"
            label="Тема"
            variant="outlined"
          />
        </div>
        <div>
          <Input
            register={register("laboratoryClassName")}
            id="laboratoryClassName"
            label="Лабораторное занятие"
            defaultValue={
              JSON.stringify(state.previousLaboratoryClass) !== "{}"
                ? state.previousLaboratoryClass.laboratoryClassName
                : ""
            }
          />

          <Input
            register={register("practicalClassName")}
            id="practicalClassName"
            label="Практическое занятие"
            defaultValue={
              JSON.stringify(state.previousPracticalClass) !== "{}"
                ? state.previousPracticalClass.practicalClassName
                : ""
            }
          />

          <Input
            register={register("lectionsName")}
            id="lectionsName"
            label="Лекция"
            defaultValue={
              JSON.stringify(state.previousLection) !== "{}"
                ? state.previousLection.lectionName
                : ""
            }
          />

          <Input
            register={register("question")}
            id="question"
            label="Вопросы к экзамену"
            defaultValue={
              JSON.stringify(state.previousExamQuestion) !== "{}"
                ? state.previousExamQuestion.question
                : ""
            }
          />
        </div>
        {state.editCompetence && (
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
          onClick={() =>
            dispatch({ type: "editCompetence", payload: !state.editCompetence })
          }
        >
          Добавить компетенцию
        </Button>
        <OutlinedButton type="submit" text="Отправить" />
      </Box>
    </>
  );
}
