import {
  GET_QUIZ_DETAIL,
  GET_QUIZ_ERROR,
  SURVEY_DELETE_QUESTION,
  SURVEY_SAVE,
  SAVE_QUIZ
} from "../../constants/actionTypes";

const INIT_STATE = {
  quiz: null,
  loading: false,
  newQuiz: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_QUIZ_DETAIL:
      return {
        ...state,
        loading: true,
        quiz: action.payload,
        newQuiz: action.payload.questions
      };

    case GET_QUIZ_ERROR:
      return { ...state, loading: true, error: action.payload };

    case SURVEY_DELETE_QUESTION:
      return { ...state, loading: false };

    case SURVEY_SAVE:
      return {
        ...state,
        loading: true,
        quiz: action.payload
      };
    case SAVE_QUIZ:
      return { ...state, loading: true, newQuiz: action.payload };

    default:
      return { ...state };
  }
};
