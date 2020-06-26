import {
  TODO_GET_LIST_SUCCESS,
  TODO_GET_LIST_ERROR,
  TODO_GET_LIST_WITH_FILTER,
} from "../../constants/actionTypes";

const INIT_STATE = {
  allTodoItems: null,
  todoItems: null,
  error: "",
  loading: true,
  filter: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TODO_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        allTodoItems: action.payload,
        todoItems: action.payload,
      };

    case TODO_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case TODO_GET_LIST_WITH_FILTER:
      if (action.payload.column === "" || action.payload.value === "") {
        return {
          ...state,
          loading: true,
          todoItems: state.allTodoItems,
          filter: null,
        };
      } else {
        const filteredItems = state.allTodoItems.filter(
          (item) => item[action.payload.column]._id === action.payload.value
        );
        return {
          ...state,
          loading: true,
          todoItems: filteredItems,
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
