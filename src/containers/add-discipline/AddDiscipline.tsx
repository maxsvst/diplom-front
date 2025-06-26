import { useEffect, useState } from "react";
import { useDisciplineForms } from "../../helpers/hooks/useDisciplineForms";
import { useDisciplineSubmissions } from "../../helpers/hooks/useDisciplineSubmissons";
import { DisciplineForm } from "../../blocks/forms/DisciplineForm";
import { TopicForm } from "../../blocks/forms/TopicForm";
import { LectionForm } from "../../blocks/forms/LectionForm";
import { LaboratoryClassForm } from "../../blocks/forms/LaboratoryClassFrom";
import { PracticalClassForm } from "../../blocks/forms/PracticalClassFrom";
import { ExamQuestionForm } from "../../blocks/forms/ExamQuestionForm";
import { CompetenceForm } from "../../blocks/forms/CompetenceForm";
import * as api from "../../api/api";
import { DisciplineSelector } from "../../blocks/discipline-selector/DisciplineSelector";
import { Alert, Box, Button, CircularProgress, FormControl, Input, InputLabel, MenuItem, Modal, Select, Snackbar } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { TopicSelector } from "../../blocks/topic-selector/TopicSelector";
import {
  Competence,
  Discipline,
  ExamQuestion,
  LaboratoryClass,
  Lection,
  Objective,
  PracticalClass,
  Purpose,
  Topic,
} from "../../types";

import "./add-discipline.css";
import { PurposeForm } from "../../blocks/forms/PurposeForm";
import { ObjectiveForm } from "../../blocks/forms/ObjectiveForm";
import { useNavigate } from "react-router-dom";
import { Ollama } from 'react-ollama';

