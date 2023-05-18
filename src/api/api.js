import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_LOCALHOST,
  timeout: 1000,
});

export const getAllCompetences = async () => {
  return await instance.get("/competence/getAllCompetences");
};

export const getAllDisciplines = async () => {
  return await instance.get("/discipline/getAllDisciplines");
};

export const getDiscipline = async (fullName) => {
  return await instance.get("/discipline/getDiscipline", {
    params: { fullName },
  });
};

export const getAllTopics = async (disciplineId) => {
  return await instance.get("/topic/getAllTopics", {
    params: { disciplineId },
  });
};

export const getTopic = async (topicName) => {
  return await instance.get("/topic/getTopic", {
    params: { topicName },
  });
};

export const getAllLaboratoryClasses = async (disciplineId, topicId) => {
  return await instance.get("/LaboratoryClass/getAllLaboratoryClasses", {
    params: { disciplineId, topicId },
  });
};

export const getLaboratoryClass = async (laboratoryClassName) => {
  return await instance.get("/LaboratoryClass/getLaboratoryClass", {
    params: { laboratoryClassName },
  });
};

export const getAllPracticalClasses = async (disciplineId, topicId) => {
  return await instance.get("/PracticalClass/getAllPracticalClasses", {
    params: { disciplineId, topicId },
  });
};

export const getPracticalClass = async (practicalClassName) => {
  return await instance.get("/PracticalClass/getPracticalClass", {
    params: { practicalClassName },
  });
};

export const getAllLections = async (disciplineId, topicId) => {
  return await instance.get("/lections/getAllLections", {
    params: { disciplineId, topicId },
  });
};

export const getLection = async (lectionName) => {
  return await instance.get("/lections/getLections", {
    params: { lectionName },
  });
};

export const getExamQuestion = async (question) => {
  return await instance.get("/examQuestions/getExamQuestions", {
    params: { question },
  });
};

export const getUniqueCompetence = async (
  competenceType,
  competenceCode,
  competenceName,
  indicatorCode,
  indicatorName
) => {
  return await instance.get("/competence/getUniqueCompetence", {
    params: {
      competenceType,
      competenceCode,
      competenceName,
      indicatorCode,
      indicatorName,
    },
  });
};

export const getDisciplineCompetence = async (disciplineId) => {
  return await instance.get("/discipline/getDisciplineCompetence", {
    params: { disciplineId },
  });
};

export const addDiscipline = (
  fullName,
  shortName,
  cathedra,
  studyField,
  code
) => {
  return instance({
    method: "post",
    url: "/discipline/addDiscipline",
    headers: {},
    data: {
      fullName,
      shortName,
      cathedra,
      studyField,
      code,
    },
  });
};

export const addTopic = (disciplineId, topicName) => {
  return instance({
    method: "post",
    url: "/topic/addTopic",
    headers: {},
    data: {
      disciplineId,
      topicName,
    },
  });
};

export const addLaboratoryClass = (
  disciplineId,
  topicId,
  laboratoryClassName
) => {
  return instance({
    method: "post",
    url: "/LaboratoryClass/addLaboratoryClass",
    headers: {},
    data: {
      disciplineId,
      topicId,
      laboratoryClassName,
    },
  });
};

export const addPracticalClass = (
  disciplineId,
  topicId,
  practicalClassName
) => {
  return instance({
    method: "post",
    url: "/PracticalClass/addPracticalClass",
    headers: {},
    data: {
      disciplineId,
      topicId,
      practicalClassName,
    },
  });
};

export const addLection = (disciplineId, topicId, lectionName) => {
  return instance({
    method: "post",
    url: "/lections/addLections",
    headers: {},
    data: {
      disciplineId,
      topicId,
      lectionName,
    },
  });
};

export const addExamQuestion = (disciplineId, topicId, question) => {
  return instance({
    method: "post",
    url: "/examQuestions/addExamQuestions",
    headers: {},
    data: {
      disciplineId,
      topicId,
      question,
    },
  });
};

export const addCompetence = (
  competenceType,
  competenceCode,
  competenceName,
  indicatorCode,
  indicatorName
) => {
  return instance({
    method: "post",
    url: "/competence/addCompetence",
    headers: {},
    data: {
      competenceType,
      competenceCode,
      competenceName,
      indicatorCode,
      indicatorName,
    },
  });
};

export const addDisciplineCompetence = (disciplineId, competenceId) => {
  return instance({
    method: "post",
    url: "/discipline/addDisciplineCompetence",
    headers: {},
    data: {
      disciplineId,
      competenceId,
    },
  });
};
