import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import IntlMessages from "../util/IntlMessages";
import { Colxx, Separator } from "../components/CustomBootstrap";
import DropzoneExample from "../components/DropzoneExample";
export default class ModalUi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Card className="mb-4" id="rest">
              <CardBody>
                <CardTitle>
                  <IntlMessages id="modal.basic" />
                </CardTitle>
                <div>
                  <Button color="primary" outline onClick={this.toggle}>
                    <IntlMessages id="modal.launch-demo-modal" />
                  </Button>
                  <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                      <IntlMessages id="modal.modal-title" />
                    </ModalHeader>
                    <ModalBody>
                      <DropzoneExample />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.toggle}>
                        Do Something
                      </Button>{" "}
                      <Button color="secondary" onClick={this.toggle}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
