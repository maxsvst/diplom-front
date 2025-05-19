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
import { Button, Modal } from "@mui/material";
import { TopicSelector } from "../../blocks/topic-selector/TopicSelector";
import {
  Competence,
  Discipline,
  ExamQuestion,
  LaboratoryClass,
  Lection,
  PracticalClass,
  Topic,
} from "../../types";
import { fetchDisciplines } from "../../app/slices/rpdSlice";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";

import "./add-discipline.css";

export default function AddDiscipline() {
  const [topicCompetenceDisabled, setTopicCompetenceDisabled] = useState(true);
  const [lessonsDisabled, setLessonsDisabled] = useState(true);
  const [discipline, setDiscipline] = useState<Partial<Discipline> | null>(
    null
  );
  const [topic, setTopic] = useState<Partial<Topic> | null>(null);
  const [disciplines, setDisciplines] = useState<
    { id: string; fullName: string }[]
  >([]);
  const [topics, setTopics] = useState<Partial<Topic>[]>([]);
  const [isDisciplineModalOpen, setIsDisciplineModalOpen] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [lections, setLections] = useState<Partial<Lection>[]>([]);
  const [laboratoryClasses, setLaboratoryClasses] = useState<
    Partial<LaboratoryClass>[]
  >([]);
  const [practicalClasses, setPracticalClasses] = useState<
    Partial<PracticalClass>[]
  >([]);
  const [examQuestions, setExamQuestions] = useState<Partial<ExamQuestion>[]>(
    []
  );
  const [competences, setCompetences] = useState<Partial<Competence>[]>([]);

  const forms = useDisciplineForms();
  const submissions = useDisciplineSubmissions(
    discipline,
    topic,
    setDiscipline,
    setTopic,
    setTopicCompetenceDisabled,
    setLessonsDisabled
  );

  useEffect(() => {
    fetchDisciplines();
  }, []);

  useEffect(() => {
    !!discipline && fetchDisciplineDependencies();
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
      const response = await api.getAllTopics({
        disciplineId: discipline?.disciplineId!,
      });
      setTopics(response);

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

  return (
    <div className="add-discipline">
      <span className="add-discipline__title">Добавление дисциплины</span>

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
        />

        <Button
          variant="contained"
          onClick={() => setIsDisciplineModalOpen(true)}
          sx={{ height: "60px", width: "200px" }}
        >
          Добавить дисциплину
        </Button>
      </div>

      {!!discipline && (
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
              />
            </div>
          </Modal>
          <div style={{ display: "flex", gap: "10px" }}>
            <TopicSelector
              topics={topics}
              selectedTopic={topic}
              onTopicSelect={handleTopicSelect}
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
      )}

      {!!topic && (
        <>
          <LectionForm
            lections={lections}
            register={forms.lection.register}
            errors={forms.lection.errors}
            onSubmit={forms.lection.handleSubmit(submissions.submitLection)}
            isDisabled={lessonsDisabled}
          />

          <LaboratoryClassForm
            laboratoryClasses={laboratoryClasses}
            register={forms.laboratoryClass.register}
            errors={forms.laboratoryClass.errors}
            onSubmit={forms.laboratoryClass.handleSubmit(
              submissions.submitLaboratoryClass
            )}
            isDisabled={lessonsDisabled}
          />

          <PracticalClassForm
            practicalClasses={practicalClasses}
            register={forms.practicalClass.register}
            errors={forms.practicalClass.errors}
            onSubmit={forms.practicalClass.handleSubmit(
              submissions.submitPracticalClass
            )}
            isDisabled={lessonsDisabled}
          />
        </>
      )}
      {!!discipline && (
        <>
          <ExamQuestionForm
            examQuestions={examQuestions}
            register={forms.examQuestion.register}
            errors={forms.examQuestion.errors}
            onSubmit={forms.examQuestion.handleSubmit(
              submissions.submitExamQuestion
            )}
            isDisabled={lessonsDisabled}
          />

          <CompetenceForm
            competences={competences}
            register={forms.competence.register}
            errors={forms.competence.errors}
            onSubmit={forms.competence.handleSubmit(
              submissions.submitCompetence
            )}
            isDisabled={topicCompetenceDisabled}
          />
        </>
      )}
    </div>
  );
}
