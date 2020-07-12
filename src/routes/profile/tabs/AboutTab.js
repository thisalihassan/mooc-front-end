import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  Table,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import { FormikDatePicker } from "../../../components/FormikFields";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { quillFormats, quillModules } from "../../../components/editors";
import {
  getCurrentProfile,
  addEducation,
  createProfile,
  deleteEducation,
  UpdateEducation,
  addWork,
  deleteWork,
  UpdateWork,
} from "../../../redux/actions";
import "./aboutMe.css";
import queryString from "query-string";
import axios from "axios";
import { URL, config } from "../../../constants/defaultValues";
class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      education: true,
      information: true,
      email: "",
      Name: "",
      infoUpdate: true,
      username: "",
      major: "",
      fieldofstudy: "",
      current: "",
      from: "",
      to: "",
      wfrom: "",
      wto: "",
      skills: "",
      description: "",
      location: "",
      work: true,
      company: "",
      position: "",
      eduId: "",
      wid: "",
      loading: true,
    };
    this.validate = this.validate.bind(this);
    this.validateWork = this.validateWork.bind(this);
    this.submitEducation = this.submitEducation.bind(this);
    this.informationSection = this.informationSection.bind(this);
    this.workSection = this.workSection.bind(this);
    this.submitWork = this.submitWork.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleDate = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  educationSection() {
    this.setState((prevState) => ({
      education: !prevState.education,
      fieldofstudy: "",
      from: "",
      to: "",
      current: "",
      eduId: "",
    }));
  }

  informationSection() {
    this.setState((prevState) => ({ information: !prevState.information }));
  }

  workSection() {
    this.setState((prevState) => ({
      work: !prevState.work,
      company: "",
      wfrom: "",
      wto: "",
      position: "",
      wid: "",
    }));
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentDidUpdate() {
    const values = queryString.parse(this.props.location.search);
    if (values.d) {
      axios
        .post(URL + "api/profile/geteducation/" + values.d, {}, config)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          this.setState({
            fieldofstudy: data.education[0].fieldofstudy,
            from: data.education[0].from,
            to: data.education[0].to,
            current: data.education[0].current,
            eduId: data.education[0]._id,
            education: false,
          });
          this.props.history.push("/app/profile/profile/");
        });
    } else if (values.w) {
      axios
        .post(URL + "api/profile/getwork/" + values.w, {}, config)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          console.log(data);
          this.setState({
            company: data.work[0].company,
            wfrom: data.work[0].from,
            wto: data.work[0].to,
            position: data.work[0].position,
            wid: data.work[0]._id,
            work: false,
          });
          this.props.history.push("/app/profile/profile/");
        });
    }
  }
  async submitInformation(e) {
    e.preventDefault();
    const major = this.state.major;
    const body = { major };
    this.props.createProfile(body, true);
    this.state.infoUpdate = true;
    this.informationSection();
  }
  handleDescription = (description) => {
    this.setState({ description });
  };
  async submitEducation(e) {
    const fieldofstudy = this.state.fieldofstudy;
    const current = this.state.current;
    const from = this.state.from;
    const to = this.state.to;

    if (this.state.eduId) {
      const id = this.state.eduId;
      const body = { fieldofstudy, from, current, to, id };
      await this.props.UpdateEducation(id, body);
    } else {
      const body = { fieldofstudy, from, current, to };
      await this.props.addEducation(body);
    }

    this.setState({ fieldofstudy: "", current: "", from: "", to: "" });
    this.props.getCurrentProfile();
  }
  async submitWork(e) {
    const company = this.state.company;
    const position = this.state.position;
    const from = this.state.wfrom;
    const to = this.state.wto;

    if (this.state.wid) {
      const id = this.state.wid;
      const body = { company, from, position, to, id };
      await this.props.UpdateWork(id, body);
    } else {
      const body = { company, from, position, to };
      await this.props.addWork(body);
    }
    this.setState({ company: "", position: "", wfrom: "", wto: "" });
    this.props.getCurrentProfile();
  }
  handleTagChange = (skills) => {
    this.setState({ skills });
  };
  async submitSkills(e) {
    e.preventDefault();
    const skills = this.state.skills;
    const body = { skills };
    await this.props.createProfile(body, true);
    this.setState({ infoUpdate: true });
    this.props.getCurrentProfile();
  }
  deleteEducation(e, id) {
    e.preventDefault();
    this.props.deleteEducation(id);
  }
  deleteWork(e, id) {
    e.preventDefault();
    this.props.deleteWork(id);
  }
  updateEducation(e, id) {
    e.preventDefault();
    this.props.history.push("/app/profile/profile/?d=" + id);
  }
  updateWork(e, id) {
    e.preventDefault();
    this.props.history.push("/app/profile/profile/?w=" + id);
  }
  validate(values) {
    let errors = {};

    if (!this.state.fieldofstudy) {
      errors.fieldofstudy = "Please enter a Field of study";
    }
    if (!this.state.current) {
      errors.current = "Please enter your current education";
    }
    // if (!this.state.company) {
    //   errors.company = "Please enter where you worked";
    // }
    // if (!this.state.position) {
    //   errors.position = "Please fill position";
    // }
    if (!this.state.from) {
      errors.from = "Please Select a date";
    }
    if (this.state.from) {
      let today = new Date().getTime();
      let idate = new Date(this.state.from).getTime();
      if (idate - today >= 0) {
        errors.from = "Please Select a from date";
      }
    }
    if (this.state.to) {
      let today = new Date().getTime();
      let idate = new Date(this.state.to).getTime();
      if (today - idate >= 0) {
        errors.to = "Please Select a proper date";
      }
    }
    // if (!this.state.wfrom) {
    //   errors.wfrom = "Please Select a date";
    // }
    // if (this.state.wfrom) {
    //   let today = new Date().getTime();
    //   let idate = new Date(this.state.wfrom).getTime();
    //   if (idate - today >= 0) {
    //     errors.wfrom = "Please Select a from date";
    //   }
    // }
    // if (this.state.wto) {
    //   let today = new Date().getTime();
    //   let idate = new Date(this.state.wto).getTime();
    //   if (today - idate >= 0) {
    //     errors.wto = "Please Select a proper date";
    //   }
    // }

    return errors;
  }

  validateWork(values) {
    let errors = {};
    if (!this.state.company) {
      errors.company = "Please enter where you worked";
    }
    if (!this.state.position) {
      errors.position = "Please fill position";
    }

    if (!this.state.wfrom) {
      errors.wfrom = "Please Select a date";
    }
    if (this.state.wfrom) {
      let today = new Date().getTime();
      let idate = new Date(this.state.wfrom).getTime();
      if (idate - today >= 0) {
        errors.wfrom = "Please Select a from date";
      }
    }
    if (this.state.wto) {
      let today = new Date().getTime();
      let idate = new Date(this.state.wto).getTime();
      if (today - idate >= 0) {
        errors.wto = "Please Select a proper date";
      }
    }

    return errors;
  }

  async submitDescription(e) {
    e.preventDefault();
    const description = this.state.description;
    const body = { description };
    await this.props.createProfile(body, true);
    this.setState({ infoUpdate: true });
    this.props.getCurrentProfile();
  }
  educationForm() {
    return (
      <div>
        <Formik
          validate={this.validate}
          initialValues={{
            fieldofstudy: this.state.fieldofstudy,
            current: this.state.current,
            from: null,
            to: null,
          }}
          onSubmit={this.submitEducation}
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
              <Row>
                <Col md="12">
                  <FormGroup className="form-group">
                    <label
                      className="form-control-label"
                      htmlFor="fieldofstudy"
                    >
                      Field of Study
                    </label>
                    <Field
                      className="form-control"
                      value={this.state.fieldofstudy}
                      onChange={this.handleChange}
                      name="fieldofstudy"
                    />
                    {errors.fieldofstudy && touched.fieldofstudy && (
                      <div className="invalid-feedback d-block">
                        {errors.fieldofstudy}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="4">
                  <FormGroup className="form-group">
                    <label className="form-control-label" htmlFor="current">
                      Current Education
                    </label>
                    <Field
                      onChange={this.handleChange}
                      className="form-control"
                      value={this.state.current}
                      name="current"
                    />
                    {errors.current && touched.current && (
                      <div className="invalid-feedback d-block">
                        {errors.current}
                      </div>
                    )}
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup className="form-group">
                    <label className="form-control-label" htmlFor="from">
                      From
                    </label>
                    <FormikDatePicker
                      className="form-control"
                      name="from"
                      value={this.state.from ? new Date(this.state.from) : null}
                      onChange={this.handleDate}
                      onBlur={setFieldTouched}
                    />
                    {errors.from && touched.from ? (
                      <div className="invalid-feedback d-block">
                        {errors.from}
                      </div>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup className="form-group">
                    <label className="form-control-label" htmlFor="to">
                      To
                    </label>
                    <FormikDatePicker
                      className="form-control"
                      name="to"
                      value={this.state.to ? new Date(this.state.to) : null}
                      onChange={this.handleDate}
                      onBlur={setFieldTouched}
                    />
                    {errors.to && touched.to ? (
                      <div className="invalid-feedback d-block">
                        {errors.to}
                      </div>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>{" "}
              {this.state.education ? (
                <Button type="submit">Submit</Button>
              ) : (
                <div>
                  <Button type="submit">Edit</Button>
                  <Button
                    className="float-right icon-button icon simple-icon-close"
                    color="white"
                    onClick={(e) => this.educationSection(e)}
                  >
                    {/* <i className="simple-icon-close"></i> */}
                  </Button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    );
  }

  workForm() {
    return (
      <div>
        <Formik
          validate={this.validateWork}
          initialValues={{
            company: this.state.company,
            position: this.state.position,
            wfrom: null,
            wto: null,
          }}
          onSubmit={this.submitWork}
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
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="company">
                      Company Name
                    </label>
                    <Field
                      onChange={this.handleChange}
                      className="form-control"
                      value={this.state.company}
                      name="company"
                    />
                    {errors.company && touched.company && (
                      <div className="invalid-feedback d-block">
                        {errors.company}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="4">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="position">
                      Job Position
                    </label>
                    <Field
                      onChange={this.handleChange}
                      className="form-control"
                      value={this.state.position}
                      name="position"
                    />
                    {errors.position && touched.position && (
                      <div className="invalid-feedback d-block">
                        {errors.position}
                      </div>
                    )}
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="from">
                      From
                    </label>
                    <FormikDatePicker
                      className="form-control"
                      name="wfrom"
                      value={
                        this.state.wfrom ? new Date(this.state.wfrom) : null
                      }
                      onChange={this.handleDate}
                      onBlur={setFieldTouched}
                    />
                    {errors.wfrom && touched.wfrom ? (
                      <div className="invalid-feedback d-block">
                        {errors.wfrom}
                      </div>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="to">
                      To
                    </label>
                    <FormikDatePicker
                      className="form-control"
                      name="wto"
                      value={this.state.wto ? new Date(this.state.wto) : null}
                      onChange={this.handleDate}
                      onBlur={setFieldTouched}
                    />
                    {errors.wto && touched.wto ? (
                      <div className="invalid-feedback d-block">
                        {errors.wto}
                      </div>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
              {this.state.work ? (
                <Button type="submit">Submit</Button>
              ) : (
                <div>
                  <Button type="submit">Edit</Button>
                  <Button
                    className="float-right icon-button icon simple-icon-close"
                    color="white"
                    onClick={(e) => this.workSection(e)}
                  >
                    {/* <i className="simple-icon-close"></i> */}
                  </Button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    );
  }
  render() {
    const { profile } = this.props.profile;
    const { user } = this.props.authUser;
    if (user) {
      this.State = { Name: user.name };
    }
    if (profile && this.state.infoUpdate) {
      this.setState({
        major: profile.major,
        skills: profile.skills,
        description: profile.description,
        infoUpdate: false,
        loading: false,
      });
    }
    return (
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="1"></Col>
          <Col className="order-xl-2" xl="10">
            <Card className="shadow" id="rest">
              <CardHeader className="border-10">
                <Row className="align-items-center"></Row>
              </CardHeader>
              <CardBody>
                {profile && !this.state.loading && user ? (
                  <Form>
                    <div className="pl-lg-4">
                      <h3>User Information</h3>

                      <Row>
                        <Col lg="4">
                          <br></br>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="email"
                              placeholder="your@example.com"
                              value={user.email}
                              readOnly={true}
                              type="email"
                            />
                          </FormGroup>
                        </Col>

                        <Col lg="4">
                          <br></br>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="Name"
                            >
                              Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="Name"
                              placeholder="Name"
                              value={user.name}
                              onChange={this.handleChange}
                              type="text"
                              readOnly={true}
                            />
                          </FormGroup>
                        </Col>

                        <Col lg="4">
                          <br></br>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="major"
                            >
                              Major
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="major"
                              placeholder="major"
                              value={this.state.major}
                              onChange={this.handleChange}
                              type="text"
                              readOnly={this.state.information}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Button onClick={this.informationSection} id="ms">
                          Edit Information
                        </Button>
                        <span />
                        {!this.state.information && (
                          <Button
                            id="mr"
                            className="float-right"
                            onClick={(e) => this.submitInformation(e)}
                          >
                            Submit
                          </Button>
                        )}
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <div className="pl-lg-4">
                      <h3>Education Information</h3>
                      <Row>
                        <Col md="12">
                          <Table>
                            <thead>
                              <tr>
                                <th>Field of Study</th>
                                <th>Current Education</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Action</th>
                              </tr>
                            </thead>{" "}
                            <tbody>
                              {profile.education ? (
                                profile.education.map((edu) => (
                                  <tr key={edu._id}>
                                    <td>{edu.fieldofstudy}</td>
                                    <td>{edu.current}</td>
                                    <td>
                                      {moment(edu.from).format("YYYY-MM-DD")}
                                    </td>
                                    <td>
                                      {edu.to
                                        ? moment(edu.to).format("YYYY-MM-DD")
                                        : "N/A"}
                                    </td>{" "}
                                    <td>
                                      <Link
                                        to="#"
                                        onClick={(e) =>
                                          this.deleteEducation(e, edu._id)
                                        }
                                      >
                                        Delete
                                      </Link>{" "}
                                      {"    |    "}{" "}
                                      <Link
                                        to={
                                          "/app/profile/profile/?e=" + edu._id
                                        }
                                        onClick={(e) =>
                                          this.updateEducation(e, edu._id)
                                        }
                                      >
                                        Edit
                                      </Link>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <h2></h2>
                              )}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>

                      {this.educationForm()}
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <div className="pl-lg-4">
                      <h3>Work Experience</h3>
                      <Row>
                        <Col md="12">
                          <br></br>
                          <Table>
                            <thead>
                              <tr>
                                <th>Company Name</th>
                                <th>Job Position</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Action</th>
                              </tr>
                            </thead>{" "}
                            <tbody>
                              {profile.work ? (
                                profile.work.map((work) => (
                                  <tr key={work._id}>
                                    <td>{work.company}</td>
                                    <td>{work.position}</td>
                                    <td>
                                      {moment(work.from).format("YYYY-MM-DD")}
                                    </td>
                                    <td>
                                      {work.to
                                        ? moment(work.to).format("YYYY-MM-DD")
                                        : "N/A"}
                                    </td>{" "}
                                    <td>
                                      <Link
                                        to="#"
                                        onClick={(e) =>
                                          this.deleteWork(e, work._id)
                                        }
                                      >
                                        Delete
                                      </Link>{" "}
                                      {" | "}{" "}
                                      <Link
                                        to={
                                          "/app/profile/profile/?w=" + work._id
                                        }
                                        onClick={(e) =>
                                          this.updateWork(e, work._id)
                                        }
                                      >
                                        Edit
                                      </Link>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <h2></h2>
                              )}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>

                      {this.workForm()}
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <div className="pl-lg-4">
                      <h3>My Skills</h3>
                      <Row>
                        <Col lg="12">
                          <br></br>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="skills"
                            ></label>
                            <TagsInput
                              id="TagsInput"
                              value={this.state.skills}
                              onChange={this.handleTagChange}
                            />
                            {/* <Input
                            className="form-control-alternative"
                            name="skills"
                            placeholder="All skills"
                            type="text"
                            value={this.state.skills}
                            onChange={this.handleChange}
                            readOnly={this.state.myskills}
                          /> */}
                          </FormGroup>
                        </Col>
                      </Row>{" "}
                      <Button onClick={(e) => this.submitSkills(e)}>
                        Submit
                      </Button>
                    </div>
                    <hr className="my-4" />
                    <div className="pl-lg-4">
                      <h3>About me</h3>

                      <FormGroup>
                        <br></br>
                        <label>About Me</label>
                        <ReactQuill
                          theme="snow"
                          value={
                            this.state.description ? this.state.description : ""
                          }
                          onChange={this.handleDescription}
                          modules={quillModules}
                          formats={quillFormats}
                        />
                        {/* <Input
                          className="form-control-alternative"
                          placeholder="A few words about you ..."
                          rows="4"
                          type="textarea"
                          name="description"
                          value={this.state.description}
                          onChange={this.handleChange}
                          readOnly={this.state.mydescription}
                        /> */}
                      </FormGroup>
                      <Button onClick={(e) => this.submitDescription(e)}>
                        Submit
                      </Button>
                    </div>
                  </Form>
                ) : (
                  <div className="loading"></div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const authUser = state.auth;
  const profile = state.profile;
  return { authUser, profile };
};

export default injectIntl(
  connect(mapStateToProps, {
    getCurrentProfile,
    addEducation,
    createProfile,
    deleteEducation,
    UpdateEducation,
    addWork,
    deleteWork,
    UpdateWork,
  })(Profile)
);
