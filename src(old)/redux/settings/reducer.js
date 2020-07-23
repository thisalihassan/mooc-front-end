import {
  defaultLocale,
  defaultSearch,
  searchBy,
} from "../../constants/defaultValues";

import { SEARCH, SEARCH_BY, SEARCH_KEYWORD } from "../../constants/actionTypes";

const INIT_STATE = {
  searchBy:
    localStorage.getItem("searchBy") &&
    searchBy.filter((x) => x.id === localStorage.getItem("searchBy")).length > 0
      ? localStorage.getItem("searchBy")
      : defaultSearch,
  locale: defaultLocale,
  searchKeyword: localStorage.getItem("searchKeyword")
    ? localStorage.getItem("searchKeyword")
    : "",
  searchItems: "",
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SEARCH_BY:
      return { ...state, searchBy: action.payload };
    case SEARCH_KEYWORD:
      return { ...state, searchKeyword: action.payload };
    case SEARCH:
      return { ...state, searchItems: action.payload };
    default:
      return { ...state };
  }
};
