import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import TopNav from "../containers/TopNav";
import Sidebar from "../containers/Sidebar";
import Alert from "./alert/alert";
import myroom from "./myRoom";
import portal from "./myPortal";
import messages from "./messages";
import courses from "./myCourses";
import { connect } from "react-redux";
import profile from "./profile";
import admin from "../containers/admin/";
import search from "./pages/search";
import notification from "./pages/notification";
import feedback from "./pages/feedback";
import help from "./pages/help";

class MainApp extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { match, containerClassnames } = this.props;
    return (
      <div id="app-container" className={containerClassnames}>
        <TopNav history={this.props.history} />
        <Sidebar />
        <main>
          <div className="container-fluid">
            <Alert />
            <Switch>
              <Route path={`${match.url}/help`} component={help} />
              <Route
                path={`${match.url}/feedback/:cid/:tid`}
                component={feedback}
                isExact
              />
              <Route
                path={`${match.url}/notification`}
                component={notification}
              />
              <Route path={`${match.url}/myrooms`} component={myroom} />
              <Route path={`${match.url}/messages`} component={messages} />
              <Route path={`${match.url}/myportal`} component={portal} />{" "}
              <Route path={`${match.url}/mycourses`} component={courses} />
              <Route path={`${match.url}/profile`} component={profile} />{" "}
              <Route path={`${match.url}/admin`} component={admin} />
              <Route path={`${match.url}/search`} component={search} />
             
              <Redirect to="/error" />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(MainApp));
