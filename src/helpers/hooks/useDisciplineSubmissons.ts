import { FieldValues } from "react-hook-form";
import * as api from "../../api/api";
import { Discipline, Topic } from "../../types";

export const useDisciplineSubmissions = (
  discipline: Partial<Discipline> | null,
  topic: Partial<Topic> | null,
  setDiscipline: (discipline: Partial<Discipline>) => void,
  setTopic: (topic: Partial<Topic>) => void,
  setTopicCompetenceDisabled: (disabled: boolean) => void,
  setLessonsDisabled: (disabled: boolean) => void
) => {
  const submitDiscipline = async (data: FieldValues) => {
    const { fullName, shortName, cathedra, studyField, code } = data;

    try {
      await api.addDiscipline(fullName, shortName, cathedra, studyField, code);
      const response = await api.getAllDisciplines();
      setDiscipline({ ...response.data });
      setTopicCompetenceDisabled(false);
    } catch (error) {
      console.error(error);
    }
  };

  const submitTopic = async (data: FieldValues) => {
    const { topicName } = data;
    try {
      const { topicId } = await api.addTopic(
        discipline!.disciplineId!,
        String(topicName)
      );

      const response = await api.getTopic(topicId);
      setTopic({ ...response.data });
      setLessonsDisabled(false);
    } catch (error) {
      console.error(error);
    }
  };

  const submitLaboratoryClass = async (data: FieldValues) => {
    const { laboratoryClassName } = data;
    try {
      await api.addLaboratoryClass(topic!.topicId!, laboratoryClassName);
      // await api.getLaboratoryClass(laboratoryClassName);
    } catch (error) {
      console.error(error);
    }
  };

  const submitPracticalClass = async (data: FieldValues) => {
    const { practicalClassName } = data;
    try {
      await api.addPracticalClass(topic!.topicId!, practicalClassName);
      // await api.getPracticalClass(practicalClassName);
    } catch (error) {
      console.error(error);
    }
  };

  const submitLection = async (data: FieldValues) => {
    const { lectionName } = data;
    try {
      await api.addLection(
        // discipline!.disciplineId!,
        topic!.topicId!,
        String(lectionName)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const submitExamQuestion = async (data: FieldValues) => {
    const { examQuestionName } = data;
    try {
      await api.addExamQuestion(
        discipline!.disciplineId!,
        topic!.topicId!,
        examQuestionName
      );
      // await api.getExamQuestion(question);
    } catch (error) {
      console.error(error);
    }
  };

  const submitCompetence = async (data: FieldValues) => {
    const {
      competenceType,
      competenceCode,
      competenceName,
      indicatorCode,
      indicatorName,
    } = data;

    console.log(discipline);

    try {
      await api.addCompetence(
        discipline?.disciplineId!,
        competenceType,
        competenceCode,
        competenceName,
        indicatorCode,
        indicatorName
      );
      // const response = await api.getUniqueCompetence(
      //   competenceType,
      //   competenceCode,
      //   competenceName,
      //   indicatorCode,
      //   indicatorName
      // );
      // await api.addDisciplineCompetence(
      //   discipline!.disciplineId!,
      //   response.data.id
      // );
    } catch (error) {
      console.error(error);
    }
  };

  return {
    submitDiscipline,
    submitTopic,
    submitLaboratoryClass,
    submitPracticalClass,
    submitLection,
    submitExamQuestion,
    submitCompetence,
  };
};
