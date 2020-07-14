import { setAlert } from "../alert/actions";
import axios from "axios";
import { URL, config } from "../../constants/defaultValues";
import { GET_ROOMS, ROOMS_ERROR } from "../../constants/actionTypes";

export const createRoom = (body) => async (dispatch) => {
  try {
    await axios.post(URL + "api/room/", body, config);
    dispatch(setAlert("Room Created", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ROOMS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getRooms = (body) => async (dispatch) => {
  try {
    const res = await axios.post(URL + "api/room/getmyrooms", body, config);
    dispatch({
      type: GET_ROOMS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err, "danger"));

    dispatch({
      type: ROOMS_ERROR,
      payload: { msg: err, status: err },
    });
  }
};
