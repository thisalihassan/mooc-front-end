import {
  CHAT_GET_CONVERSATIONS,
  CHAT_DELETE_CONVERSATION,
  CHAT_CHANGE_CONVERSATION
} from "../../constants/actionTypes";
import axios from "axios";
import { URL, config } from "../../constants/defaultValues";
export const loadConversations = (myroom, check = true) => async dispatch => {
  let room = myroom;
  if (check) {
    room = myroom[0] + "" + myroom[1];
  }
  const body = JSON.stringify({ room });
  try {
    const res = await axios.post(
      URL + "api/message/FindMessages",
      body,
      config
    );
    dispatch({ type: CHAT_GET_CONVERSATIONS, payload: res.data });
  } catch (error) {}
};

export const deleteConversation = (myroom, check = true) => async dispatch => {
  let room = myroom;
  if (check) {
    room = myroom[0] + "" + myroom[1];
  }
  const body = JSON.stringify({ room });
  try {
    await axios.post(URL + "api/message/delete", body, config);
    dispatch({ type: CHAT_DELETE_CONVERSATION });
  } catch (error) {}
};
// export const getContacts = () => ({
//   type: CHAT_GET_CONTACTS
// });

// export const getContactsSuccess = (contacts, currentUser) => {
//   return {
//     type: CHAT_GET_CONTACTS_SUCCESS,
//     payload: { contacts, currentUser }
//   };
// };

// export const getContactsError = error => ({
//   type: CHAT_GET_CONTACTS_ERROR,
//   payload: error
// });

// export const getConversations = userId => ({
//   type: CHAT_GET_CONVERSATIONS,
//   payload: userId
// });
// export const getConversationsSuccess = (conversations, selectedUser) => ({
//   type: CHAT_GET_CONVERSATIONS_SUCCESS,
//   payload: { conversations, selectedUser }
// });

// export const getConversationsError = error => ({
//   type: CHAT_GET_CONVERSATIONS_ERROR,
//   payload: error
// });

// export const addMessageToConversation = (
//   currentUserId,
//   selectedUserId,
//   message,
//   allConversations
// ) => ({
//   type: CHAT_ADD_MESSAGE_TO_CONVERSATION,
//   payload: { currentUserId, selectedUserId, message, allConversations }
// });

// export const createConversation = (
//   currentUserId,
//   selectedUserId,
//   allConversations
// ) => {
//   return {
//     type: CHAT_CREATE_CONVERSATION,
//     payload: { currentUserId, selectedUserId, allConversations }
//   };
// };

// export const searchContact = keyword => ({
//   type: CHAT_SEARCH_CONTACT,
//   payload: keyword
// });

export const changeConversation = userId => dispatch => {
  dispatch({
    type: CHAT_CHANGE_CONVERSATION,
    payload: userId
  });
};
