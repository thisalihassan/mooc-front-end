import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import Top from "./landing/top";
import home from "./landing";
import courseDetal from "./courseDetal";
import search from "./search";
import Category from "./CategoryView";
class MainApp extends Component {
  render() {
    const { match, containerClassnames } = this.props;
    return (
      <div id="app-container" className={containerClassnames}>
        <Top history={this.props.history} />

        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/home`} />
          <Route
            path={`${match.url}/courseview`}
            component={courseDetal}
          />{" "}
          <Route path={`${match.url}/category`} component={Category} />
          <Route path={`${match.url}/home`} component={home} />
          <Route path={`${match.url}/search`} component={search} />
          <Redirect to="/error" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(MainApp);
