import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
<<<<<<< HEAD
import { Colxx } from "../../components/CustomBootstrap";
import { injectIntl } from "react-intl";
import RoomBasic from "../../containers/wizard/roomBasic";
=======
import { Colxx, Separator } from "../../components/CustomBootstrap";
import { injectIntl } from "react-intl";
import RoomBasic from "../../containers/wizard/roomBasic";
import LastStepEnd from "../../containers/wizard/LastStepEnd";
import TopNavDisabled from "../../containers/wizard/TopNavDisabled";
import Validation from "../../containers/wizard/Validation";
import Layouts from "../../containers/wizard/Layouts";
>>>>>>> 6d2f6e7768c5a2bd2d929501f660bc9c5c2a333e

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
