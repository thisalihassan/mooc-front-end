import {
  GET_SUBSCRIBED_COURSES,
  GET_RECOMMENDED_COURSES,
  GET_TOP_COURSES,
  GET_SIMILAR_COURSES,
} from "../../constants/actionTypes";

const INIT_STATE = {
  subscribed: false,
  recommendation: [],
  relatedcourses: [],
  topcourses: [],
  subloading: true,
  recloading: true,
  toploading: true,
  relloading: true,
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
    case GET_SIMILAR_COURSES:
      return { ...state, relatedcourses: payload, relloading: false };
    default:
      return state;
  }
};
