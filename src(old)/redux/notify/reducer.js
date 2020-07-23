import { GET_NOTIFICATION } from "../../constants/actionTypes";

const INIT_STATE = {
  notify: false,
  loading: true,
  counter: 0,
};

export default (state = INIT_STATE, action) => {
  const { type, payload, payload2 } = action;

  switch (type) {
    case GET_NOTIFICATION:
      return { ...state, loading: false, notify: payload, counter: payload2 };
    default:
      return state;
  }
};
