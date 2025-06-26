import { FieldValues } from "react-hook-form";
import * as api from "../../api/api";
import { Competence, Discipline, ExamQuestion, LaboratoryClass, Lection, Objective, PracticalClass, Purpose, Topic } from "../../types";

export const useDisciplineSubmissions = (
  discipline: Partial<Discipline> | null,
  topic: Partial<Topic> | null,
  setDisciplines: (disciplines: Partial<Discipline>[]) => void,
  setTopics: (topic: Partial<Topic>[]) => void,
  setPurposes: (topic: Partial<Purpose>[]) => void,
  setObjctives: (topic: Partial<Objective>[]) => void,
  setLections: (topic: Partial<Lection>[]) => void,
  setLaboratoryClasses: (topic: Partial<LaboratoryClass>[]) => void,
  setPracticalClasses: (topic: Partial<PracticalClass>[]) => void,
  setExamQuestions: (topic: Partial<ExamQuestion>[]) => void,
  setCompetences: (topic: Partial<Competence>[]) => void,
  setIsTopicModalOpen: (disabled: boolean) => void,
  setSnackbarState: (state: { open: boolean; severity: 'success' | 'error'; message: string }) => void,
) => {
  const submitDiscipline = async (data: FieldValues) => {
    const { code, fullName, profileName, studyField, studyFieldCode } = data;

    try {
      await api.addDiscipline(code, fullName, profileName, studyField, studyFieldCode);
      const disciplines = await api.getAllDisciplines();
      setDisciplines([...disciplines]);
      setSnackbarState({ open: true, severity: 'success', message: 'Дисциплина успешно добавлена' })
    } catch (error) {
      setSnackbarState({ open: true, severity: 'error', message: 'Ошибка дбавления дисциплины' })
      console.error(error);
    }
  };

  const submitTopic = async (data: FieldValues) => {
    const { topicName } = data;
    try {
      await api.addTopic(discipline!.disciplineId!, topicName);

      const topics = await api.getAllTopics({ disciplineId: discipline!.disciplineId! });
      setTopics([...topics]);
      setIsTopicModalOpen(false)
      setSnackbarState({ open: true, severity: 'success', message: 'Тема успешно добавлена' })
    } catch (error) {
      setSnackbarState({ open: true, severity: 'error', message: 'Ошибка дбавления темы' })
      console.error(error);
    }
  };

  const submitLaboratoryClass = async (data: FieldValues) => {
    const { laboratoryClassName } = data;
    try {
      await api.addLaboratoryClass(topic!.topicId!, laboratoryClassName);

      const laboratoryClasses = await api.getAllLaboratoryClasses({ topicId: topic!.topicId! })
      setLaboratoryClasses([...laboratoryClasses])
      setSnackbarState({ open: true, severity: 'success', message: 'Лабораторное занятие успешно добавлено' })
    } catch (error) {
      setSnackbarState({ open: true, severity: 'error', message: 'Ошибка дбавления лабораторного занятия' })
      console.error(error);
    }
  };

  const submitPracticalClass = async (data: FieldValues) => {
    const { practicalClassName } = data;
    try {
      await api.addPracticalClass(topic!.topicId!, practicalClassName);

      const practicalClasses = await api.getAllPracticalClasses({ topicId: topic!.topicId! })
      setPracticalClasses([...practicalClasses])
      setSnackbarState({ open: true, severity: 'success', message: 'Практическое занятие успешно добавлено' })
    } catch (error) {
      setSnackbarState({ open: true, severity: 'error', message: 'Ошибка дбавления практического занятия' })
      console.error(error);
    }
  };

  const submitLection = async (data: FieldValues) => {
    const { lectionName } = data;
    try {
      await api.addLection(topic!.topicId!, lectionName);

      const lections = await api.getAllLections({ topicId: topic!.topicId! })
      setLections([...lections])
      setSnackbarState({ open: true, severity: 'success', message: 'Лекция успешно добавлена' })
    } catch (error) {
      setSnackbarState({ open: true, severity: 'error', message: 'Ошибка дбавления лекции' })
      console.error(error);
    }
  };

  const submitPurpose = async (data: FieldValues) => {
    const { purposeName } = data;
    try {
      await api.addPurpose(discipline!.disciplineId!, purposeName);

      const purposes = await api.getAllPurposes(discipline!.disciplineId!)
      setPurposes([...purposes])
      setSnackbarState({ open: true, severity: 'success', message: 'Цель дисциплины успешно добавлена' })
    } catch (error) {
      setSnackbarState({ open: true, severity: 'error', message: 'Ошибка дбавления цели дисциплины' })
      console.error(error);
    }
  };

  const submitObjecive = async (data: FieldValues) => {
    const { objectiveName } = data;
    try {
      await api.addObjective(discipline!.disciplineId!, objectiveName);

      const objectives = await api.getAllObjectives(discipline!.disciplineId!)
      setObjctives([...objectives])
      setSnackbarState({ open: true, severity: 'success', message: 'Задача дисциплины успешно добавлена' })
    } catch (error) {
      setSnackbarState({ open: true, severity: 'error', message: 'Ошибка дбавления задачи дисциплины' })
      console.error(error);
    }
  };

  const submitExamQuestion = async (data: FieldValues) => {
    const { examQuestionName } = data;
    try {
      await api.addExamQuestion(discipline!.disciplineId!, topic!.topicId!, examQuestionName);

      const examQuestions = await api.getAllExamQuestions({ disciplineId: discipline!.disciplineId! })
      setExamQuestions([...examQuestions])
      setSnackbarState({ open: true, severity: 'success', message: 'Вопрос к экамену успешно добавлен' })
    } catch (error) {
      setSnackbarState({ open: true, severity: 'error', message: 'Ошибка дбавления вопроса к экзамену' })
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

    try {
      await api.addCompetence(
        discipline?.disciplineId!,
        competenceType,
        competenceCode,
        competenceName,
        indicatorCode,
        indicatorName
      );

      const examQuestions = await api.getAllCompetences({ disciplineId: discipline!.disciplineId! })
      setCompetences([...examQuestions])
      setSnackbarState({ open: true, severity: 'success', message: 'Компетенция успешно добавлена' })
    } catch (error) {
      setSnackbarState({ open: true, severity: 'error', message: 'Ошибка дбавления вопроса компетенции' })
      console.error(error);
    }
  };

  const deleteObjecive = async (objectiveId: string) => {
    try {
      await api.deleteObjective(objectiveId);

      const objectives = await api.getAllObjectives(discipline!.disciplineId!)
      setObjctives([...objectives])
      setSnackbarState({ open: true, severity: 'success', message: 'Задача дисциплины успешно удалена' })
    } catch (error) {
      setSnackbarState({ open: true, severity: 'error', message: 'Ошибка удаления цели дисциплины' })
      console.error(error);
    }
  };

  return {
    submitDiscipline,
    submitTopic,
    submitLaboratoryClass,
    submitPracticalClass,
    submitLection,
    submitPurpose,
    submitObjecive,
    submitExamQuestion,
    submitCompetence,
    // deleteLaboratoryClass,
    // deletePracticalClass,
    // deleteLection,
    // deletePurpose,
    deleteObjecive,
    // deleteExamQuestion,
    // deleteCompetence,
  };
};
