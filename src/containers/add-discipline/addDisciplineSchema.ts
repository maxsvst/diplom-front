import { object, string } from "yup";

export const disciplineSchema = object({
  fullName: string()
    .required("Полное название дисциплины должно быть заполнено"),
  profileName: string()
    .required("Наименование профиля должно быть заполнено"),
  studyField: string()
    .required("Направление обучения должно быть заполнено"),
  studyFieldCode: string()
    .required("Код направления обучения должен быть заполнен"),
  code: string().required("Код дисциплины должнен быть заполнен"),
});

export const topicSchema = object({
  topicName: string().required("Название темы должно быть заполнено"),
});

export const laboratoryClassSchema = object({
  laboratoryClassName: string()
    .required("Название лабораторной работы должно быть заполнено"),
});

export const practicalClassSchema = object({
  practicalClassName: string()
    .required()
    .min(1, "Название практической работы должно быть заполнено"),
});

export const lectionSchema = object({
  lectionName: string()
    .required("Название лекции должно быть заполнено"),
});

export const purposeSchema = object({
  purposeName: string()
    .required("Поле цели дисциплины должно быть заполнено"),
});

export const objectiveSchema = object({
  objectiveName: string()
    .required()
    .min(1, "Поле задачи дисциплины должно быть заполнено"),
});

export const examQuestionSchema = object({
  examQuestionName: string()
    .required("Поле вопроса к экзамену должно быть заполнено"),
});

export const competenceSchema = object({
  competenceType: string()
    .required("Тип компетенции должен быть заполнен"),
  competenceCode: string()
    .required("Код компетенции должен быть заполнен"),
  competenceName: string()
    .required("Имя компетенции должно быть заполнено"),
  indicatorCode: string()
    .required("Код индикатора должен быть заполнен"),
  indicatorName: string()
    .required("Имя индикатора должно быть заполнено"),
});
