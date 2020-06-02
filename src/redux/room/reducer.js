import {
  GET_ROOMS,
  ROOM_CREATED,
  GET_MY_ROOMS,
  ROOMS_ERROR
} from "../../constants/actionTypes";

const initialState = {
  rooms: [],
  room: null,
  loading: true,
  error: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MY_ROOMS:
      return {
        ...state,
        room: payload,
        loading: false
      };
    case GET_ROOMS:
      return {
        ...state,
        rooms: payload,
        loading: false
      };

    case ROOMS_ERROR:
      return {
        ...state,
        rooms: [],
        loading: true,
        error: payload
      };
    default:
      return {
        ...state
      };
  }
}
