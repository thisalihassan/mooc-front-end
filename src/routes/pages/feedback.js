import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx } from "../../components/CustomBootstrap";
import { injectIntl } from "react-intl";
import Review from "./Review";
class FormWizard extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="2"></Colxx>
          <Colxx xxs="8" className="mb-5">
            <h1>Give us your feedback!</h1>
            <Review />
            {/* <Validation /> */}
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(FormWizard);
