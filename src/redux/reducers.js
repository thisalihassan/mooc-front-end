import { combineReducers } from "redux";
import settings from "./settings/reducer";
import menu from "./menu/reducer";
import auth from "./auth/reducer";
import alert from "./alert/reducer";
import profile from "./profile/reducer";
import todoApp from "./todo/reducer";
import quizzes from "./quizDetail/reducer";
import quizList from "./quizList/reducer";
import chat from "./chat/reducer";
import course from "./course/reducer";
import subscribtion from "./subsribe/reducer";
import assignment from "./assignment/reducer";
import room from "./room/reducer";
import notifications from "./notify/reducer";
export default combineReducers({
  notifications,
  room,
  assignment,
  subscribtion,
  course,
  chat,
  alert,
  auth,
  settings,
  menu,
  profile,
  quizzes,
  quizList,
  todoApp,
});
