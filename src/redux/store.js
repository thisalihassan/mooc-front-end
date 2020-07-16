import * as reduxModule from "redux";
import { applyMiddleware, createStore, compose } from "redux";

import thunk from "redux-thunk";
import rootReducer from "./reducers";
// import { composeWithDevTools } from "redux-devtools-extension";

reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = "@@redux/INIT";

// const composeEnhancers =
//   process.env.NODE_ENV !== "production" &&
//   typeof window === "object" &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : composeWithDevTools;

const enhancer = compose(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

store.asyncReducers = {};

export default store;
