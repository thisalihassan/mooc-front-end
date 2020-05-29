import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import setAuthToken from "./util/setAuthToken";
import App from "./containers/App";
import store from "./redux/store";
import { loadUser } from "./redux/actions";
// import io from 'socket.io-client';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
// let socket;
// if (!socket) {
//   socket = io(':3500');
// }
// console.log(socket.id);
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
