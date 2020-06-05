import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import setAuthToken from "./util/setAuthToken";
import App from "./containers/App";
import store from "./redux/store";
import { loadUser } from "./redux/actions";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const MainApp = () => {
  useEffect(() => {
    store.dispatch(loadUser(null));
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </Provider>
  );
};
ReactDOM.render(<MainApp />, document.getElementById("root"));
serviceWorker.unregister();
