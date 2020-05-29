import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import SalesChartCard from "../../containers/dashboards/SalesChartCard";
import ReactTable from "react-table";
//import TopRatedItems from "../../components/dashboards/TopRatedItems";
import Pagination from "../../components/DatatablePagination";
import GradientWithRadialProgressCard from "../../components/cards/GradientWithRadialProgressCard";
import {
  Row,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Button
} from "reactstrap";
import classnames from "classnames";
import { Colxx } from "../../components/CustomBootstrap";
import CustomInputExample from "../../containers/forms/CustomInputExample";
import TopRatedItems from "../../containers/dashboards/TopRatedItems";
import IntlMessages from "../../util/IntlMessages";
import { injectIntl } from "react-intl";
//import AboutTab from "./tabs/AboutTab";
//import AccountDelete from "./tabs/Settings";
import UserCardBasic from "../../components/cards/UserCardBasic";
import whotoFollowData from "../../data/follow";
import { getCurrentProfile } from "../../redux/actions";
//import PortfolioTab from "./tabs/portfolioTab";
import { NavLink } from "react-router-dom";
class courseAnalytics extends Component {
  render() {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Row>
          <Colxx lg="1" xl="1"></Colxx>
          <Colxx lg="10" xl="10">
            <TopRatedItems />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(courseAnalytics);
