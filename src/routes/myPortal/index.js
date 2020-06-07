import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import anouncements from "./Anouncements";
import quiz from "./quiz";
import quiz_detail from "./quiz-detail";
import assignment from "./assignment";
import AssignmentView from "./AssignmentView";
import view from "./ViewQuiz";
export default ({ match }) => (
  <Switch>
    {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/anouncements`} /> */}
    <Route path={`${match.url}/anouncements`} component={anouncements} />
    <Route path={`${match.url}/openquiz`} component={quiz_detail} />
    <Route path={`${match.url}/quiz`} component={quiz} />
    <Route path={`${match.url}/assignment`} component={assignment} />
    <Route
      path={`${match.url}/viewassignment/:id`}
      component={AssignmentView}
      isExact
    />
    <Route path={`${match.url}/viewquiz/:id`} component={view} isExact />
    <Redirect to="/error" />
  </Switch>
);
