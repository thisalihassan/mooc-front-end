import { GET_NOTIFICATION } from "../../constants/actionTypes";
import axios from "axios";
import { URL, config } from "../../constants/defaultValues";

export const getNotifications = (course) => async (dispatch) => {
  let body = JSON.stringify({ course });
  try {
    const res = await axios.post(
      URL + "api/notifications/getNotification",
      body,
      config
    );
    const center = res.data;

    let counter = 0;
    if (center) {
      counter = center.counter;
      dispatch({
        type: GET_NOTIFICATION,
        payload: center.notification,
        payload2: counter,
      });
    } else {
      dispatch({ type: GET_NOTIFICATION, payload: [], payload2: counter });
    }
  } catch (error) {}
};
