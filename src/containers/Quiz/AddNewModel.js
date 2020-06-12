import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { FormikReactSelect, FormikSwitch } from "../../components/FormikFields";
import { Formik, Form, Field } from "formik";
import { setAlert } from "../../redux/actions";
import IntlMessages from "../../util/IntlMessages";
import axios from "axios";
import { URL, config } from "../../constants/defaultValues";
import { socket } from "../TopNav";
class AddNewSurveyModal extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      time: this.props.time,
      marks: this.props.marks,
      socket: null,
    };
  }

  componentDidMount() {
    if (!this.state.socket) {
      this.state.socket = socket;
    }
  }
  async handleSubmit(values) {
    const title = values.title;
    const marks = this.state.marks;
    const course = values.course["value"];
    const time = this.state.time;
    const autocheck = values.switch;
    let body = JSON.stringify({ title, course, marks, time, autocheck });
    let res;
    if (this.props.id) {
      res = await axios.post(
        URL + "api/quiz/updatequiz/" + this.props.id,
        body,
        config
      );
    } else {
      res = await axios.post(URL + "api/quiz/", body, config);
    }
    if (res.data) {
      const quiz = res.data._id;
      const user = this.props.user._id;
      const message = `Be prepared a Quiz for ${values.course["label"]} is on the way`;
      body = JSON.stringify({ user, course, quiz, message });
      this.state.socket.emit("new_notification", {
        body: body,
        message: message,
        user: user,
        course: course,
        quiz: quiz,
      });
      this.props.reloadModel();
      this.props.toggleModal();
    } else {
      this.props.setAlert(
        `You cannot upload more than 4 Quiz of ${values.course["label"]}`,
        "danger"
      );
      this.props.toggleModal();
    }
  }
  validate(values) {
    let errors = {};

    if (!values.title) {
      errors.title = "Please enter a title";
    }
    if (!values.course) {
      errors.course = "Please Select a course";
    }
    if (!this.state.time) {
      errors.time = "Please select Quiz time";
    }
    if (!this.state.marks) {
      errors.marks = "Please Enter Total Marks";
    }
    if (this.state.marks < 1) {
      errors.marks = "Marks cannot be null or negative";
    }
    if (this.state.time < 1) {
      errors.time = "Please select appropriate time";
    }
    return errors;
  }

  render() {
    const { modalOpen, toggleModal } = this.props;
    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          <IntlMessages id="survey.add-new-title" />
        </ModalHeader>
        <ModalBody>
          <Formik
            validate={this.validate}
            initialValues={{
              title: this.props.title,
              course: this.props.course,
              marks: this.props.marks ? this.props.marks : 1,
              time: this.props.time ? this.props.time : 1,
              switch: this.props.autocheck,
            }}
            onSubmit={this.handleSubmit}
          >
            {({
              errors,
              touched,
              isValidating,
              setFieldValue,
              setFieldTouched,
              values,
            }) => (
              <Form className="av-tooltip tooltip-label-right">
                <FormGroup className="form-group has-float-label">
                  <Label className="d-block">
                    <IntlMessages id="quiz.name" />
                  </Label>
                  <Field className="form-control" name="title" />
                  {errors.title && touched.title && (
                    <div className="invalid-feedback d-block">
                      {errors.title}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-group has-float-label">
                  <Label className="d-block">
                    <IntlMessages id="form-components.date" />
                  </Label>
                  <FormikReactSelect
                    name="course"
                    id="course"
                    value={values.course}
                    options={
                      this.props.courses &&
                      this.props.courses.map((x, i) => {
                        return { label: x.name, value: x._id, key: i };
                      })
                    }
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                  {errors.course && touched.course ? (
                    <div className="invalid-feedback d-block">
                      {errors.course}
                    </div>
                  ) : null}
                </FormGroup>

                <FormGroup className="form-group has-float-label">
                  <Label className="d-block">
                    <IntlMessages id="quiz.time" />
                  </Label>
                  <Input
                    type="Number"
                    id="time"
                    name="time"
                    value={this.state.time}
                    onChange={(val) => {
                      this.setState({ time: val.target.value });
                    }}
                  />
                  {errors.time && touched.time ? (
                    <div className="invalid-feedback d-block">
                      {errors.time}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label className="d-block">
                    <IntlMessages id="quiz.marks" />
                  </Label>
                  <Input
                    type="Number"
                    id="marks"
                    name="marks"
                    value={this.state.marks}
                    onChange={(val) => {
                      this.setState({ marks: val.target.value });
                    }}
                  />
                  {errors.marks && touched.marks ? (
                    <div className="invalid-feedback d-block">
                      {errors.marks}
                    </div>
                  ) : null}
                </FormGroup>
                <FormGroup className="error-l-100">
                  <Label className="d-block">
                    <IntlMessages id="form-components.switch" />
                  </Label>
                  <FormikSwitch
                    name="switch"
                    className="custom-switch custom-switch-primary"
                    value={values.switch}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                </FormGroup>

                <Button color="primary" type="submit">
                  Submit
                </Button>
                <Button color="secondary" outline onClick={toggleModal}>
                  <IntlMessages id="survey.cancel" />
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = ({ quizList, auth }) => {
  const { user } = auth;
  return {
    quizList,
    user,
  };
};
export default connect(mapStateToProps, { setAlert })(AddNewSurveyModal);
