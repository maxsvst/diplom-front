import { object, string } from "yup";

export const disciplineSchema = object({
  fullName: string()
    .required("Полное название дисциплины должно быть заполнено")
    .min(1, "Полное название должно быть заполнено"),
  shortName: string()
    .required("Сокращённое название должно быть заполнено")
    .min(1),
  cathedra: string()
    .required("Кафедра дисциплины должна быть заполнена")
    .min(1),
  studyField: string()
    .required("Направление обучения должно быть заполнено")
    .min(1),
  code: string().required("Код дисциплины должнен быть заполнен").min(1),
});

export const topicSchema = object({
  topicName: string().required().min(1, "Название темы должно быть заполнено"),
});

export const laboratoryClassSchema = object({
  laboratoryClassName: string()
    .required()
    .min(1, "Название лабораторной работы должно быть заполнено"),
});

export const practicalClassSchema = object({
  practicalClassName: string()
    .required()
    .min(1, "Название практической работы должно быть заполнено"),
});

export const lectionSchema = object({
  lectionName: string()
    .required()
    .min(1, "Название лекции должно быть заполнено"),
});

export const examQuestionSchema = object({
  examQuestionName: string()
    .required()
    .min(1, "Поле вопроса к экзамену должно быть заполнено"),
});

export const competenceSchema = object({
  competenceType: string()
    .required()
    .min(1, "Тип компетенции должен быть заполнен"),
  competenceCode: string()
    .required()
    .min(1, "Код компетенции должен быть заполнен"),
  competenceName: string()
    .required()
    .min(1, "Имя компетенции должно быть заполнено"),
  indicatorCode: string()
    .required()
    .min(1, "Код индикатора должен быть заполнен"),
  indicatorName: string()
    .required()
    .min(1, "Имя индикатора должно быть заполнено"),
});
