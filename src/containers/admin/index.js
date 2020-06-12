import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import complaint from "./Complaint";
import courserequest from "./CourseRequest";
import manageaccount from "./ManageAccount";
import visitors from "./Visitors";
import TredingCourses from "./TrendingCourses";
export default ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/complaint`} />
    <Route path={`${match.url}/complaint`} component={complaint} />
    <Route path={`${match.url}/courserequest`} component={courserequest} />
    <Route path={`${match.url}/visitors`} component={visitors} />
    <Route path={`${match.url}/manageaccount`} component={manageaccount} />
    <Route path={`${match.url}/trending`} component={TredingCourses} />
    <Redirect to="/error" />
  </Switch>
);
