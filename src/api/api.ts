import axios from "axios";
import { Teacher } from "../types";
import { FieldValues } from "react-hook-form";
import {
  COMPETENCE_METHODS,
  DISCIPLINE_COMPETENCE_METHODS,
  DISCIPLINE_METHODS,
  EXAM_QUESTION_METHODS,
  LABORATORY_CLASS_METHODS,
  LECTION_METHODS,
  PRACTICAL_CLASS_METHODS,
  RPD_METHODS,
  TOPIC_METHODS,
} from "../helpers/routes";

type Params = { disciplineId: string } | { topicId: string };

const instance = axios.create({
  baseURL: "http://localhost:8080",
  // timeout: 1000,
});

export const login = async ({ email, password }: FieldValues) => {
  try {
    return instance({
      method: "post",
      url: "/auth/login",
      data: {
        email,
        password,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const registration = async ({
  fullName,
  email,
  password,
  rank,
  position,
}: FieldValues) => {
  try {
    return instance({
      method: "post",
      url: "/auth/registration",
      data: {
        fullName,
        email,
        password,
        rank,
        position,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllCompetences = async (params: Params) => {
  try {
    const { data } = await instance.get(COMPETENCE_METHODS.GET_ALL, {
      params: params,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllDisciplines = async () => {
  try {
    const { data } = await instance.get(DISCIPLINE_METHODS.GET_ALL);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUniqueRpd = async (
  disciplineId: number,
  rpdTotalHours: number,
  rpdLectionHours: number,
  rpdPracticalHours: number,
  rpdLaboratoryHours: number,
  rpdSelfstudyHours: number,
  rpdAdditionalHours: number,
  year: number
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

export const getDiscipline = async (disciplineId: string) => {
  return await instance.get(DISCIPLINE_METHODS.GET, {
    params: { disciplineId },
  });
};

export const getAllTopics = async (params: Params) => {
  try {
    const { data } = await instance.get(TOPIC_METHODS.GET_ALL, {
      params: params,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getTopic = async (topicId: string) => {
  return await instance.get(TOPIC_METHODS.GET, {
    params: { topicId },
  });
};

export const getAllLaboratoryClasses = async (params: Params) => {
  try {
    const { data } = await instance.get(LABORATORY_CLASS_METHODS.GET_ALL, {
      params: params,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getLaboratoryClass = async (laboratoryClassId: string) => {
  return await instance.get(LABORATORY_CLASS_METHODS.GET, {
    params: { laboratoryClassId },
  });
};

export const getAllPracticalClasses = async (params: Params) => {
  try {
    const { data } = await instance.get(PRACTICAL_CLASS_METHODS.GET_ALL, {
      params: params,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPracticalClass = async (practicalClassId: string) => {
  return await instance.get(PRACTICAL_CLASS_METHODS.GET, {
    params: { practicalClassId },
  });
};

export const getAllLections = async (params: Params) => {
  try {
    const { data } = await instance.get(LECTION_METHODS.GET_ALL, {
      params: params,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllExamQuestions = async (params: Params) => {
  try {
    const { data } = await instance.get(EXAM_QUESTION_METHODS.GET_ALL, {
      params: params,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getLection = async (lectionName: string) => {
  return await instance.get(LECTION_METHODS.GET, {
    params: { lectionName },
  });
};

export const getExamQuestion = async (question: string) => {
  return await instance.get(EXAM_QUESTION_METHODS.GET, {
    params: { question },
  });
};

export const getUniqueCompetence = async (
  competenceType: string,
  competenceCode: string,
  competenceName: string,
  indicatorCode: string,
  indicatorName: string
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

export const getDisciplineCompetence = async (disciplineId: string) => {
  return await instance.get(DISCIPLINE_COMPETENCE_METHODS.GET, {
    params: { disciplineId },
  });
};

export const addDiscipline = (
  fullName: string,
  shortName: string,
  cathedra: string,
  studyField: string,
  code: string
) => {
  return instance({
    method: "post",
    url: DISCIPLINE_METHODS.ADD,
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

export const addTopic = async (disciplineId: string, topicName: string) => {
  try {
    const { data } = await instance.post(TOPIC_METHODS.ADD, {
      disciplineId,
      topicName,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addLaboratoryClass = async (
  topicId: string,
  laboratoryClassName: string
) => {
  try {
    const { data } = await instance.post(LABORATORY_CLASS_METHODS.ADD, {
      topicId,
      laboratoryClassName,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addPracticalClass = async (
  topicId: string,
  practicalClassName: string
) => {
  try {
    const { data } = await instance.post(PRACTICAL_CLASS_METHODS.ADD, {
      topicId,
      practicalClassName,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addLection = async (topicId: string, lectionName: string) => {
  try {
    const { data } = await instance.post(LECTION_METHODS.ADD, {
      topicId,
      lectionName,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addExamQuestion = async (
  disciplineId: string,
  topicId: string,
  examQuestionName: string
) => {
  try {
    const { data } = await instance.post(EXAM_QUESTION_METHODS.ADD, {
      disciplineId,
      topicId,
      examQuestionName,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addCompetence = async (
  disciplineId: string,
  competenceType: string,
  competenceCode: string,
  competenceName: string,
  indicatorCode: string,
  indicatorName: string
) => {
  try {
    const { data } = await instance.post(COMPETENCE_METHODS.ADD, {
      disciplineId,
      competenceType,
      competenceCode,
      competenceName,
      indicatorCode,
      indicatorName,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addDisciplineCompetence = (
  disciplineId: string,
  competenceId: string
) => {
  return instance({
    method: "post",
    url: DISCIPLINE_COMPETENCE_METHODS.ADD,
    headers: {},
    data: {
      disciplineId,
      competenceId,
    },
  });
};

export const addRpd = (
  disciplineId: number,
  rpdTotalHours: number,
  rpdLectionHours: number,
  rpdPracticalHours: number,
  rpdLaboratoryHours: number,
  rpdSelfstudyHours: number,
  rpdAdditionalHours: number,
  year: number
) => {
  return instance({
    method: "post",
    url: RPD_METHODS.ADD,
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

export const addRpdCompetence = (rpdId: string, competenceId: number) => {
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
  rpdId: number,
  laboratoryClassId: number,
  laboratoryHours: number
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
  rpdId: number,
  practicalClassId: number,
  practicalHours: number
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

export const addRpdLections = (
  rpdId: number,
  lectionId: number,
  lectionHours: number
) => {
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
  rpdId: number,
  topicId: number,
  topicTotalHours: number,
  topicLectionHours: number,
  topicPracticalHours: number,
  topicLaboratoryHours: number,
  topicSelfstudyHours: number
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

export const createDocument = async (id: string) => {
  return await instance.get("/document/createDocument", {
    responseType: "blob",
    params: { id },
  });
};
