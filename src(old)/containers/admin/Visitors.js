import React, { Component, Fragment } from "react";
import VisulizeVisitors from "../../components/charts/VisulizeVisitors";
import { Row, Card } from "reactstrap";
import { Colxx } from "../../components/CustomBootstrap";

import IntlMessages from "../../util/IntlMessages";

class Visitors extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>
              <IntlMessages id="admin.top" />
            </h1>
            <Card id="rest">
              <Row>
                <Colxx xxs="12" className="mb-4">
                  <VisulizeVisitors />
                </Colxx>
              </Row>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default Visitors;
