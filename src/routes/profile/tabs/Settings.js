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
  Label,
  Form
} from "reactstrap";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Colxx } from "../../../components/CustomBootstrap";
import { changePassword, deleteMyAccount } from "../../../redux/actions";
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AccountDeleteModal: false,
      ChangePasswordModal: false,
      password: "",
      cpassword: "",
      newPassword: ""
    };
  }
  AccountToggle = () => {
    this.setState(prevState => ({
      AccountDeleteModal: !prevState.AccountDeleteModal
    }));
  };
  ChangePassToggle = () => {
    this.setState(prevState => ({
      ChangePasswordModal: !prevState.ChangePasswordModal
    }));
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };
  checkPassword(e) {
    e.preventDefault();
    const password = this.state.password;
    const cpassword = this.state.newPassword;
    const id = this.props.authUser.user._id;
    const body = { password, cpassword, id };
    this.props.changePassword(body);
    this.ChangePassToggle();
  }
  deleteAccount(e) {
    e.preventDefault();
    const password = this.state.password;
    const id = this.props.authUser.user._id;
    const body = { password, id };
    this.props.deleteMyAccount(body);
    this.AccountToggle();
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  <h3>Change Password</h3>
                </CardTitle>
                <div>
                  <Button
                    color="primary"
                    outline
                    onClick={this.ChangePassToggle}
                  >
                    Button
                  </Button>
                  <Modal
                    isOpen={this.state.ChangePasswordModal}
                    toggle={this.ChangePassToggle}
                  >
                    <ModalHeader toggle={this.ChangePassToggle}>
                      Password Change
                    </ModalHeader>
                    <ModalBody>
                      Do you want to change the password?
                      <Form>
                        <FormGroup row>
                          <Label for="thepassword" sm={2}>
                            Old Password
                          </Label>
                          <Colxx sm={10}>
                            <Input
                              type="password"
                              name="password"
                              id="thepassword"
                              onChange={this.handleChange}
                              placeholder="Password"
                            />
                          </Colxx>
                        </FormGroup>

                        <FormGroup row>
                          <Label for="newPassword" sm={2}>
                            New Password
                          </Label>
                          <Colxx sm={10}>
                            <Input
                              type="password"
                              name="newPassword"
                              onChange={this.handleChange}
                              id="newPassword"
                              placeholder="Password"
                            />
                          </Colxx>
                        </FormGroup>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        onClick={e => this.checkPassword(e)}
                      >
                        Accept
                      </Button>{" "}
                      <Button color="secondary" onClick={this.ChangePassToggle}>
                        Reject
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12">
            <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  <h3>Delete Account</h3>
                </CardTitle>
                <div>
                  <Button color="primary" outline onClick={this.AccountToggle}>
                    Button
                  </Button>
                  <Modal
                    isOpen={this.state.AccountDeleteModal}
                    toggle={this.AccountToggle}
                  >
                    <ModalHeader toggle={this.AccountToggle}>
                      Delete Account
                    </ModalHeader>
                    <ModalBody>
                      Are you Sure you want to delete this account? The process
                      is irreversible. Please Enter your password to continue.
                      <Form>
                        <FormGroup row>
                          <Label for="thepassword" sm={2}>
                            Password
                          </Label>
                          <Colxx sm={10}>
                            <Input
                              type="password"
                              name="password"
                              id="thepassword"
                              onChange={this.handleChange}
                              placeholder="Password"
                            />
                          </Colxx>
                        </FormGroup>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        onClick={e => this.deleteAccount(e)}
                      >
                        Accept
                      </Button>{" "}
                      <Button color="secondary" onClick={this.AccountToggle}>
                        Reject
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
const mapStateToProps = state => {
  const authUser = state.auth;
  const profile = state.profile;
  return { authUser, profile };
};

export default injectIntl(
  connect(mapStateToProps, { changePassword, deleteMyAccount })(Settings)
);
