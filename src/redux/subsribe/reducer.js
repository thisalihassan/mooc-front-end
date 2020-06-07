import {
  GET_SUBSCRIBED_COURSES,
  GET_RECOMMENDED_COURSES,
  GET_TOP_COURSES,
} from "../../constants/actionTypes";

const INIT_STATE = {
  subscribed: [],
  recommendation: [],
  topcourses: [],
  subloading: true,
  recloading: true,
  toploading: true,
};

export default (state = INIT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SUBSCRIBED_COURSES:
      return { ...state, subscribed: payload, subloading: false };
    case GET_RECOMMENDED_COURSES:
      return { ...state, recommendation: payload, recloading: false };
    case GET_TOP_COURSES:
      return { ...state, topcourses: payload, toploading: false };
    default:
      return state;
  }
};
