import { getDateWithFormat } from "../../util/Utils";

import {
  SURVEY_LIST_GET_LIST,
  GET_QUIZ_LIST,
  SURVEY_LIST_GET_LIST_ERROR,
  GET_QUIZ_LIST_WITH_FILTER,
  SURVEY_LIST_GET_LIST_WITH_ORDER,
  SURVEY_LIST_GET_LIST_SEARCH,
  SURVEY_LIST_ADD_ITEM_SUCCESS,
  SURVEY_LIST_ADD_ITEM_ERROR,
  SURVEY_LIST_SELECTED_ITEMS_CHANGE
} from "../../constants/actionTypes";
import axios from "axios";
import { URL, config } from "../../constants/defaultValues";

export const getSurveyList = () => ({
  type: SURVEY_LIST_GET_LIST
});

export const getQuizListWithFilter = (column, value) => ({
  type: GET_QUIZ_LIST_WITH_FILTER,
  payload: { column, value }
});

export const getSurveyListWithOrder = column => ({
  type: SURVEY_LIST_GET_LIST_WITH_ORDER,
  payload: column
});

export const getSurveyListSearch = keyword => ({
  type: SURVEY_LIST_GET_LIST_SEARCH,
  payload: keyword
});

export const addSurveyItemError = error => ({
  type: SURVEY_LIST_ADD_ITEM_ERROR,
  payload: error
});

export const selectedSurveyItemsChange = selectedItems => ({
  type: SURVEY_LIST_SELECTED_ITEMS_CHANGE,
  payload: selectedItems
});

export const addQuizToList = (course, roll) => async dispatch => {
  try {
    const body = JSON.stringify({ course, roll });
    const items = await axios.post(URL + "api/quiz/findquiz", body, config);
    dispatch({ type: GET_QUIZ_LIST, payload: items.data });
  } catch (error) {
    dispatch({ type: SURVEY_LIST_GET_LIST_ERROR, payload: error });
  }
};
export const findSolvedQuiz = (course, quiz) => async dispatch => {
  try {
    const body = JSON.stringify({ course, quiz });
    const items = await axios.post(URL + "api/quiz/solvedquiz", body, config);
    dispatch({ type: GET_QUIZ_LIST, payload: items.data });
  } catch (error) {
    dispatch({ type: SURVEY_LIST_GET_LIST_ERROR, payload: error });
  }
};
