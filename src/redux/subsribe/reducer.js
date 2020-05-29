import { GET_SUBSCRIBED_COURSES } from "../../constants/actionTypes";

const INIT_STATE = {
  subscribed: []
};

export default (state = INIT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SUBSCRIBED_COURSES:
      return { ...state, subscribed: payload };
    default:
      return state;
  }
};
