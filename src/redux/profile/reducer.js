import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_USER_PROFILE,
  CHANGE_PASSWORD,
  GET_REPORTS,
  ACCEPT_PROFILE
} from "../../constants/actionTypes";

const initialState = {
  profile: null,
  userProfile: null,
  profiles: [],
  loading: true,
  error: {},
  Match: "",
  reportedAccounts: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_REPORTS:
      return {
        ...state,
        reportedAccounts: payload,
        loading: false
      };
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: payload,
        loading: false
      };
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        Match: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        Match: "",
        profile: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        Match: "",
        repos: [],
        loading: false
      };
    case ACCEPT_PROFILE:
    default:
      return state;
  }
}
