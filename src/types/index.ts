export interface BaseRow {
  id: string | number;
  name: string;
}

export interface Discipline {
  disciplineId: string;
  fullName: string;
  shortName: string;
  code: string;
  catherdra: string;
  studyField: string;
}

export interface Topic {
  topicId: string;
  disciplineId: number;
  topicName: string;
}

export interface PracticalClass extends BaseRow {
  topicId: string;
  practicalClassId: number;
  practicalClassName: string;
}

export interface LaboratoryClass extends BaseRow {
  topicId: number;
  laboratoryClassId: number;
  laboratoryClassName: string;
}

export interface Lection extends BaseRow {
  topicId: number;
  lectionId: number;
  lectionName: string;
}

export interface ExamQuestion extends BaseRow {
  topicId: number;
  examQuestionId: number;
  disciplineId: number;
  examQuestionName: string;
}

export interface Competence {
  competenceId: number;
  competenceType: string;
  competenceCode: string;
  competenceName: string;
  indicatorCode: string;
  indicatorName: string;
}

type TeacherRank =
  | "Ассистент"
  | "Преподаватель"
  | "Старший преподаватель"
  | "Доцент"
  | "Профессор";

export interface Teacher {
  fullName: string;
  email: string;
  password: string;
  rank: TeacherRank;
  position: string;
}
