import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import { FormikReactSelect } from "../../components/FormikFields";
import Select from "react-select";
import CustomSelectInput from "../../components/CustomSelectInput";
import IntlMessages from "../../util/IntlMessages";
import { URL, config } from "../../constants/defaultValues";
import axios from "axios";
import { socket } from "../TopNav";
class AddNewTodoModal extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      description: this.props.description,
      socket: null
    };
  }
  componentDidMount() {
    if (!this.state.socket) {
      this.state.socket = socket;
    }
  }
  async handleSubmit(values) {
    const description = this.state.description;
    const course = values.course["value"];
    let body = JSON.stringify({ description, course });
    console.log(this.props.id);
    let res;
    if (this.props.id) {
      res = await axios.post(
        URL + "api/Courses/edit/" + this.props.id,
        body,
        config
      );
    } else {
      res = await axios.post(URL + "api/Courses/addanouncement", body, config);
    }
    const anouncements = res.data._id;
    const user = this.props.user._id;
    const message =
      this.props.user.name +
      " made an anouncement for " +
      values.course["label"];
    body = JSON.stringify({ user, course, anouncements, message });
    this.state.socket.emit("new_notification", {
      body: body,
      message: message,
      user: user,
      course: course,
      anouncements: anouncements
    });
    this.props.reloadModel();
    this.props.toggleModal();
  }

  validate(values) {
    let errors = {};
    if (!this.state.description) {
      errors.description = "Please enter a description";
    }
    if (!values.course) {
      errors.course = "Please Select a course";
    }
    return errors;
  }

  render() {
    const { labels, categories } = this.props.todoApp;
    const { modalOpen, toggleModal } = this.props;
    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          <IntlMessages id="todo.add-new-title" />
        </ModalHeader>
        <ModalBody>
          <Formik
            validate={this.validate}
            initialValues={{
              course: this.props.course,
              description: this.props.description ? this.props.description : "",
              file: null
            }}
            onSubmit={this.handleSubmit}
          >
            {({
              errors,
              touched,
              isValidating,
              setFieldValue,
              setFieldTouched,
              values
            }) => (
              <Form className="av-tooltip tooltip-label-right">
                <FormGroup>
                  <Label className="mt-4">
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
                <FormGroup>
                  <Label className="mt-4">
                    <IntlMessages id="form-components.announce" />
                  </Label>
                  <Input
                    type="textarea"
                    value={this.state.description}
                    onChange={event => {
                      this.setState({ description: event.target.value });
                    }}
                  />{" "}
                  {errors.description && touched.description ? (
                    <div className="invalid-feedback d-block">
                      {errors.description}
                    </div>
                  ) : null}
                </FormGroup>
                <Button color="primary" type="submit">
                  <IntlMessages id="survey.submit" />
                </Button>{" "}
                <Button color="primary" onClick={toggleModal}>
                  <IntlMessages id="survey.cancel" />
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ todoApp, auth }) => {
  const { user } = auth;
  return {
    user,
    todoApp
  };
};
export default connect(mapStateToProps, {})(AddNewTodoModal);
