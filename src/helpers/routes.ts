export const ROUTES = {
  DISCIPLINE: "/discipline",
  TOPIC: "/topic",
  COMPETENCE: "/competence",
  EXAM_QUESTION: "/exam-question",
  LABORATORY_CLASS: "/laboratory-class",
  PRACTICAL_CLASS: "/practical-class",
  LECTION: "/lection",
  TEACHER: "/teacher",
  RPD: "/rpd",
} as const;

export const DISCIPLINE_METHODS = {
  ADD: `${ROUTES.DISCIPLINE}/add-discipline`,
  GET: `${ROUTES.DISCIPLINE}/get-discipline`,
  GET_ALL: `${ROUTES.DISCIPLINE}/get-all-disciplines`,
  DELETE: `${ROUTES.DISCIPLINE}/delete-discipline`,
  UPDATE: `${ROUTES.DISCIPLINE}/update-discipline`,
};

export const DISCIPLINE_TEACHER_METHODS = {
  ADD: `${ROUTES.DISCIPLINE}/add-discipline-teacher`,
  GET: `${ROUTES.DISCIPLINE}/get-discipline-teacher`,
  DELETE: `${ROUTES.DISCIPLINE}/delete-discipline-teacher`,
  UPDATE: `${ROUTES.DISCIPLINE}/update-discipline-teacher`,
};

export const DISCIPLINE_COMPETENCE_METHODS = {
  ADD: `${ROUTES.DISCIPLINE}/add-discipline-competence`,
  GET: `${ROUTES.DISCIPLINE}/get-discipline-competence`,
  DELETE: `${ROUTES.DISCIPLINE}/delete-discipline-competence`,
  UPDATE: `${ROUTES.DISCIPLINE}/update-discipline-competence`,
};

export const TOPIC_METHODS = {
  ADD: `${ROUTES.TOPIC}/add-topic`,
  GET: `${ROUTES.TOPIC}/get-topic`,
  GET_ALL: `${ROUTES.TOPIC}/get-all-topics`,
  DELETE: `${ROUTES.TOPIC}/delete-topic`,
  UPDATE: `${ROUTES.TOPIC}/update-topic`,
};

export const COMPETENCE_METHODS = {
  ADD: `${ROUTES.COMPETENCE}/add-competence`,
  GET: `${ROUTES.COMPETENCE}/get-competence`,
  GET_ALL: `${ROUTES.COMPETENCE}/get-all-competences`,
  DELETE: `${ROUTES.COMPETENCE}/delete-competence`,
  UPDATE: `${ROUTES.COMPETENCE}/update-competence`,
};

export const EXAM_QUESTION_METHODS = {
  ADD: `${ROUTES.EXAM_QUESTION}/add-exam-question`,
  GET: `${ROUTES.EXAM_QUESTION}/get-exam-question`,
  GET_ALL: `${ROUTES.EXAM_QUESTION}/get-all-exam-questions`,
  DELETE: `${ROUTES.EXAM_QUESTION}/delete-exam-question`,
  UPDATE: `${ROUTES.EXAM_QUESTION}/update-exam-question`,
};

export const LABORATORY_CLASS_METHODS = {
  ADD: `${ROUTES.LABORATORY_CLASS}/add-laboratory-class`,
  GET: `${ROUTES.LABORATORY_CLASS}/get-laboratory-class`,
  GET_ALL: `${ROUTES.LABORATORY_CLASS}/get-all-laboratory-classes`,
  DELETE: `${ROUTES.LABORATORY_CLASS}/delete-laboratory-class`,
  UPDATE: `${ROUTES.LABORATORY_CLASS}/update-laboratory-class`,
};

export const PRACTICAL_CLASS_METHODS = {
  ADD: `${ROUTES.PRACTICAL_CLASS}/add-practical-class`,
  GET: `${ROUTES.PRACTICAL_CLASS}/get-practical-class`,
  GET_ALL: `${ROUTES.PRACTICAL_CLASS}/get-all-practical-classes`,
  DELETE: `${ROUTES.PRACTICAL_CLASS}/delete-practical-class`,
  UPDATE: `${ROUTES.PRACTICAL_CLASS}/update-practical-class`,
};

export const LECTION_METHODS = {
  ADD: `${ROUTES.LECTION}/add-lection`,
  GET: `${ROUTES.LECTION}/get-lection`,
  GET_ALL: `${ROUTES.LECTION}/get-all-lections`,
  DELETE: `${ROUTES.LECTION}/delete-lection`,
  UPDATE: `${ROUTES.LECTION}/update-lection`,
};

export const TEACHER_METHODS = {
  ADD: `${ROUTES.TEACHER}/add-teacher`,
  GET: `${ROUTES.TEACHER}/get-teacher`,
  //   GET_ALL: `${ROUTES.TEACHER}/get-all-topics`,
  DELETE: `${ROUTES.TEACHER}/delete-teacher`,
  UPDATE: `${ROUTES.TEACHER}/update-teacher`,
};

export const RPD_METHODS = {
  ADD: `${ROUTES.RPD}/add-rpd`,
  GET: `${ROUTES.RPD}/get-rpd`,
  //   GET_ALL: `${ROUTES.RPD}/get-all-lection`,
  DELETE: `${ROUTES.RPD}/delete-rpd`,
  UPDATE: `${ROUTES.RPD}/update-rpd`,
};
