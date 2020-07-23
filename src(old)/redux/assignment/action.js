import {
  GET_ASSIGNMENT_ERR,
  GET_ASSIGNMENT,
  ASSINGMENT_WITH_FILTER,
} from "../../constants/actionTypes";
import axios from "axios";
import { URL, config } from "../../constants/defaultValues";

export const getAssignments = (course, user) => async (dispatch) => {
  const { _id, roll } = user;
  const body = JSON.stringify({ course, roll });
  try {
    let items = await axios.post(
      URL + "api/assignment/getassignments",
      body,
      config
    );
    if (roll === "student") {
      const myassignment = [];
      for (let i = 0; i < items.data.length; i++) {
        for (let j = 0; j < items.data[i].submitassignment.length; j++) {
          if (items.data[i].submitassignment[j].user === _id)
            myassignment.push(items.data[i].submitassignment[j].assignment);
        }
      }

      const newassignment = [];

      for (let i = 0; i < items.data.length; i++) {
        const assignment = [];
        const myass = {};
        for (let j = 0; j < items.data[i].assignment.length; j++) {
          const mthc = myassignment.find(
            (x) => x === items.data[i].assignment[j]._id
          );

          if (!mthc) {
            assignment.push(items.data[i].assignment[j]);
          }
        }
        myass.course = items.data[i].course;
        myass.assignment = assignment;
        newassignment.push(myass);
      }
      items.data = newassignment;
    }
    dispatch({ type: GET_ASSIGNMENT, payload: items.data });
  } catch (error) {
    dispatch({ type: GET_ASSIGNMENT_ERR, payload: error });
  }
};

export const getAssignmentswithFilter = (column, value) => ({
  type: ASSINGMENT_WITH_FILTER,
  payload: { column, value },
});
