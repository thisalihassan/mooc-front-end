import {
  GET_COURSE,
  GET_PENDING_COURSES,
  COURSE_ACCEPTED,
  COURSE_DELETED,
  GET_MY_COURSE,
  GET_ACTIVE_COURSES
} from "../../constants/actionTypes";

const INIT_STATE = {
  course: [],
  pendingCourses: [],
  myCourses: [],
  activeCourses: []
};

export default (state = INIT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ACTIVE_COURSES:
      return { ...state, activeCourses: payload };
    case GET_MY_COURSE:
      return { ...state, myCourses: payload };
    case GET_COURSE:
      return { ...state, course: payload };
    case GET_PENDING_COURSES:
      return { ...state, pendingCourses: payload };
    case COURSE_ACCEPTED:
    case COURSE_DELETED:
    default:
      return state;
  }
};
