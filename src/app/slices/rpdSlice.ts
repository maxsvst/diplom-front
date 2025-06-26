import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dayjs } from "dayjs";

import {
  Competence,
  Discipline,
  ExamQuestion,
  LaboratoryClass,
  Lection,
  PracticalClass,
  Topic,
} from "../../types";
import * as api from "../../api/api";
import { RootState } from "../store";

type Status = "idle" | "loading" | "succeeded" | "failed";
type Nullable<T> = T | null;

interface AddRpdPayload {
  disciplineId: string,
  // rpdTotalHours: number,
  // rpdLectionHours: number,
  // rpdPracticalHours: number,
  // rpdLaboratoryHours: number,
  // rpdSelfstudyHours: number,
  // rpdAdditionalHours: number,
  // year: number
}

interface HoursPayloadBase {
  topicId: string;
  hours: number;
}

interface LaboratoryClassHoursPayload extends HoursPayloadBase {
  laboratoryClassId: string;
}

interface LectionHoursPayload extends HoursPayloadBase {
  lectionId: string;
}

interface PracticalClassHoursPayload extends HoursPayloadBase {
  practicalClassId: string;
}

type HoursPayload = LaboratoryClassHoursPayload | LectionHoursPayload | PracticalClassHoursPayload;

interface RpdState {
  disciplines: Nullable<Discipline[]>;

  topics: Nullable<Topic[]>;
  topicHours: { [topicId: string]: number };

  laboratoryClasses: Nullable<{ [key: string]: LaboratoryClass[] }>;
  laboratoryClassHours: { [topicId: string]: { [laboratoryClassId: string]: number } };

  practicalClasses: Nullable<{ [key: string]: PracticalClass[] }>;
  practicalClassHours: { [topicId: string]: { [practicalClassId: string]: number } };

  lections: Nullable<{ [key: string]: Lection[] }>;
  lectionsHours: { [topicId: string]: { [lectionId: string]: number } };

  selfStudyHours: { [topicId: string]: number };
  additionalHours: { [topicId: string]: number };

  examQuestions: Nullable<ExamQuestion[]>;
  competences: Nullable<Competence[]>;
  discipline: string;
  createDate: Nullable<Dayjs>;
  controlWeek: number,
  course: number,
  semester: number,
  creditUnits: number,
  controlWork: boolean,
  courseProject: boolean,
  credit: boolean,
  exam: boolean,

  disciplinesStatus: Status;
  topicsStatus: Status;
  laboratoryClassStatus: Status;
  practicalClassStatus: Status;
  lectionsStatus: Status;
  examQuestionsStatus: Status;
  competencesStatus: Status;

  disciplineError: Nullable<string>;
  topicsError: Nullable<string>;
  laboratoryClassError: Nullable<string>;
  practicalClassError: Nullable<string>;
  lectionsError: Nullable<string>;
  examQuestionsError: Nullable<string>;
  competencesError: Nullable<string>;
}

const initialState: RpdState = {
  disciplines: null,

  topics: null,
  topicHours: {},

  laboratoryClasses: null,
  laboratoryClassHours: {},

  practicalClasses: null,
  practicalClassHours: {},

  lections: null,
  lectionsHours: {},

  selfStudyHours: {},
  additionalHours: {},

  discipline: "",
  createDate: null,
  competences: null,
  examQuestions: null,
  controlWeek: 1,
  course: 1,
  semester: 1,
  creditUnits: 1,
  controlWork: false,
  courseProject: false,
  credit: false,
  exam: false,

  disciplinesStatus: "idle",
  topicsStatus: "idle",
  laboratoryClassStatus: "idle",
  practicalClassStatus: "idle",
  lectionsStatus: "idle",
  examQuestionsStatus: "idle",
  competencesStatus: "idle",

  disciplineError: null,
  topicsError: null,
  laboratoryClassError: null,
  practicalClassError: null,
  lectionsError: null,
  examQuestionsError: null,
  competencesError: null,
};

function calculateTotalClassHours(classHours: any): number {
  return Object.values(classHours)
    .reduce((topicSum: number, topicHours) => {
      return topicSum + Object.values(topicHours!).reduce((classSum, hours) => classSum + hours, 0);
    }, 0);
}

export const fetchDisciplines = createAsyncThunk(
  "rpd/fetchDisciplines",
  async () => {
    const data = await api.getAllDisciplines();
    return data;
  }
);

