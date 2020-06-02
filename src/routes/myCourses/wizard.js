import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx } from "../../components/CustomBootstrap";
import { injectIntl } from "react-intl";
import Basic from "../../containers/wizard/Basic";
export class FormWizard extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="2"></Colxx>
          <Colxx xxs="8" className="mb-5">
            <h1>Add Course</h1>
            <Basic />
            {/* <Validation /> */}
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(FormWizard);
