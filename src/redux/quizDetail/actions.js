import {
  GET_QUIZ_DETAIL,
  GET_QUIZ_ERROR,
  SURVEY_DELETE_QUESTION,
  SURVEY_SAVE,
  SAVE_QUIZ
} from "../../constants/actionTypes";
import axios from "axios";
import { URL, config } from "../../constants/defaultValues";

export const getQuizDetail = id => async dispatch => {
  try {
    const items = await axios.post(
      URL + "api/quiz/detailquiz/" + id,
      {},
      config
    );
    dispatch({ type: GET_QUIZ_DETAIL, payload: items.data });
  } catch (error) {
    dispatch({
      type: GET_QUIZ_ERROR,
      payload: error
    });
  }
};
export const saveSurvey = survey => ({
  type: SURVEY_SAVE,
  payload: survey
});

export const saveQuiz = survey => ({
  type: SAVE_QUIZ,
  payload: survey
});
export const deleteQuizQuestion = (questionId, quiz) => async dispatch => {
  try {
    quiz.questions = quiz.questions.filter(x => x.id !== questionId);
    const response = await new Promise((success, fail) => {
      success(quiz);
    });
    dispatch({ type: SURVEY_DELETE_QUESTION, payload: { questionId, quiz } });
    dispatch({ type: SURVEY_SAVE, payload: response });
  } catch (error) {
    dispatch({
      type: GET_QUIZ_ERROR,
      payload: error
    });
  }
};
