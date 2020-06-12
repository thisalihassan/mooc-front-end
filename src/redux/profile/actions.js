import axios from "axios";
import { setAlert } from "../alert/actions";
import { URL, config } from "../../constants/defaultValues";
import {
  GET_PROFILE,
  ACCEPT_PROFILE,
  GET_PROFILES,
  GET_USER_PROFILE,
  GET_REPORTS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from "../../constants/actionTypes";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get(URL + "api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const AcceptProfile = (id) => async (dispatch) => {
  try {
    const body = JSON.stringify({ id });
    await axios.post(URL + "api/profile/approveProfile", body, config);
    dispatch({ type: ACCEPT_PROFILE });
  } catch (error) {}
};
export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get(URL + "api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(URL + `api/profile/userProfile/${userId}`);

    dispatch({
      type: GET_USER_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getReportedAccounts = () => async (dispatch) => {
  try {
    const res = await axios.post(URL + "api/profile/getreports", {}, config);

    dispatch({
      type: GET_REPORTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createProfile = (body, edit = false) => async (dispatch) => {
  try {
    const res = await axios.post(URL + "api/profile", body, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const changePassword = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      URL + "api/auth/changePassword",
      formData,
      config
    );
    dispatch(setAlert("Profile Updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addEducation = (formData) => async (dispatch) => {
  try {
    const res = await axios.put(
      URL + "api/profile/education",
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addWork = (formData) => async (dispatch) => {
  try {
    const res = await axios.put(URL + "api/profile/work", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Work Experience Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(URL + `api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteWork = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(URL + `api/profile/work/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Work Experience Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const UpdateEducation = (id, body) => async (dispatch) => {
  try {
    const res = await axios.post(
      URL + `api/profile/education/${id}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Updated", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const UpdateWork = (id, body) => async (dispatch) => {
  try {
    const res = await axios.post(URL + `api/profile/work/${id}`, body, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Work Experience Updated", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteMyAccount = (formData) => async (dispatch) => {
  try {
    await axios.post(URL + "api/profile/delete", formData, config);

    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: ACCOUNT_DELETED });

    dispatch(setAlert("Your account has been permanantly deleted"));
  } catch (err) {
    dispatch(setAlert("Invalid Credentials", "danger"));
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
