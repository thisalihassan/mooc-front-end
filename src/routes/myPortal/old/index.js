import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import third from "./TodayEvents";
import quiz from "./quiz";
import quiz_detail from "./quiz-detail";
export default ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/todayevents`} />
    <Route path={`${match.url}/todayevents`} component={third} />
    <Route
      path={`${match.url}/quiz/:surveyid`}
      component={quiz_detail}
      isExact
    />
    <Route path={`${match.url}/quiz`} component={quiz} isExact />

    <Redirect to="/error" />
  </Switch>
);
