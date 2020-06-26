import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
} from "reactstrap";
import {
  FormikReactSelect,
  FormikDatePicker,
} from "../../components/FormikFields";
import { Formik, Form, Field } from "formik";
import IntlMessages from "../../util/IntlMessages";
import axios from "axios";
import {
  URL,
  config,
  fileMaxSize,
  fileTypes,
} from "../../constants/defaultValues";
import { socket } from "../TopNav";
import { setAlert } from "../../redux/actions";
import "react-quill/dist/quill.snow.css";

class AddNewSurveyModal extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      title: "",
      course: "",
      file: "",
      category: {},
      duedate: new Date(),
      id: this.props.id,
      upload: false,
    };
  }
  async uploadLecture() {
    const file = new FormData();
    file.append("file", this.state.file);
    file.encoding = "multipart/form-data";
    const configg = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    let res;
    try {
      res = await axios.post(URL + "lecturefiles", file, configg);
      console.log(res.data);
      this.setState({ upload: false, file: res.data[0] });
    } catch (error) {
      console.log(error);
    }
  }
  async handleSubmit(values) {
    this.setState({ upload: true });
    const course = values.course["value"];
    await this.uploadLecture();
    let file = this.state.file;
    console.log(this.state.file);
    const title = values.title;
    const duedate = values.duedate.toISOString();
    let body = JSON.stringify({ file, title, course, duedate });
    let res;
    if (this.props.id) {
      res = await axios.post(
        URL + "api/assignment/edit/" + this.props.id,
        body,
        config
      );
    } else {
      file = this.state.file;
      let body = JSON.stringify({ file, title, course, duedate });
      res = await axios.post(URL + "api/assignment/", body, config);
    }
    if (res.data) {
      const assignment = res.data._id;
      const user = this.props.user._id;
      const message =
        "A new assignment has been added in " + values.course["label"];
      body = JSON.stringify({ user, course, assignment, message });
      this.state.socket.emit("new_notification", {
        body: body,
        message: message,
        user: user,
        course: course,
        assignment: assignment,
      });
      this.props.reloadModel();
      this.props.toggleModal();
    } else {
      this.props.setAlert(
        `You cannot upload more than 4 assignments of ${values.course["label"]}`,
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
    if (!values.duedate) {
      errors.duedate = "Please Select a date";
    }
    if (values.duedate) {
      const now = new Date();
      const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      ).getTime();
      let idate = values.duedate.getTime();
      if (startOfToday - idate > 0) {
        errors.duedate = "Please Select a proper date";
      }
    }
    if (!this.state.file) {
      errors.file = "Please select a file";
    }
    if (this.state.file) {
      const format = this.state.file.name.split(".");
      const match = fileTypes.find((i) => i === format[1]);
      if (!match) {
        errors.file = "Please select a valid file format for assignment";
      } else if (this.state.file.size > fileMaxSize) {
        errors.file = "Scan file cannot exceed 4MB size";
      }
    }
    return errors;
  }

  componentDidMount() {
    if (!this.state.socket) {
      this.state.socket = socket;
    }
  }

  onChangeHandler = (event) => {
    this.setState({ file: event.target.files[0] });
  };

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
          <IntlMessages id="add.assignment" />
        </ModalHeader>
        <ModalBody>
          {this.state.upload ? (
            <div>
              <div className="loading"></div>
              <h2>Please Wait...</h2>
            </div>
          ) : (
            <Formik
              validate={this.validate}
              initialValues={{
                title: this.props.title,
                course: this.props.course,
                duedate: this.props.duedate
                  ? new Date(this.props.duedate)
                  : null,
                file: null,
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
                      <IntlMessages id="assignment.title" />
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
                      <IntlMessages id="duedate.assignment" />
                    </Label>
                    <FormikDatePicker
                      name="duedate"
                      value={values.duedate}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.duedate && touched.duedate ? (
                      <div className="invalid-feedback d-block">
                        {errors.duedate}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    {/* <Label className="d-block">
                    <IntlMessages id="form-components.file" />
                  </Label> */}
                    <CustomInput
                      type="file"
                      id="exampleCustomFileBrowser4"
                      name="file"
                      onChange={this.onChangeHandler}
                    />
                    {errors.file && touched.file ? (
                      <div className="invalid-feedback d-block">
                        {errors.file}
                      </div>
                    ) : null}
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
          )}
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={() => this.addNetItem()}>
            <IntlMessages id="survey.submit" />
          </Button>
        </ModalFooter> */}
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
