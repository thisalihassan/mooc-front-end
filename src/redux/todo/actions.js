import {
  TODO_GET_LIST_SUCCESS,
  TODO_GET_LIST_ERROR,
  TODO_GET_LIST_WITH_FILTER,
} from "../../constants/actionTypes";
import axios from "axios";
import { URL, config } from "../../constants/defaultValues";

export const getAnouncementswithFilter = (column, value) => ({
  type: TODO_GET_LIST_WITH_FILTER,
  payload: { column, value },
});

export const makeAnouncement = (body) => async (dispatch) => {
  try {
    const res = await axios.post(URL + "api/Courses/getanounce", body, config);
    dispatch({
      type: TODO_GET_LIST_SUCCESS,
      payload: res.data.anounce,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    dispatch({
      type: TODO_GET_LIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
