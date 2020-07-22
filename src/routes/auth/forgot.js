import React, { Component } from "react";
import "react-tagsinput/react-tagsinput.css";
import { withRouter } from "react-router-dom";
import { Colxx } from "../../components/CustomBootstrap";
import "./App.css";
import { connect } from "react-redux";
import { Card, CardBody, FormGroup, Label, Row } from "reactstrap";
import IntlMessages from "../../util/IntlMessages";
import { Wizard, Steps, Step } from "react-albus";
import { injectIntl } from "react-intl";
import { BottomNavigation } from "../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../components/wizard/TopNavigation";
import { Formik, Form, Field } from "formik";
import { login, setAlert } from "../../redux/actions";
import { URL, config } from "../../constants/defaultValues";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

export function validateEmail(value) {
  let error;
  if (!value) {
    error = "Please enter your email address";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
}
export function validatePassword(value) {
  let error;
  if (!value) {
    error = "Please enter your password";
  } else if (value.length < 8) {
    error = "Password must be longer than 8 characters";
  }
  return error;
}

export function validatePasscode(value) {
  let error;
  if (!value) {
    error = "Please enter your passcode";
  } else if (value.length < 6) {
    error = "Enter Correct Passcode";
  }
  return error;
}
export class Basic extends Component {
  constructor(props) {
    super(props);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePasscode = this.validatePasscode.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateCPassword = this.validateCPassword.bind(this);
    this.form0 = React.createRef();
    this.form1 = React.createRef();
    this.form2 = React.createRef();
    this.form3 = React.createRef();
    this.state = {
      bottomNavHidden: false,
      topNavDisabled: false,
      loading: false,
      buttonDisabled: false,
      fields: [
        {
          valid: false,
          name: "email",
          value: "",
        },
        {
          valid: false,
          name: "passcode",
          value: "",
        },
        {
          valid: false,
          name: "password",
          value: "",
        },
        {
          valid: false,
          name: "cpassword",
          value: "",
        },
      ],
    };
  }
  componentDidMount() {
    this.setState({
      fields: [
        { ...this.state.fields[0], form: this.form0 },
        { ...this.state.fields[1], form: this.form1 },
        { ...this.state.fields[2], form: this.form2 },
        { ...this.state.fields[3], form: this.form3 },
      ],
    });
  }
  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  validateEmail(value) {
    return validateEmail(value);
  }
  validateCPassword(value) {
    let error;
    if (value !== this.state.fields[2].value) {
      error = "Password does not match";
    }
    if (!value) {
      error = "Please enter password";
    }
    return error;
  }
  validatePassword(value) {
    let error;
    if (!value) {
      error = "Please enter your password";
    } else if (value.length < 8) {
      error = "Password must be longer than 8 characters";
    }
    return error;
  }
  validatePasscode(value) {
    let error;
    if (!value) {
      error = "Please enter your passcode";
    } else if (value.length < 6) {
      error = "Passcode must be longer than 6 characters";
    }
    return error;
  }

  hideNavigation() {
    this.setState({ bottomNavHidden: true, topNavDisabled: true });
  }

  asyncLoading() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
    this.props.history.push("/login");
  }

  async onClickNext(goToNext, steps, step) {
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    let formIndex = steps.indexOf(step);
    let form = this.state.fields[formIndex].form.current;
    let name = this.state.fields[formIndex].name;
    form.submitForm().then(async () => {
      let fields = this.state.fields;
      fields[formIndex].value = form.state.values[name];
      fields[formIndex].valid = form.state.errors[name] ? false : true;
      this.setState({ fields });
      if (!form.state.errors[name]) {
        if (name === "email") {
          let email = this.state.fields[formIndex].value;
          console.log(email);
          const body = JSON.stringify({ email });
          try {
            await axios.post(URL + "api/auth/resend", body, config);

            this.props.setAlert("Verification code has been resend", "success");
          } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
              errors.forEach((error) =>
                this.props.setAlert(error.msg, "danger")
              );
            }
          }
        }
        goToNext();
        step.isDone = true;
        if (steps.length - 2 <= steps.indexOf(step)) {
          let email = this.state.fields[0].value;
          let token = this.state.fields[1].value;
          let password = this.state.fields[2].value;
          const body = JSON.stringify({ email, token, password });
          axios.post(URL + "api/auth/confirmToken", body, config);
          this.hideNavigation();
          this.asyncLoading();
        }
      }
    });
  }

  onClickPrev(goToPrev, steps, step) {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  }

  render() {
    const { messages } = this.props.intl;
    return (
      <Row>
        <Colxx xxs="2"></Colxx>

        <Colxx xxs="8" className="mb-5">
          <h1 className="head">RESET YOUR PASSWORD</h1>

          {/* <Validation /> */}

          <Card>
            <CardBody className="wizard wizard-default">
              <Wizard>
                <TopNavigation
                  className="justify-content-center"
                  disableNav={true}
                />
                <Steps>
                  <Step
                    id="step1"
                    name={messages["wizard.step-name-1"]}
                    desc={messages["wizard.step-forgotdesc-1"]}
                  >
                    <div className="wizard-basic-step">
                      <Formik
                        ref={this.form0}
                        initialValues={{
                          email: this.state.fields[0].value,
                        }}
                        onSubmit={() => {}}
                      >
                        {({ errors, touched }) => (
                          <Form className="av-tooltip tooltip-label-right">
                            <FormGroup>
                              <Label>{messages["formss.email"]}</Label>
                              <Field
                                className="form-control"
                                name="email"
                                validate={this.validateEmail}
                              />
                              {errors.email && touched.email && (
                                <div className="invalid-feedback d-block">
                                  {errors.email}
                                </div>
                              )}
                            </FormGroup>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </Step>
                  <Step
                    id="step2"
                    name={messages["wizard.step-name-2"]}
                    desc={messages["wizard.forgotstep-desc-2"]}
                  >
                    <div className="wizard-basic-step">
                      <Formik
                        ref={this.form1}
                        initialValues={{
                          passcode: this.state.fields[1].value,
                        }}
                        onSubmit={() => {}}
                      >
                        {({ errors, touched }) => (
                          <Form className="av-tooltip tooltip-label-right">
                            <FormGroup>
                              <Label>{messages["forms.passcode"]}</Label>
                              <Field
                                className="form-control"
                                name="passcode"
                                validate={this.validatePasscode}
                              />
                              {errors.passcode && touched.passcode && (
                                <div className="invalid-feedback d-block">
                                  {errors.passcode}
                                </div>
                              )}
                            </FormGroup>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </Step>
                  <Step
                    id="step3"
                    name={messages["wizard.step-name-3"]}
                    desc={messages["wizard.step-newdesc-3"]}
                  >
                    <div className="wizard-basic-step">
                      <Formik
                        ref={this.form2}
                        initialValues={{
                          password: this.state.fields[2].value,
                        }}
                        onSubmit={() => {}}
                      >
                        {({ errors, touched }) => (
                          <Form className="av-tooltip tooltip-label-right error-l-75">
                            <FormGroup>
                              <Label>{messages["forms.password"]}</Label>
                              <Field
                                className="form-control"
                                name="password"
                                validate={this.validatePassword}
                              />
                              {errors.password && touched.password && (
                                <div className="invalid-feedback d-block">
                                  {errors.password}
                                </div>
                              )}
                            </FormGroup>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </Step>
                  <Step
                    id="step4"
                    name={messages["wizard.step-name-3"]}
                    desc={messages["wizard.step-newdesc-4"]}
                  >
                    <div className="wizard-basic-step">
                      <Formik
                        ref={this.form3}
                        initialValues={{
                          cpassword: this.state.fields[3].value,
                        }}
                        onSubmit={() => {}}
                      >
                        {({ errors, touched }) => (
                          <Form className="av-tooltip tooltip-label-right error-l-75">
                            <FormGroup>
                              <Label>{messages["forms.cpassword"]}</Label>
                              <Field
                                className="form-control"
                                name="cpassword"
                                validate={this.validateCPassword}
                              />
                              {errors.cpassword && touched.cpassword && (
                                <div className="invalid-feedback d-block">
                                  {errors.cpassword}
                                </div>
                              )}
                            </FormGroup>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </Step>
                  <Step id="step5" hideTopNav={true}>
                    <div className="wizard-basic-step text-center">
                      <h2 className="mb-2">
                        <IntlMessages id="wizard.content-forgot" />
                      </h2>
                      <p>
                        <IntlMessages id="wizard.forgotpass" />
                      </p>
                    </div>
                  </Step>
                </Steps>
                <BottomNavigation
                  onClickNext={this.onClickNext}
                  onClickPrev={this.onClickPrev}
                  className={
                    "justify-content-center " +
                    (this.state.bottomNavHidden && "invisible")
                  }
                  prevLabel={messages["wizard.prev"]}
                  nextLabel={messages["wizard.next"]}
                />
              </Wizard>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { isAuthenticated } = auth;

  return {
    isAuthenticated,
  };
};
export default injectIntl(
  withRouter(connect(mapStateToProps, { login, setAlert })(Basic))
);
