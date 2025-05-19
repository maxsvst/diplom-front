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

type Status = "idle" | "loading" | "succeeded" | "failed";
type Nullable<T> = T | null;

interface RpdState {
  disciplines: Nullable<Discipline[]>;
  topics: Nullable<Topic[]>;
  laboratoryClasses: Nullable<{ [key: string]: LaboratoryClass[] }>;
  practicalClasses: Nullable<{ [key: string]: PracticalClass[] }>;
  lections: Nullable<{ [key: string]: Lection[] }>;
  examQuestions: Nullable<ExamQuestion[]>;
  competences: Nullable<Competence[]>;
  discipline: string;
  createDate: Nullable<Dayjs>;

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
  laboratoryClasses: null,
  practicalClasses: null,
  lections: null,
  discipline: "",
  createDate: null,
  competences: null,
  examQuestions: null,

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

export const { setDiscipline, setDate } = rpdSlice.actions;

export default rpdSlice.reducer;
