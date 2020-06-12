import {
  TODO_GET_LIST,
  TODO_GET_LIST_SUCCESS,
  TODO_GET_LIST_ERROR,
  TODO_ADD_ITEM,
  TODO_ADD_ITEM_SUCCESS,
  TODO_ADD_ITEM_ERROR,
  TODO_SELECTED_ITEMS_CHANGE
} from "../../constants/actionTypes";

const INIT_STATE = {
  allTodoItems: [],
  todoItems: [],
  error: "",
  loading: true
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TODO_GET_LIST:
      return { ...state, loading: false };

    case TODO_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: true,
        allTodoItems: action.payload,
        todoItems: action.payload
      };

    case TODO_GET_LIST_ERROR:
      return { ...state, loading: true, error: action.payload };

    case TODO_ADD_ITEM:
      return { ...state, loading: false };

    case TODO_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: true,
        allTodoItems: action.payload,
        todoItems: action.payload
      };

    case TODO_ADD_ITEM_ERROR:
      return { ...state, loading: true, error: action.payload };

    default:
      return { ...state };
  }
};
