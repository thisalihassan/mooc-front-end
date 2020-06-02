import { GET_NOTIFICATION } from "../../constants/actionTypes";

const INIT_STATE = {
  notify: [],
  loading: true
};

export default (state = INIT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_NOTIFICATION:
      return { ...state, loading: false, notify: payload };
    default:
      return state;
  }
};
