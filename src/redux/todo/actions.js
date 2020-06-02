import { getDateWithFormat } from "../../util/Utils";

import {
  TODO_GET_LIST,
  TODO_GET_LIST_SUCCESS,
  TODO_GET_LIST_ERROR,
  TODO_ADD_ITEM_SUCCESS,
  TODO_ADD_ITEM_ERROR
} from "../../constants/actionTypes";

// export const getTodoListItems = () => dispatch => {
//   try {
//     dispatch({
//       type: TODO_GET_LIST_SUCCESS,
//       payload: todoData.data
//     });
//     dispatch({ type: TODO_GET_LIST });
//   } catch (error) {
//     dispatch({ type: TODO_GET_LIST_ERROR, payload: error });
//   }
// };

// export const addTodoItemSuccess = item => dispatch => {
//   try {
//     let items = todoData.data;
//     item.id = items.length + 1;
//     item.createDate = getDateWithFormat();
//     items.splice(0, 0, item);
//     dispatch({ type: TODO_ADD_ITEM_SUCCESS, payload: items });
//   } catch (error) {
//     dispatch({ type: TODO_ADD_ITEM_ERROR, payload: error });
//   }
// };
// export const getTodoList = () => ({
//   type: TODO_GET_LIST
// });
