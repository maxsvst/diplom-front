import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from '../../containers/add-discipline/addDisciplineSchema';

export const useDisciplineForms = () => {
    const disciplineForm = useForm({
        resolver: yupResolver(yup.disciplineSchema),
    });

    const topicForm = useForm({
        resolver: yupResolver(yup.topicSchema),
    });

    const laboratoryClassForm = useForm({
        resolver: yupResolver(yup.laboratoryClassSchema),
    });

    const practicalClassForm = useForm({
        resolver: yupResolver(yup.practicalClassSchema),
    });

    const lectionForm = useForm({
        resolver: yupResolver(yup.lectionSchema),
    });

    const examQuestionForm = useForm({
        resolver: yupResolver(yup.examQuestionSchema),
    });

    const competenceForm = useForm({
        resolver: yupResolver(yup.competenceSchema),
    });

    return {
        discipline: {
            register: disciplineForm.register,
            handleSubmit: disciplineForm.handleSubmit,
            errors: disciplineForm.formState.errors,
        },
        topic: {
            register: topicForm.register,
            handleSubmit: topicForm.handleSubmit,
            errors: topicForm.formState.errors,
        },
        laboratoryClass: {
            register: laboratoryClassForm.register,
            handleSubmit: laboratoryClassForm.handleSubmit,
            errors: laboratoryClassForm.formState.errors,
        },
        practicalClass: {
            register: practicalClassForm.register,
            handleSubmit: practicalClassForm.handleSubmit,
            errors: practicalClassForm.formState.errors,
        },
        lection: {
            register: lectionForm.register,
            handleSubmit: lectionForm.handleSubmit,
            errors: lectionForm.formState.errors,
        },
        examQuestion: {
            register: examQuestionForm.register,
            handleSubmit: examQuestionForm.handleSubmit,
            errors: examQuestionForm.formState.errors,
        },
        competence: {
            register: competenceForm.register,
            handleSubmit: competenceForm.handleSubmit,
            errors: competenceForm.formState.errors,
        },
    };
};