export const fetchTopics = createAsyncThunk(
  "rpd/fetchTopics",
  async (disciplineId: string) => {
    const data = await api.getAllTopics({ disciplineId });
    return data;
  }
);

export const fetchLaboratoryClasses = createAsyncThunk(
  "rpd/laboratoryClasses",
  async (topicId: string) => {
    const data = await api.getAllLaboratoryClasses({ topicId });
    return { topicId, data };
  }
);

export const fetchPracticalClasses = createAsyncThunk(
  "rpd/practicalClasses",
  async (topicId: string) => {
    const data = await api.getAllPracticalClasses({ topicId });
    return { topicId, data };
  }
);

export const fetchLections = createAsyncThunk(
  "rpd/lections",
  async (topicId: string) => {
    const data = await api.getAllLections({ topicId });
    return { topicId, data };
  }
);

export const fetchExamQuestions = createAsyncThunk(
  "rpd/examQuestions",
  async (disciplineId: string) => {
    const data = await api.getAllExamQuestions({ disciplineId });
    return data;
  }
);

export const fetchCompetences = createAsyncThunk(
  "rpd/competences",
  async (disciplineId: string) => {
    const data = await api.getAllCompetences({ disciplineId });
    return data;
  }
);

export const addRpd = createAsyncThunk(
  "rpd/add-rpd",
  async (disciplineId: string, { getState, rejectWithValue }) => {
    try {
      const { rpd } = getState() as RootState
      const {
        controlWeek,
        course,
        semester,
        creditUnits,
        controlWork,
        courseProject,
        credit,
        exam
      } = rpd

      const rpdDate = rpd.createDate ? rpd.createDate : new Date();

      const rpdTotalHours = Object.values(rpd.topicHours).reduce((acc, value) => acc += value, 0)
      const rpdLectionHours = calculateTotalClassHours(rpd.lectionsHours)
      const rpdPracticalHours = calculateTotalClassHours(rpd.lectionsHours)
      const rpdLaboratoryHours = calculateTotalClassHours(rpd.lectionsHours)
      const rpdSelfstudyHours = Object.values(rpd.selfStudyHours).reduce((acc, value) => acc += value, 0)
      const rpdAdditionalHours = Object.values(rpd.additionalHours).reduce((acc, value) => acc += value, 0)

      const { rpdId } = await api.addRpd({
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

      const topicLectionHours = (topicId: string) => Object.values(rpd.lectionsHours[topicId]).reduce((acc, value) => acc += value, 0)
      const topicLaboratoryClassHours = (topicId: string) => Object.values(rpd.lectionsHours[topicId]).reduce((acc, value) => acc += value, 0)
      const topicPracticalClassHours = (topicId: string) => Object.values(rpd.lectionsHours[topicId]).reduce((acc, value) => acc += value, 0)

      console.log(rpd)

      if (rpd.topics) {
        await Promise.all(
          rpd.topics.map(({ topicId }) =>
            api.addRpdTopic(
              rpdId,
              topicId,
              rpd.topicHours[topicId],
              topicLectionHours(topicId),
              topicLaboratoryClassHours(topicId),
              topicPracticalClassHours(topicId),
              rpd.selfStudyHours[topicId]
            )
          ))
      } else {
        console.error('topics')
      }

      if (rpd.laboratoryClassHours) {
        const promises = [];
        for (const [_, laboratoryClasses] of Object.entries(rpd.laboratoryClassHours)) {
          for (const [laboratoryClassId, hours] of Object.entries(laboratoryClasses)) {
            promises.push(
              api.addRpdLaboratoryClass(
                rpdId,
                laboratoryClassId,
                hours
              )
            );
          }
        }
        await Promise.all(promises);
      } else {
        console.error('laboratoryClassHours')
      }

      if (rpd.practicalClassHours) {
        const promises = [];
        for (const [_, practicalClasses] of Object.entries(rpd.practicalClassHours)) {
          for (const [practicalClassId, hours] of Object.entries(practicalClasses)) {
            promises.push(
              api.addRpdPracticalClass(
                rpdId,
                practicalClassId,
                hours
              )
            );
          }
        }
        await Promise.all(promises);
      } else {
        console.error('practicalClassHours')
      }

      if (rpd.lectionsHours) {
        const promises = [];
        for (const [_, lections] of Object.entries(rpd.lectionsHours)) {
          for (const [lectionId, hours] of Object.entries(lections)) {
            promises.push(
              api.addRpdLections(
                rpdId,
                lectionId,
                hours
              )
            );
          }
        }
        await Promise.all(promises);
      } else {
        console.error('lectionsHours')
      }

      console.log(rpdId)

      if (rpd.competences) {
        await Promise.all(
          rpd.competences.map(({ competenceId }) =>
            api.addRpdCompetence(
              rpdId,
              competenceId
            )
          ))
      } else {
        console.error('competences')
      }

      api
        .createDocument(rpdId)
        .then((blob) => {
          // Create blob link to download
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `РПД.docx`);

          // Append to html link element page
          document.body.appendChild(link);

          // Start download
          link.click();

          // Clean up and remove the link
          link.parentNode!.removeChild(link);
        });

      return rpdId
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addRpdCompetence = createAsyncThunk(
  "rpd/add-rpd-competence",
  async ({ rpdId, competenceId }: { rpdId: string, competenceId: string }, { getState, rejectWithValue }) => {
    try {
      await api.addRpdCompetence(
        rpdId,
        competenceId
      );
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const rpdSlice = createSlice({
  name: "rpd",
  initialState,
  reducers: {
    setDiscipline: (state, action: PayloadAction<string>) => {
      state.discipline = action.payload;
    },
    setDate: (state, action: PayloadAction<Nullable<Dayjs>>) => {
      state.createDate = action.payload;
    },
    setControlWeek: (state, action: PayloadAction<number>) => {
      state.controlWeek = action.payload;
    },
    setCourse: (state, action: PayloadAction<number>) => {
      state.course = action.payload;
    },
    setSemester: (state, action: PayloadAction<number>) => {
      state.semester = action.payload;
    },
    setCreditUnits: (state, action: PayloadAction<number>) => {
      state.creditUnits = action.payload;
    },
    setControlWork: (state, action: PayloadAction<boolean>) => {
      state.controlWork = action.payload;
    },
    setCourseProject: (state, action: PayloadAction<boolean>) => {
      state.courseProject = action.payload;
    },
    setCredit: (state, action: PayloadAction<boolean>) => {
      state.credit = action.payload;
    },
    setExam: (state, action: PayloadAction<boolean>) => {
      state.exam = action.payload;
    },
    setHours: (state: RpdState, action: PayloadAction<HoursPayload>) => {
      const { topicId, hours } = action.payload;
      let classId: string | undefined;
      let classType: 'laboratoryClass' | 'lection' | 'practicalClass' | 'selfStudy' | 'additionalHours' | undefined;

      if ('laboratoryClassId' in action.payload) {
        classId = action.payload.laboratoryClassId;
        classType = 'laboratoryClass';
      } else if ('lectionId' in action.payload) {
        classId = action.payload.lectionId;
        classType = 'lection';
      } else if ('practicalClassId' in action.payload) {
        classId = action.payload.practicalClassId;
        classType = 'practicalClass';
      } else if ('selfStudy' in action.payload) {
        classType = 'selfStudy'
      } else if ('additionalHours' in action.payload) {
        classType = 'additionalHours'
      }

      // if (!classType || !classId) {
      //   console.error("Invalid payload for setHours");
      //   return; // Exit if payload is invalid
      // }

      switch (classType) {
        case 'laboratoryClass':
          state.laboratoryClassHours = {
            ...state.laboratoryClassHours,
            [topicId]: {
              ...(state.laboratoryClassHours[topicId] || {}),
              [classId!]: hours,
            },
          };
          break;
        case 'lection':
          state.lectionsHours = {
            ...state.lectionsHours,
            [topicId]: {
              ...(state.lectionsHours[topicId] || {}),
              [classId!]: hours,
            },
          };
          break;
        case 'practicalClass':
          state.practicalClassHours = {
            ...state.practicalClassHours,
            [topicId]: {
              ...(state.practicalClassHours[topicId] || {}),
              [classId!]: hours,
            },
          };
          break;
        case 'selfStudy':
          state.selfStudyHours = {
            ...state.selfStudyHours,
            [topicId]: hours
          }
          break;
        case 'additionalHours':
          state.additionalHours = {
            ...state.additionalHours,
            [topicId]: hours
          }
          break;
      }

      let totalTopicHours = 0;
      if (state.laboratoryClassHours[topicId]) {
        totalTopicHours += Object.values(state.laboratoryClassHours[topicId]).reduce((sum, h) => sum + h, 0);
      }
      if (state.lectionsHours[topicId]) {
        totalTopicHours += Object.values(state.lectionsHours[topicId]).reduce((sum, h) => sum + h, 0);
      }
      if (state.practicalClassHours[topicId]) {
        totalTopicHours += Object.values(state.practicalClassHours[topicId]).reduce((sum, h) => sum + h, 0);
      }
      if (state.selfStudyHours[topicId]) {
        totalTopicHours += state.selfStudyHours[topicId]
      }
      state.topicHours[topicId] = totalTopicHours;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDisciplines.pending, (state) => {
        state.disciplinesStatus = "loading";
      })
      .addCase(fetchDisciplines.fulfilled, (state, action) => {
        state.disciplinesStatus = "succeeded";
        state.disciplines = action.payload;
      })
      .addCase(fetchDisciplines.rejected, (state, action) => {
        state.disciplinesStatus = "failed";
        state.disciplineError =
          action.error.message || "Failed to fetch disciplines";
      })
      .addCase(fetchTopics.pending, (state) => {
        state.topicsStatus = "loading";
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.topicsStatus = "succeeded";
        state.topics = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.topicsStatus = "failed";
        state.topicsError = action.error.message || "Failed to fetch topics";
      })
      .addCase(fetchLaboratoryClasses.pending, (state) => {
        state.laboratoryClassStatus = "loading";
      })
      .addCase(fetchLaboratoryClasses.fulfilled, (state, action) => {
        state.laboratoryClassStatus = "succeeded";
        state.laboratoryClasses = state.laboratoryClasses || {};
        state.laboratoryClasses![action.payload.topicId] = action.payload.data;
      })
      .addCase(fetchLaboratoryClasses.rejected, (state, action) => {
        state.laboratoryClassStatus = "failed";
        state.laboratoryClassError =
          action.error.message || "Failed to fetch laboratory classes";
      })
      .addCase(fetchPracticalClasses.pending, (state) => {
        state.practicalClassStatus = "loading";
      })
      .addCase(fetchPracticalClasses.fulfilled, (state, action) => {
        state.practicalClassStatus = "succeeded";
        state.practicalClasses = state.practicalClasses || {};
        state.practicalClasses![action.payload.topicId] = action.payload.data;
      })
      .addCase(fetchPracticalClasses.rejected, (state, action) => {
        state.practicalClassStatus = "failed";
        state.practicalClassError =
          action.error.message || "Failed to fetch practical classes";
      })
      .addCase(fetchLections.pending, (state) => {
        state.lectionsStatus = "loading";
      })
      .addCase(fetchLections.fulfilled, (state, action) => {
        state.lectionsStatus = "succeeded";
        state.lections = state.lections || {};
        state.lections![action.payload.topicId] = action.payload.data;
      })
      .addCase(fetchLections.rejected, (state, action) => {
        state.lectionsStatus = "failed";
        state.lectionsError =
          action.error.message || "Failed to fetch lections";
      })
      .addCase(fetchExamQuestions.pending, (state) => {
        state.examQuestionsStatus = "loading";
      })
      .addCase(fetchExamQuestions.fulfilled, (state, action) => {
        state.examQuestionsStatus = "succeeded";
        state.examQuestions = action.payload;
      })
      .addCase(fetchExamQuestions.rejected, (state, action) => {
        state.examQuestionsStatus = "failed";
        state.examQuestionsError =
          action.error.message || "Failed to fetch exam questions";
      })
      .addCase(fetchCompetences.pending, (state) => {
        state.competencesStatus = "loading";
      })
      .addCase(fetchCompetences.fulfilled, (state, action) => {
        state.competencesStatus = "succeeded";
        state.competences = action.payload;
      })
      .addCase(fetchCompetences.rejected, (state, action) => {
        state.competencesStatus = "failed";
        state.competencesError =
          action.error.message || "Failed to fetch competences";
      });
  },
});

export const selectLaboratoryClassHours = (topicId: string, laboratoryClassId: string) => (state: RootState) => {
  return state.rpd.laboratoryClassHours[topicId]?.[laboratoryClassId];
};

export const selectLectionHours = (topicId: string, lectionId: string) => (state: RootState) => {
  return state.rpd.lectionsHours[topicId]?.[lectionId];
};

export const selectPracticalClassHours = (topicId: string, practicalClassId: string) => (state: RootState) => {
  return state.rpd.practicalClassHours[topicId]?.[practicalClassId];
};

export const {
  setDiscipline,
  setDate,
  setHours,
  setControlWeek,
  setCourse,
  setSemester,
  setCreditUnits,
  setControlWork,
  setCourseProject,
  setCredit,
  setExam
} = rpdSlice.actions;

export default rpdSlice.reducer;
