import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import complaint from "./Complaint";
import courserequest from "./CourseRequest";
import manageaccount from "./ManageAccount";
import visitors from "./Visitors";
export default ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/complaint`} />
    <Route path={`${match.url}/complaint`} component={complaint} />
    <Route path={`${match.url}/courserequest`} component={courserequest} />
    <Route path={`${match.url}/visitors`} component={visitors} />
    <Route path={`${match.url}/manageaccount`} component={manageaccount} />
    <Redirect to="/error" />
  </Switch>
);
