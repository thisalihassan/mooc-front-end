import {
  GET_ASSIGNMENT_ERR,
  GET_ASSIGNMENT,
  ASSINGMENT_WITH_FILTER,
} from "../../constants/actionTypes";

const INIT_STATE = {
  assignments: null,
  selectedassignments: null,
  error: "",
  loading: false,
  filter: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ASSIGNMENT:
      return {
        ...state,
        loading: true,
        assignments: action.payload,
        selectedassignments: action.payload,
      };
    case GET_ASSIGNMENT_ERR:
      return { ...state, loading: true, error: action.payload };
    case ASSINGMENT_WITH_FILTER:
      if (action.payload.column === "" || action.payload.value === "") {
        return {
          ...state,
          loading: true,
          selectedassignments: state.assignments,
          filter: null,
        };
      } else {
        const filteredItems = state.assignments.filter(
          (item) => item[action.payload.column]._id === action.payload.value
        );
        return {
          ...state,
          loading: true,
          selectedassignments: filteredItems,
          filter: {
            column: action.payload.column,
            value: action.payload.value,
          },
        };
      }
    default:
      return { ...state };
  }
};
