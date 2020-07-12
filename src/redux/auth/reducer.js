import {
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER,
  USER_LOADED,
  AUTH_ERROR,
  CONFIRMATION_USER,
} from "../../constants/actionTypes";
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  userRegistered: false,
  registrationSucess: false,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case CONFIRMATION_USER:
      return {
        ...state,
        registrationSucess: payload,
        loading: false,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        userRegistered: true,
        loading: false,
      };
    case LOGIN_USER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_USER_FAIL:
    case AUTH_ERROR:
    case LOGIN_USER_FAIL:
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