export default function AddDiscipline() {
  const navigate = useNavigate();

  const [topicCompetenceDisabled, setTopicCompetenceDisabled] = useState<boolean>(true);
  const [lessonsDisabled, setLessonsDisabled] = useState<boolean>(true);
  const [isDisciplineModalOpen, setIsDisciplineModalOpen] = useState<boolean>(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState<boolean>(false);
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [snackbarState, setSnackbarState] = useState<
    { open: boolean; severity: 'success' | 'error'; message: string }>
    (
      { open: false, severity: 'success', message: '' }
    );

  const [discipline, setDiscipline] = useState<Partial<Discipline> | null>(null);
  const [topic, setTopic] = useState<Partial<Topic> | null>(null);

  const [disciplines, setDisciplines] = useState<Partial<Discipline>[]>([]);
  const [topics, setTopics] = useState<Partial<Topic>[]>([]);
  const [purposes, setPurposes] = useState<Partial<Purpose>[]>([]);
  const [objectives, setObjctives] = useState<Partial<Objective>[]>([]);
  const [lections, setLections] = useState<Partial<Lection>[]>([]);
  const [laboratoryClasses, setLaboratoryClasses] = useState<Partial<LaboratoryClass>[]>([]);
  const [practicalClasses, setPracticalClasses] = useState<Partial<PracticalClass>[]>([]);
  const [examQuestions, setExamQuestions] = useState<Partial<ExamQuestion>[]>([]);
  const [competences, setCompetences] = useState<Partial<Competence>[]>([]);

  const forms = useDisciplineForms();
  const submissions = useDisciplineSubmissions(
    discipline,
    topic,
    setDisciplines,
    setTopics,
    setPurposes,
    setObjctives,
    setLections,
    setLaboratoryClasses,
    setPracticalClasses,
    setExamQuestions,
    setCompetences,
    setIsTopicModalOpen,
    setSnackbarState,
  );

  useEffect(() => {
    fetchDisciplines();
  }, []);

  useEffect(() => {
    if (discipline) {
      fetchDisciplineDependencies();
      setTopic(null)
    }
  }, [discipline]);

  useEffect(() => {
    !!topic && fetchLessons();
  }, [topic]);

  const fetchDisciplines = async () => {
    try {
      const response = await api.getAllDisciplines();
      setDisciplines(response);
    } catch (error) {
      console.error("Error fetching disciplines:", error);
    }
  };

  const fetchDisciplineDependencies = async () => {
    try {
      const topics = await api.getAllTopics({
        disciplineId: discipline?.disciplineId!,
      });
      setTopics(topics);

      const purposes = await api.getAllPurposes(
        discipline?.disciplineId!,
      );
      setPurposes(purposes);

      const objectives = await api.getAllObjectives(
        discipline?.disciplineId!,
      );
      setObjctives(objectives);

      const examQuestions = await api.getAllExamQuestions({
        disciplineId: discipline?.disciplineId!,
      });
      setExamQuestions(examQuestions);

      const competences = await api.getAllCompetences({
        disciplineId: discipline?.disciplineId!,
      });
      setCompetences(competences);
    } catch (error) {
      console.error("Error fetching disciplines:", error);
    }
  };

  const fetchLessons = async () => {
    try {
      const lections = await api.getAllLections({
        topicId: topic?.topicId!,
      });
      setLections(lections);

      const laboratoryClasses = await api.getAllLaboratoryClasses({
        topicId: topic?.topicId!,
      });
      setLaboratoryClasses(laboratoryClasses);

      const practicalClasses = await api.getAllPracticalClasses({
        topicId: topic?.topicId!,
      });
      setPracticalClasses(practicalClasses);
    } catch (error) {
      console.error("Error fetching disciplines:", error);
    }
  };

  const handleDisciplineSelect = (selectedDiscipline: Partial<Discipline>) => {
    setDiscipline(selectedDiscipline);
    setTopicCompetenceDisabled(false);
  };

  const handleTopicSelect = (selectedTopic: Partial<Topic>) => {
    setTopic(selectedTopic);
    setLessonsDisabled(false);
  };

  const handleDisciplineSubmit = async (data: any) => {
    await submissions.submitDiscipline(data);
    setIsDisciplineModalOpen(false);
    fetchDisciplines(); // Refresh the list after adding new discipline
  };

  const importData = async () => {
    try {
      setIsImporting(true)
      await api.importData()
      await fetchDisciplines()
      setSnackbarState({ open: true, severity: 'success', message: 'Импорт успешно завершён' })
    } catch (error) {
      setSnackbarState({ open: true, severity: 'error', message: 'Импорт не удался' })
    } finally {
      setIsImporting(false)
    }
  }


  const deletePurpose = async (purposeId: string) => {
    try {
      await api.deletePurpose(purposeId);

      const purposes = await api.getAllPurposes(discipline!.disciplineId!)
      setPurposes([...purposes])
      setSnackbarState({ open: true, severity: 'success', message: 'Цель дисциплины успешно удалена' })
    } catch (error) {
      setSnackbarState({ open: true, severity: 'error', message: 'Ошибка удаления цели дисциплины' })
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

  const deleteLection = async (lectionId: string) => {
    try {
      await api.deleteLection(lectionId);

      const lections = await api.getAllLections({ topicId: topic!.topicId! })
      setLections([...lections])
      setSnackbarState({ open: true, severity: 'success', message: 'Лекция успешно удалена' })
    } catch (error) {
      setSnackbarState({ open: true, severity: 'error', message: 'Ошибка удаления лекции' })
      console.error(error);
    }
  };

  const deleteLaboratoryClass = async (laboratoryClassId: string) => {
    try {
      await api.deleteLaboratoryClass(laboratoryClassId);

      const laboratoryClass = await api.getAllLaboratoryClasses({ topicId: topic!.topicId! })
      setLaboratoryClasses([...laboratoryClass])
      setSnackbarState({ open: true, severity: 'success', message: 'Лабораторное занятие успешно удалено' })
    } catch (error) {
      setSnackbarState({ open: true, severity: 'error', message: 'Ошибка удаления лабораторного занятия' })
      console.error(error);
    }
  };

  const deletePracticalClass = async (practicalClassId: string) => {
    try {
      await api.deletePracticalClass(practicalClassId);

      const practicalClass = await api.getAllPracticalClasses({ topicId: topic!.topicId! })
      setPracticalClasses([...practicalClass])
      setSnackbarState({ open: true, severity: 'success', message: 'Практическое занятие успешно удалено' })
    } catch (error) {
      setSnackbarState({ open: true, severity: 'error', message: 'Ошибка удаления практического занятия' })
      console.error(error);
    }
  };

  const deleteExamQuestion = async (examQuestionId: string) => {
    try {
      await api.deleteExamQuestion(examQuestionId);

      const examQuestions = await api.getAllExamQuestions({ disciplineId: discipline!.disciplineId! })
      setExamQuestions([...examQuestions])
      setSnackbarState({ open: true, severity: 'success', message: 'Вопрос к экзамену успешно удалён' })
    } catch (error) {
      setSnackbarState({ open: true, severity: 'error', message: 'Ошибка удаления вопроса к экзамену' })
      console.error(error);
    }
  };

  const deleteCompetence = async (competenceId: string) => {
    try {
      await api.deleteCompetence(competenceId);

      const competences = await api.getAllCompetences({ disciplineId: discipline!.disciplineId! })
      setCompetences([...competences])
      setSnackbarState({ open: true, severity: 'success', message: 'Компетенция успешно удалена' })
    } catch (error) {
      setSnackbarState({ open: true, severity: 'error', message: 'Ошибка удаления компетенции' })
      console.error(error);
    }
  };

  return (
    <div className="add-discipline">

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        <span className="add-discipline__title">Добавление дисциплины</span>
        {/* <LoadingButton
          loading={isImporting}
          variant="contained"
          onClick={importData}
          sx={{ height: "60px", width: "200px" }}
        >
          Импорт из 1С
        </LoadingButton> */}
        <Button
          variant="outlined"
          onClick={() => navigate('/add-rpd')}
          sx={{ height: "60px", width: "200px" }}
          startIcon={<ArrowBackRoundedIcon />}
        >
          К РПД
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate('/parse-docs')}
          sx={{ height: "60px", width: "200px" }}
          endIcon={<ArrowForwardRoundedIcon />}
        >
          К парсингу УП
        </Button>
      </div>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={2000}
        onClose={() => setSnackbarState((prevState) => ({ ...prevState, open: false }))}
      >
        <Alert
          onClose={() => setSnackbarState((prevState) => ({ ...prevState, open: false }))}
          severity={snackbarState.severity}
          variant="standard"
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
      <Modal
        open={isDisciplineModalOpen}
        onClose={() => setIsDisciplineModalOpen(false)}
      >
        <div className="modal-content">
          <DisciplineForm
            register={forms.discipline.register}
            errors={forms.discipline.errors}
            onSubmit={forms.discipline.handleSubmit(handleDisciplineSubmit)}
          />
        </div>
      </Modal>

      <div style={{ display: "flex", gap: "10px" }}>
        <DisciplineSelector
          disciplines={disciplines}
          selectedDiscipline={discipline}
          onDisciplineSelect={handleDisciplineSelect}
          isDisabled={!disciplines.length}
        />

        <Button
          variant="contained"
          onClick={() => setIsDisciplineModalOpen(true)}
          sx={{ height: "60px", width: "200px" }}
        >
          Добавить дисциплину
        </Button>
      </div>

      {
        !!discipline && (
          <>
            <Modal
              open={isTopicModalOpen}
              onClose={() => setIsTopicModalOpen(false)}
            >
              <div className="modal-content">
                <TopicForm
                  register={forms.topic.register}
                  errors={forms.topic.errors}
                  onSubmit={forms.topic.handleSubmit(submissions.submitTopic)}
                  isDisabled={topicCompetenceDisabled}
                  modalHandler={setIsTopicModalOpen}
                />
              </div>
            </Modal>
            <div style={{ display: "flex", gap: "10px" }}>
              <TopicSelector
                topics={topics}
                selectedTopic={topic}
                onTopicSelect={handleTopicSelect}
                isDisabled={!topics.length}
              />

              <Button
                variant="contained"
                onClick={() => setIsTopicModalOpen(true)}
                sx={{ height: "60px", width: "200px" }}
              >
                Добавить тему
              </Button>
            </div>
          </>
        )
      }

      {
        !!topic && (
          <>
            <LectionForm
              lections={lections}
              register={forms.lection.register}
              errors={forms.lection.errors}
              onSubmit={forms.lection.handleSubmit(submissions.submitLection)}
              onDelete={deleteLection}
              isDisabled={lessonsDisabled}
            />

            <LaboratoryClassForm
              laboratoryClasses={laboratoryClasses}
              register={forms.laboratoryClass.register}
              errors={forms.laboratoryClass.errors}
              onSubmit={forms.laboratoryClass.handleSubmit(submissions.submitLaboratoryClass)}
              onDelete={deleteLaboratoryClass}
              isDisabled={lessonsDisabled}
            />

            <PracticalClassForm
              practicalClasses={practicalClasses}
              register={forms.practicalClass.register}
              errors={forms.practicalClass.errors}
              onSubmit={forms.practicalClass.handleSubmit(submissions.submitPracticalClass)}
              onDelete={deletePracticalClass}
              isDisabled={lessonsDisabled}
            />

            <ExamQuestionForm
              examQuestions={examQuestions}
              topics={topics}
              register={forms.examQuestion.register}
              errors={forms.examQuestion.errors}
              onSubmit={forms.examQuestion.handleSubmit(submissions.submitExamQuestion)}
              onDelete={deleteExamQuestion}
              isDisabled={topicCompetenceDisabled}
            />
          </>
        )
      }
      {
        !!discipline && (
          <>
            <PurposeForm
              purposes={purposes}
              register={forms.purpose.register}
              errors={forms.purpose.errors}
              onSubmit={forms.purpose.handleSubmit(submissions.submitPurpose)}
              onDelete={deletePurpose}
              isDisabled={topicCompetenceDisabled}
            />

            <ObjectiveForm
              objectives={objectives}
              register={forms.objective.register}
              errors={forms.objective.errors}
              onSubmit={forms.objective.handleSubmit(submissions.submitObjecive)}
              onDelete={deleteObjecive}
              isDisabled={topicCompetenceDisabled}
            />

            <CompetenceForm
              competences={competences}
              register={forms.competence.register}
              errors={forms.competence.errors}
              onSubmit={forms.competence.handleSubmit(submissions.submitCompetence)}
              onDelete={deleteCompetence}
              isDisabled={topicCompetenceDisabled}
            />
          </>
        )
      }
    </div >
  );
}
