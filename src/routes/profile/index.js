import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import userProfile from "./userProfile";
import OtherView from "./OthersView";
export default ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/profile`} />
    <Route path={`${match.url}/profile`} component={userProfile} />
    <Route path={`${match.url}/userprofile`} component={OtherView} />
    <Redirect to="/error" />
  </Switch>
);
