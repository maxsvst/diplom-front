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

export const getUniqueRpd = async (
  disciplineId,
  rpdTotalHours,
  rpdLectionHours,
  rpdPracticalHours,
  rpdLaboratoryHours,
  rpdSelfstudyHours,
  rpdAdditionalHours,
  year
) => {
  return await instance.get("/rpd/getUniqueRpd", {
    params: {
      disciplineId,
      rpdTotalHours,
      rpdLectionHours,
      rpdPracticalHours,
      rpdLaboratoryHours,
      rpdSelfstudyHours,
      rpdAdditionalHours,
      year,
    },
  });
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

export const getAllLaboratoryClasses = async (disciplineId) => {
  return await instance.get("/LaboratoryClass/getAllLaboratoryClasses", {
    params: { disciplineId },
  });
};

export const getLaboratoryClass = async (laboratoryClassName) => {
  return await instance.get("/LaboratoryClass/getLaboratoryClass", {
    params: { laboratoryClassName },
  });
};

export const getAllPracticalClasses = async (disciplineId) => {
  return await instance.get("/PracticalClass/getAllPracticalClasses", {
    params: { disciplineId },
  });
};

export const getPracticalClass = async (practicalClassName) => {
  return await instance.get("/PracticalClass/getPracticalClass", {
    params: { practicalClassName },
  });
};

export const getAllLections = async (disciplineId) => {
  return await instance.get("/lections/getAllLections", {
    params: { disciplineId },
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

export const addRpd = (
  disciplineId,
  rpdTotalHours,
  rpdLectionHours,
  rpdPracticalHours,
  rpdLaboratoryHours,
  rpdSelfstudyHours,
  rpdAdditionalHours,
  year
) => {
  return instance({
    method: "post",
    url: "/rpd/addRpd",
    headers: {},
    data: {
      disciplineId,
      rpdTotalHours,
      rpdLectionHours,
      rpdPracticalHours,
      rpdLaboratoryHours,
      rpdSelfstudyHours,
      rpdAdditionalHours,
      year,
    },
  });
};

export const addRpdCompetence = (rpdId, competenceId) => {
  return instance({
    method: "post",
    url: "/rpd/addRpdCompetence",
    headers: {},
    data: {
      rpdId,
      competenceId,
    },
  });
};

export const addRpdLaboratoryClass = (
  rpdId,
  laboratoryClassId,
  laboratoryHours
) => {
  return instance({
    method: "post",
    url: "/rpd/addRpdLaboratoryClass",
    headers: {},
    data: {
      rpdId,
      laboratoryClassId,
      laboratoryHours,
    },
  });
};

export const addRpdPracticalClass = (
  rpdId,
  practicalClassId,
  practicalHours
) => {
  return instance({
    method: "post",
    url: "/rpd/addRpdPracticalClass",
    headers: {},
    data: {
      rpdId,
      practicalClassId,
      practicalHours,
    },
  });
};

export const addRpdLections = (rpdId, lectionId, lectionHours) => {
  return instance({
    method: "post",
    url: "/rpd/addRpdLections",
    headers: {},
    data: {
      rpdId,
      lectionId,
      lectionHours,
    },
  });
};

export const addRpdTopic = (
  rpdId,
  topicId,
  topicTotalHours,
  topicLectionHours,
  topicPracticalHours,
  topicLaboratoryHours,
  topicSelfstudyHours
) => {
  return instance({
    method: "post",
    url: "/rpd/addRpdTopic",
    headers: {},
    data: {
      rpdId,
      topicId,
      topicTotalHours,
      topicLectionHours,
      topicPracticalHours,
      topicLaboratoryHours,
      topicSelfstudyHours,
    },
  });
};

export const createDocument = async (id) => {
  return await instance.get("/document/createDocument", {
    responseType: "blob",
    params: { id },
  });
};
