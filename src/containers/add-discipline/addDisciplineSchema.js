import { object, string } from "yup";

export const disciplineSchema = object({
  fullName: string().required().min(1, "Полное название должно быть заполнено"),
  shortName: string()
    .required()
    .min(1, "Сокращённое название должно быть заполнено"),
  cathedra: string().required().min(1, "Кафедра должна быть заполнена"),
  studyField: string()
    .required()
    .min(1, "Направление обучения должно быть заполнено"),
  code: string().required().min(1, "Код дисциплины должнен быть заполнен"),
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
  question: string()
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
