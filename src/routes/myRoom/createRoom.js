import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx } from "../../components/CustomBootstrap";
import { injectIntl } from "react-intl";
import RoomBasic from "../../containers/wizard/roomBasic";

class room extends Component {
  render() {
    return (
      <Fragment>
        {/* <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="menu.form-wizard" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row> */}
        <Row>
          <Colxx xxs="2"></Colxx>
          <Colxx xxs="8" className="mb-5">
            <h1>Create Room</h1>
            <RoomBasic />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(room);
