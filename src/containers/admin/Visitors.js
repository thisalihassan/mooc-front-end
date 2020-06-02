import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import SalesChartCard from "../../components/charts/SalesChartCard";
import ReactTable from "react-table";
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

import IntlMessages from "../../util/IntlMessages";

class ProfilePortfolio extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>
              <IntlMessages id="admin.top" />
            </h1>
            <Card>
              <Row>
                <Colxx xxs="12" className="mb-4">
                  <SalesChartCard />
                </Colxx>
              </Row>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default ProfilePortfolio;
