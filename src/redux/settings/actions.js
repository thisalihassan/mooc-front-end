import { SEARCH, SEARCH_BY, SEARCH_KEYWORD } from "../../constants/actionTypes";
import axios from "axios";
import { URL, config } from "../../constants/defaultValues";

export const searchSelection = (searchBy) => {
  localStorage.setItem("searchBy", searchBy);
  return {
    type: SEARCH_BY,
    payload: searchBy,
  };
};

export const searchKeyword = (searchKeyword) => {
  localStorage.setItem("searchKeyword", searchKeyword);
  return {
    type: SEARCH_KEYWORD,
    payload: searchKeyword,
  };
};
export const search = (name, searchItem) => async (dispatch) => {
  const body = JSON.stringify({ name, searchItem });

  try {
    const res = await axios.post(URL + "api/auth/search", body, config);
    dispatch({
      type: SEARCH,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
