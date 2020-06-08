import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import setAuthToken from "./util/setAuthToken";
import App from "./containers/App";
import store from "./redux/store";
import ReactGA from "react-ga";
import { loadUser } from "./redux/actions";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
if (localStorage.token) {
  setAuthToken(localStorage.token);
  const trackingId = "UA-168654871-1";
  ReactGA.initialize(trackingId);
  ReactGA.set({
    userId: localStorage.token,
  });
  console.log(trackingId);
}
history.listen((location) => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

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
