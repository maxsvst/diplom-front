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
  OBJECTIVE_METHODS,
  PRACTICAL_CLASS_METHODS,
  PURPOSE_METHODS,
  RPD_COMPETENCE_METHODS,
  RPD_LABORATORY_CLASS_METHODS,
  RPD_LECTION_METHODS,
  RPD_METHODS,
  RPD_PRACTICAL_CLASS_METHODS,
  RPD_TOPIC_METHODS,
  TOPIC_METHODS,
} from "../helpers/routes";
import { Dayjs } from "dayjs";

type Params = { disciplineId: string } | { topicId: string };

const instance = axios.create({
  baseURL: "http://localhost:8080",
  // timeout: 1000,
});

export const login = async ({ email, password }: FieldValues) => {
  try {
    try {
      const { data } = await instance.post('/auth/login', {
        email,
        password,
      });
      return data;
    } catch (error) {
      throw error
    }
  } catch (error) {
    throw error
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

// export const getUniqueRpd = async (
//   disciplineId: number,
//   rpdTotalHours: number,
//   rpdLectionHours: number,
//   rpdPracticalHours: number,
//   rpdLaboratoryHours: number,
//   rpdSelfstudyHours: number,
//   rpdAdditionalHours: number,
//   year: number
// ) => {
//   return await instance.get("/rpd/getUniqueRpd", {
//     params: {
//       disciplineId,
//       rpdTotalHours,
//       rpdLectionHours,
//       rpdPracticalHours,
//       rpdLaboratoryHours,
//       rpdSelfstudyHours,
//       rpdAdditionalHours,
//       year,
//     },
//   });
// };

export const getDiscipline = async (disciplineId: string) => {
  try {
    const { data } = await instance.get(DISCIPLINE_METHODS.GET, {
      params: { disciplineId },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
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
  try {
    const { data } = await instance.get(TOPIC_METHODS.GET, {
      params: { topicId },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllPurposes = async (disciplineId: string) => {
  try {
    const { data } = await instance.get(PURPOSE_METHODS.GET_ALL, {
      params: { disciplineId },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPurpose = async (purposeId: string) => {
  try {
    const { data } = await instance.get(PURPOSE_METHODS.GET, {
      params: { purposeId },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllObjectives = async (disciplineId: string) => {
  try {
    const { data } = await instance.get(OBJECTIVE_METHODS.GET_ALL, {
      params: { disciplineId },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getObjective = async (objectiveId: string) => {
  try {
    const { data } = await instance.get(OBJECTIVE_METHODS.GET, {
      params: { objectiveId },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
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
  try {
    const { data } = await instance.get(LABORATORY_CLASS_METHODS.GET, {
      params: { laboratoryClassId },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
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
  try {
    const { data } = await instance.get(PRACTICAL_CLASS_METHODS.GET, {
      params: { practicalClassId },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
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

export const getLection = async (lectionId: string) => {
  try {
    const { data } = await instance.get(LECTION_METHODS.GET, {
      params: { lectionId },
    });
    return data;
  } catch (error) {
    console.error(error);
  }

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

export const uploadXlsx = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append('file', file); // 'file' должно соответствовать имени поля на сервере

    const { data } = await instance.post('/xlsx/upload-xlsx', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data; // Возвращаем данные, полученные от сервера

  } catch (error) {
    // Обработка ошибок (можно добавить более детальную обработку)
    console.error('Ошибка при отправке XLSX:', error);
    throw error; // Пробрасываем ошибку дальше, чтобы ее можно было обработать в компоненте
  }
};

export const addDiscipline = async (
  code: string,
  fullName: string,
  profileName: string,
  studyField: string,
  studyFieldCode: string,
) => {
  try {
    const { data } = await instance.post(DISCIPLINE_METHODS.ADD, {
      fullName,
      profileName,
      studyField,
      studyFieldCode,
      code,
    });
    return data;
  } catch (error) {
    throw error
  }
};

export const addTopic = async (disciplineId: string, topicName: string) => {
  try {
    const { data } = await instance.post(TOPIC_METHODS.ADD, {
      disciplineId,
      topicName,
    });
    return data;
  } catch (error) {
    throw error
  }
};

export const addPurpose = async (disciplineId: string, purposeName: string) => {
  try {
    const { data } = await instance.post(PURPOSE_METHODS.ADD, {
      disciplineId,
      purposeName,
    });
    return data;
  } catch (error) {
    throw error
  }
};

export const addObjective = async (disciplineId: string, objectiveName: string) => {
  try {
    const { data } = await instance.post(OBJECTIVE_METHODS.ADD, {
      disciplineId,
      objectiveName,
    });
    return data;
  } catch (error) {
    throw error
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
    throw error
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
    throw error
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
    throw error
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
    throw error
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
    throw error
  }
};

export const addDisciplineCompetence = async (
  disciplineId: string,
  competenceId: string
) => {
  try {
    const { data } = await instance.post(DISCIPLINE_COMPETENCE_METHODS.ADD, {
      disciplineId,
      competenceId,
    });
    return data;
  } catch (error) {
    throw error
  }
};

export const addRpd = async (data: {
  disciplineId: string,
  rpdTotalHours: number,
  rpdLectionHours: number,
  rpdPracticalHours: number,
  rpdLaboratoryHours: number,
  rpdSelfstudyHours: number,
  rpdAdditionalHours: number,
  rpdDate: Date | Dayjs,
  controlWeek: number,
  course: number,
  semester: number,
  creditUnits: number,
  controlWork: boolean,
  courseProject: boolean,
  credit: boolean,
  exam: boolean,
}
) => {
  const {
    disciplineId,
    rpdTotalHours,
    rpdLectionHours,
    rpdPracticalHours,
    rpdLaboratoryHours,
    rpdSelfstudyHours,
    rpdAdditionalHours,
    rpdDate,
    controlWeek,
    course,
    semester,
    creditUnits,
    controlWork,
    courseProject,
    credit,
    exam,
  } = data
  try {
    const { data } = await instance.post(RPD_METHODS.ADD, {
      disciplineId,
      rpdTotalHours,
      rpdLectionHours,
      rpdPracticalHours,
      rpdLaboratoryHours,
      rpdSelfstudyHours,
      rpdAdditionalHours,
      rpdDate,
      controlWeek,
      course,
      semester,
      creditUnits,
      controlWork,
      courseProject,
      credit,
      exam,
    });
    return data;
  } catch (error) {
    throw error
  }
};

export const addRpdCompetence = async (rpdId: string, competenceId: string) => {
  try {
    const { data } = await instance.post(RPD_COMPETENCE_METHODS.ADD, {
      rpdId,
      competenceId,
    });
    return data;
  } catch (error) {
    throw error
  }
};

export const addRpdLaboratoryClass = async (
  rpdId: string,
  laboratoryClassId: string,
  laboratoryHours: number
) => {
  try {
    const { data } = await instance.post(RPD_LABORATORY_CLASS_METHODS.ADD, {
      rpdId,
      laboratoryClassId,
      laboratoryHours,
    });
    return data;
  } catch (error) {
    throw error
  }
};

export const addRpdPracticalClass = async (
  rpdId: string,
  practicalClassId: string,
  practicalHours: number
) => {
  try {
    const { data } = await instance.post(RPD_PRACTICAL_CLASS_METHODS.ADD, {
      rpdId,
      practicalClassId,
      practicalHours,
    });
    return data;
  } catch (error) {
    throw error
  }
};

export const addRpdLections = async (
  rpdId: string,
  lectionId: string,
  lectionHours: number
) => {
  try {
    const { data } = await instance.post(RPD_LECTION_METHODS.ADD, {
      rpdId,
      lectionId,
      lectionHours,
    });
    return data;
  } catch (error) {
    throw error
  }
};

export const addRpdTopic = async (
  rpdId: string,
  topicId: string,
  topicTotalHours: number,
  topicLectionHours: number,
  topicPracticalHours: number,
  topicLaboratoryHours: number,
  topicSelfstudyHours: number
) => {
  try {
    const { data } = await instance.post(RPD_TOPIC_METHODS.ADD, {
      rpdId,
      topicId,
      topicTotalHours,
      topicLectionHours,
      topicPracticalHours,
      topicLaboratoryHours,
      topicSelfstudyHours,
    });
    return data;
  } catch (error) {
    throw error
  }
};

export const deletePurpose = async (purposeId: string) => {
  try {
    const { data } = await instance.delete(PURPOSE_METHODS.DELETE, {
      params: { purposeId },
    });
    return data;
  } catch (error) {
    throw error
  }
};

export const deleteObjective = async (objectiveId: string) => {
  try {
    const { data } = await instance.delete(OBJECTIVE_METHODS.DELETE, {
      params: { objectiveId },
    });
    return data;
  } catch (error) {
    throw error
  }
};

export const deleteLection = async (lectionId: string) => {
  try {
    const { data } = await instance.delete(LECTION_METHODS.DELETE, {
      params: { lectionId },
    });
    return data;
  } catch (error) {
    throw error
  }
};

export const deleteLaboratoryClass = async (laboratoryClassId: string) => {
  try {
    const { data } = await instance.delete(LABORATORY_CLASS_METHODS.DELETE, {
      params: { laboratoryClassId },
    });
    return data;
  } catch (error) {
    throw error
  }
};

export const deletePracticalClass = async (practicalClassId: string) => {
  try {
    const { data } = await instance.delete(PRACTICAL_CLASS_METHODS.DELETE, {
      params: { practicalClassId },
    });
    return data;
  } catch (error) {
    throw error
  }
};

export const deleteExamQuestion = async (examQuestionId: string) => {
  try {
    const { data } = await instance.delete(EXAM_QUESTION_METHODS.DELETE, {
      params: { examQuestionId },
    });
    return data;
  } catch (error) {
    throw error
  }
};

export const deleteCompetence = async (competenceId: string) => {
  try {
    const { data } = await instance.delete(COMPETENCE_METHODS.DELETE, {
      params: { competenceId },
    });
    return data;
  } catch (error) {
    throw error
  }
};

export const importData = async () => {
  try {
    await instance.get("/document/import-data")
  } catch (error) {
    throw error
  }
};

export const createDocument = async (rpdId: string) => {
  try {
    const accessToken = localStorage.getItem('access-token'); // Получаем токен из localStorage

    const { data } = await instance.get("/document/create-document", {
      responseType: "blob",
      params: { rpdId },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },);
    return data;
  } catch (error) {
    throw error
  }
};

export const sendPrompt = async (prompt: string) => {
  try {
    const { data } = await instance.post('/ollama/ollama', {
      prompt,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return data;
  } catch (error) {
    throw error
  }
};
