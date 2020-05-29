import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label
} from "reactstrap";
import { Formik, Form } from "formik";
import IntlMessages from "../../util/IntlMessages";
import axios from "axios";
import {
  URL,
  config,
  fileMaxSize,
  fileTypes
} from "../../constants/defaultValues";
import { setAlert } from "../../redux/actions";
import { socket } from "../TopNav";
class AddNewSurveyModal extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      file: "",
      id: this.props.id
    };
  }

  componentDidMount() {
    if (!this.state.socket) {
      this.state.socket = socket;
    }
  }
  uploadLecture() {
    const data = new FormData();
    data.append("files", this.state.file);
    axios.post(URL + "lecturefiles", data, {});
  }
  async handleSubmit(values) {
    const file = this.state.file.name;
    let body = JSON.stringify({ file });
    let res = await axios.post(
      URL + "api/assignment/submitassignment/" + this.props.id,
      body,
      config
    );
    this.uploadLecture();

    // const assignment = res.data.teacher;
    // const course = res.data.course;
    // const user = this.props.user._id;
    // const message =
    //   "Students are submitting assignment in " + res.data.course.name;
    // body = JSON.stringify({ user, course, assignment, message });
    // this.state.socket.emit("new_notification", {
    //   body: body,
    //   message: message,
    //   user: user,
    //   course: course,
    //   assignment: assignment
    // });
    this.props.reloadModel();
    this.props.setAlert("Your assignment has been submitted", "success");
    this.props.toggleModal();
  }

  validate(values) {
    let errors = {};
    if (!this.state.file) {
      errors.file = "Please select a file";
    }
    if (this.state.file) {
      const format = this.state.file.name.split(".");
      const match = fileTypes.find(i => i === format[1]);
      if (!match) {
        errors.file = "Please select a valid file format for assignment";
      } else if (this.state.file.size > fileMaxSize) {
        errors.file = "Scan file cannot exceed 4MB size";
      }
    }
    return errors;
  }

  async addNetItem() {}

  onChangeHandler = event => {
    this.setState({ file: event.target.files[0] });
  };
  render() {
    const { modalOpen, toggleModal } = this.props;
    return (
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          <IntlMessages id="survey.add-new-title" />
        </ModalHeader>
        <ModalBody>
          <Formik
            validate={this.validate}
            initialValues={{
              file: null
            }}
            onSubmit={this.handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="av-tooltip tooltip-label-right">
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
    user
  };
};
export default connect(mapStateToProps, { setAlert })(AddNewSurveyModal);
