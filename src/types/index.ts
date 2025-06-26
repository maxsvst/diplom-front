export interface BaseRow {
  id: string | number;
  name: string;
}

export interface Discipline {
  disciplineId: string;
  fullName: string;
  code: string;
  profileName: string;
  studyField: string;
  studyFieldCode: string;
}

export interface Purpose {
  purposeId: string;
  disciplineId: string;
  purposeName: string;
}

export interface Objective {
  objectiveId: string;
  disciplineId: string;
  objectiveName: string;
}

export interface Topic {
  topicId: string;
  disciplineId: string;
  topicName: string;
}

export interface Concept {
  topicId: string;
  conceptId: string;
  conceptName: string;
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
  disciplineId: string;
  competenceId: string;
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
