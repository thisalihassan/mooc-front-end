import { GET_NOTIFICATION } from "../../constants/actionTypes";
import axios from "axios";
import { URL, config } from "../../constants/defaultValues";

export const getNotifications = (course, id) => async (dispatch) => {
  let body = JSON.stringify({ course });
  try {
    const res = await axios.post(
      URL + "api/notifications/getNotification",
      body,
      config
    );

    let notifications = [];
    let notify = [];
    const center = res.data;
    let totalSize = center.length;

    for (let i = 0; i < totalSize; i++) {
      if (id !== center[i].user)
        for (let j = 0; j < center[i].notification.length; j++) {
          notifications.push(center[i].notification[j]);
        }
    }
    totalSize = notifications.length;
    let j = 0;
    for (let i = totalSize - 1; i >= 0; i--, j++) {
      notify[i] = notifications[j];
    }
    const user = center[0].user;
    const course = center[0].course;
    notify.push(user, course);
    // for (let i = 0; i < notifications.length; i++) {
    //   notify.push(notifications[i]);
    // }
    dispatch({ type: GET_NOTIFICATION, payload: notify });
  } catch (error) {}
};
