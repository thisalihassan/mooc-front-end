import {
  CHANGE_LOCALE,
  SEARCH,
  SEARCH_BY,
  SEARCH_KEYWORD
} from "../../constants/actionTypes";
import axios from "axios";
export const changeLocale = locale => {
  localStorage.setItem("currentLanguage", locale);
  return {
    type: CHANGE_LOCALE,
    payload: locale
  };
};
export const searchSelection = searchBy => {
  localStorage.setItem("searchBy", searchBy);
  return {
    type: SEARCH_BY,
    payload: searchBy
  };
};

export const searchKeyword = searchKeyword => {
  localStorage.setItem("searchKeyword", searchKeyword);
  return {
    type: SEARCH_KEYWORD,
    payload: searchKeyword
  };
};
export const search = (name, searchItem) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5000/",
      "Access-Control-Allow-Headers":
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
    }
  };
  const body = JSON.stringify({ name, searchItem });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/search",
      body,
      config
    );
    dispatch({
      type: SEARCH,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};
