import { GET_SUBSCRIBED_COURSES } from "../../constants/actionTypes";
import axios from "axios";
import { URL, config } from "../../constants/defaultValues";

export const GetSubscription = () => async dispatch => {
  try {
    const res = await axios.post(
      URL + "api/subscribe/getsubscription/",
      {},
      config
    );
    dispatch({ type: GET_SUBSCRIBED_COURSES, payload: res.data });
  } catch (error) {}
};
