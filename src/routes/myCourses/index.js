import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Courses from "./CourseView";
import details from "./details";
import wizard from "./wizard";

export default ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/Courses`} />
    <Route path={`${match.url}/Courses`} component={Courses} />
    <Route path={`${match.url}/courseView`} component={details} />
    <Route path={`${match.url}/wizard`} component={wizard} />

    <Redirect to="/error" />
  </Switch>
);
