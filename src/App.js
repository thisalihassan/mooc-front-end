import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import setAuthToken from "./util/setAuthToken";
import App from "./containers/App";
import store from "./redux/store";
import ReactGA from "react-ga";
import { loadUser } from "./redux/actions";
import uuid from "uuid";
import queryString from "query-string";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
if (!localStorage.userid) {
  localStorage.setItem("userid", uuid.v4());
}
if (localStorage.userid) {
  const trackingId = "UA-168654871-1";
  ReactGA.initialize(trackingId);
  ReactGA.set({
    userId: localStorage.userid,
  });
}

history.listen((location) => {
  const values = queryString.parse(location.search);
  if (location.pathname === "/app/mycourses/courseView/") {
    ReactGA.set({ page: location.pathname + "" + values });
    ReactGA.pageview(location.pathname + "" + values);
  } else {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }
  console.log(location.pathname);
});

const MainApp = () => {
  useEffect(() => {
    store.dispatch(loadUser(null));
  }, []);
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </Provider>
  );
};
ReactDOM.render(<MainApp />, document.getElementById("root"));
serviceWorker.unregister();
