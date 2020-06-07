import {
  GET_SUBSCRIBED_COURSES,
  GET_RECOMMENDED_COURSES,
  GET_TOP_COURSES,
  GET_SIMILAR_COURSES,
} from "../../constants/actionTypes";
import axios from "axios";
import { URL, config } from "../../constants/defaultValues";

export const GetSubscription = () => async (dispatch) => {
  try {
    const res = await axios.post(
      URL + "api/subscribe/getsubscription/",
      {},
      config
    );
    dispatch({ type: GET_SUBSCRIBED_COURSES, payload: res.data });
  } catch (error) {}
};
export const GetRecommendation = () => async (dispatch) => {
  try {
    const res = await axios.post(URL + "api/recomendation", {}, config);

    dispatch({ type: GET_RECOMMENDED_COURSES, payload: res.data.courses });
  } catch (error) {}
};
export const GetTopCourses = () => async (dispatch) => {
  try {
    const res = await axios.post(URL + "api/Courses/topcourses", {}, config);
    dispatch({ type: GET_TOP_COURSES, payload: res.data });
  } catch (error) {}
};
export const GetSimilarCourses = (body) => async (dispatch) => {
  try {
    console.log("Hereerere");
    const res = await axios.post(
      URL + "api/recomendation/likecourses",
      body,
      config
    );
    dispatch({ type: GET_SIMILAR_COURSES, payload: res.data.courses });
  } catch (error) {}
};
