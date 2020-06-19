import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect, Route, Switch } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { defaultStartPath } from "../constants/defaultValues";
import PropTypes from "prop-types";
import AppLocale from "../lang";
import MainRoute from "../routes";
import Login from "../routes/auth/Login";
import Register from "../routes/auth/Register";
import Forgot from "../routes/auth/forgot";
import conformation from "../routes/auth/conformation";
import "../assets/css/vendor/bootstrap.min.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "../assets/css/sass/themes/gogo.light.blue.scss";
import "react-table/react-table.css";
import Alert from "../routes/alert/alert";
import AuthRoute from "../privateRoute";
import Home from "../routes/home/landing";
const App = ({ location, match, locale }) => {
  const currentAppLocale = AppLocale[locale];
  if (
    location.pathname === "/" ||
    location.pathname === "/app" ||
    location.pathname === "/app/"
  ) {
    return <Redirect to={defaultStartPath} />;
  }
  return (
    <Fragment>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <Fragment>
          {/* <NotificationContainer /> */}
          <Alert />
          <Switch>
            <AuthRoute path={`${match.url}app`} component={MainRoute} />
            <Route path={`/forgot`} component={Forgot} />
            <Route path={`/login`} component={Login} />
            <Route path={`/register`} component={Register} />
            <Route path={`/conformation`} component={conformation} />
            <Route path={`/home`} component={Home} />
          </Switch>
        </Fragment>
      </IntlProvider>
    </Fragment>
  );
};
App.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
};
const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale };
};

export default withRouter(connect(mapStateToProps, {})(App));
