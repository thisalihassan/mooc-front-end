import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
} from "reactstrap";
import { Formik, Form } from "formik";
import IntlMessages from "../../util/IntlMessages";
import axios from "axios";
import { URL, fileMaxSize, fileTypes } from "../../constants/defaultValues";
import { setAlert } from "../../redux/actions";
class AttachmentModel extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      file: "",
      upload: false,
    };
  }
  reterieveURL = (e) => {
    this.props.reterieveURL(e);
  };

  async uploadLecture() {
    const file = new FormData();
    file.append("file", this.state.file);
    const configg = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const res = await axios.post(URL + "lecturefiles", file, configg);

    this.setState({ upload: false });
    const filename = this.state.file.name;
    const url = res.data[0];
    const body = { filename, url };
    this.reterieveURL(body);
  }
  async handleSubmit(values) {
    this.setState({ upload: true });
    this.uploadLecture();
    this.props.toggleModal();
  }

  validate(values) {
    let errors = {};
    if (!this.state.file) {
      errors.file = "Please select a file";
    }
    if (this.state.file) {
      const format = this.state.file.name.split(".");

      const match = fileTypes.find((i) => i === format[format.length - 1]);
      if (!match) {
        errors.file = "Please select a valid file format for assignment";
      } else if (this.state.file.size > fileMaxSize) {
        errors.file = "Scan file cannot exceed 4MB size";
      }
    }
    return errors;
  }

  async addNetItem() {}

  onChangeHandler = (event) => {
    this.setState({ file: event.target.files[0] });
  };
  render() {
    const { modalOpen, toggleModal } = this.props;
    return (
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          <IntlMessages id="attachment.add" />
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
                file: null,
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
export default connect(mapStateToProps, { setAlert })(AttachmentModel);
