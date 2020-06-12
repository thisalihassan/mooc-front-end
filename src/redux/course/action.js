import {
  GET_COURSE,
  GET_PENDING_COURSES,
  COURSE_ACCEPTED,
  COURSE_DELETED,
  GET_MY_COURSE,
  GET_ACTIVE_COURSES
} from "../../constants/actionTypes";
import axios from "axios";
import { URL, config } from "../../constants/defaultValues";

export const getCourse = id => async dispatch => {
  let body = JSON.stringify({ id });
  try {
    const res = await axios.post(URL + "api/Courses/getcourses", body, config);
    dispatch({ type: GET_COURSE, payload: res.data });
  } catch (error) {}
};

export const getmyCourse = () => async dispatch => {
  try {
    const res = await axios.post(URL + "api/Courses/myourses", {}, config);
    dispatch({ type: GET_MY_COURSE, payload: res.data });
  } catch (error) {}
};
export const getPendingCourse = () => async dispatch => {
  try {
    const res = await axios.post(URL + "api/Courses/pending/", {}, config);
    dispatch({ type: GET_PENDING_COURSES, payload: res.data });
  } catch (error) {}
};
export const getApprovedCourse = () => async dispatch => {
  try {
    const res = await axios.post(URL + "api/Courses/active/", {}, config);
    dispatch({ type: GET_ACTIVE_COURSES, payload: res.data });
  } catch (error) {}
};

export const AcceptCourse = id => async dispatch => {
  try {
    await axios.get(URL + "api/Courses/acceptcourse/" + id, {}, config);
    dispatch({ type: COURSE_ACCEPTED });
  } catch (error) {}
};
export const DeleteCourse = id => async dispatch => {
  try {
    await axios.delete(URL + "api/Courses/delete/" + id, {}, config);
    dispatch({ type: COURSE_DELETED });
  } catch (error) {}
};
