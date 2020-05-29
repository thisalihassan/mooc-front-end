import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import rooms from "./myRooms";
import roomview from "./RoomView";
export default ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/rooms`} />
    <Route path={`${match.url}/rooms`} component={rooms} />
    <Route path={`${match.url}/roomview`} component={roomview} />
    <Redirect to="/error" />
  </Switch>
);
