import axios from "axios";
import { setAlert } from "../actions";
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  CLEAR_PROFILE
} from "../../constants/actionTypes";
import { URL, config } from "../../constants/defaultValues";
import setAuthToken from "../../util/setAuthToken";

// const instance = axios.create({
//   timeout: 1000,
//   crossdomain: true,
//   headers: {
//     'Access-Control-Allow-Origin': 'http://localhost:5000/',
//     'Access-Control-Allow-Headers':
//       'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization'
//   }
// });
// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(URL + "api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = ({ name, email, roll, password }) => async dispatch => {
  const body = JSON.stringify({ name, email, roll, password });

  try {
    const res = await axios.post(URL + "api/users", body, config);

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_USER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(URL + "api/auth", body, config);
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_USER_FAIL
    });
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT_USER });
};

// conformtion
export const conformtion = (id, token) => async dispatch => {
  const body = JSON.stringify({ id, token });

  try {
    const res = await axios.post(URL + "api/auth/confirmation", body, config);

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_USER_FAIL
    });
  }
};
