import Holder from "react-holder";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./nav.css";
import {
  Row,
  Card,
  CardTitle,
  CardBody,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Badge,
  CardHeader,
  Table,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Collapse,
  CustomInput,
  FormGroup,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { Separator, Colxx } from "../../components/CustomBootstrap";
import IntlMessages from "../../util/IntlMessages";
import { injectIntl } from "react-intl";
import Reviews from "../../components/pages/Review";
import { CardImg } from "react-bootstrap";
import queryString from "query-string";
import axios from "axios";
import VideoPlayer from "../../components/VideoPlayer";
import "video.js/dist/video-js.css";
import UserCardBasic from "../../components/cards/UserCardBasic";
import ProfileCard from "../../components/Profile/ProfileCard";
import RelatedCourse from "../../components/CourseVertical";
import ReactGA from "react-ga";
import uuid from "uuid";
import {
  URL,
  config,
  VidFile,
  LectureFiles,
  LectureMaxSize,
} from "../../constants/defaultValues";
import {
  getProfileById,
  GetSubscription,
  createRoom,
  getRooms,
} from "../../redux/actions";
import Rating from "../../components/Rating";
export class DetailsPages extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.validate = this.validate.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.state = {
      activeFirstTab: "1",
      modalOpen: false,
      VideoOpen: false,
      EditOpen: false,
      collapse: false,
      accordion: [],
      course: "",
      subscribed: null,
      runTime: "true",
      subscriberUsers: [],
      files: "",
      theCourses: 0,
      follower: "",
      lectureFiles: null,
      reviews: [],
      isReviewed: false,
      checkReview: true,
      firstTime: true,
      video: "",
      vidType: "",
      loadinLec: true,
      lecture: "",
    };
  }
  toggleAccordion = (tab) => {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      accordion: state,
    });
  };
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };

  EditModal = () => {
    this.setState({
      EditOpen: !this.state.EditOpen,
    });
  };

  VideoModal = () => {
    this.setState({
      VideoOpen: !this.state.VideoOpen,
    });
  };

  async subscribeCourse(e) {
    e.preventDefault();
    document.getElementById("subscribecourse").disabled = true;
    const id = this.state.course._id;
    const body = JSON.stringify({ id });
    await axios.post(URL + "api/subscribe/", body, config);
    window.location.reload();
  }

  async unsubscribeCourse(e) {
    e.preventDefault();
    document.getElementById("unsubscribecourse").disabled = true;
    const id = this.state.course._id;
    const body = JSON.stringify({ id });
    await axios.post(URL + "api/subscribe/unsubscribecourse", body, config);
    window.location.reload();
  }

  async createRoom(e) {
    e.preventDefault();
    const id = this.state.course._id;
    const guidelines = this.state.guidelines;
    const body = JSON.stringify({ id, guidelines });
    await this.props.createRoom(body);
    window.location.reload();
  }
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab,
      });
    }
  }
  async componentDidMount() {
    let id;
    this.props.GetSubscription();
    const values = queryString.parse(this.props.location.search);
    if (values.id) {
      id = values.id;
      if (localStorage.userid) {
        const trackingId = "UA-168654871-1";
        ReactGA.initialize(trackingId);
        ReactGA.set({
          userId: localStorage.userid,
        });
      }
      if (!localStorage.userid) {
        localStorage.setItem("userid", uuid.v4());
      }
      this.props.history.listen((location) => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
      });
      let body = JSON.stringify({ id });
      await axios
        .post(URL + "api/recomendation/likecourses", body, config)
        .then((res) => {
          this.setState({ relatedcourses: res.data.courses });
        });
      await axios
        .post(URL + "api/Courses/mycourse", body, config)
        .then((res) => {
          this.props.getProfileById(res.data.user);
          return res.data;
        })
        .then((data) => {
          this.setState({ course: data });
        });
      await axios
        .post(URL + "api/Courses/getFiles", body, config)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          let accordionData = [];
          if (data) {
            data.forEach(() => {
              accordionData.push(false);
            });
          }
          this.setState({
            lectureFiles: data,
            accordion: accordionData,
            loadinLec: false,
          });
        });
      await axios
        .post(URL + "api/subscribe/getrate", body, config)
        .then((res) => {
          this.setState({ reviews: res.data });
        });
    }
  }
  async find_if_user_subscribed() {
    const values = queryString.parse(this.props.location.search);
    let id = values.id;
    if (this.props.user)
      if (this.state.runTime && this.props.subscribed.courses) {
        const log = this.props.subscribed.courses.find((x) => x._id === id);
        this.setState({ subscribed: log });
        this.setState({ runTime: false });
        let roll = this.props.user.roll;
        const body = JSON.stringify({ id, roll });

        await axios
          .post(URL + "api/subscribe/getCoursefollowers", body, config)
          .then((res) => {
            this.setState({ subscriberUsers: res.data });
          });
        this.props.getRooms(body);
      }
  }
  async componentDidUpdate(prevState, prevProps) {
    this.find_if_user_subscribed();
    if (
      this.props.user &&
      this.state.checkReview &&
      this.state.reviews &&
      this.state.reviews.CourseRate
    ) {
      let match = this.state.reviews.CourseRate.find(
        (x) => x.student._id === this.props.user._id
      );

      this.setState({ isReviewed: match, checkReview: false });
    }

    if (
      this.state.firstTime &&
      this.props.userProfile &&
      this.props.userProfile.user
    ) {
      const id = this.props.userProfile.user;
      const body = JSON.stringify({ id });
      const res = await axios.post(
        URL + "api/Courses/getcourses",
        body,
        config
      );
      const res2 = await axios.post(
        URL + "api/subscribe/getfollowers",
        body,
        config
      );
      this.setState({
        theCourses: res.data.length,
        follower: res2.data,
        firstTime: false,
      });
    }
  }
  onChangeHandler = (event) => {
    this.setState({ files: event.target.files });
  };

  validate(values) {
    let errors = {};
    if (!this.state.files) {
      errors.file = "Please select a file";
    }
    if (this.state.files) {
      const format = [];
      for (let i = 0; i < this.state.files.length; i++) {
        format.push(this.state.files[i].name.split(".")[1]);
      }
      let size = 0;
      for (let i = 0; i < this.state.files.length; i++) {
        size += this.state.files[i].size;
      }
      const match = LectureFiles.find(
        (i) => i === format.find((x) => x.toLowerCase() === i)
      );
      if (!match) {
        errors.file = "Please select a valid file format for assignment";
      } else if (size > LectureMaxSize) {
        errors.file = "Selected files must be less than 200mb";
      }
    }
    return errors;
  }

  async uploadFiles(values) {
    this.setState({ loadinLec: true });
    let files = new FormData();
    let files2 = [];
    for (const key of Object.keys(this.state.files)) {
      files.append("file", this.state.files[key]);
      files2[key] = this.state.files[key].name;
    }
    const configg = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const res = await axios.post(URL + "lecturefiles", files, configg);
    const fileNames = files2;
    files = res.data;
    const id = this.state.course._id;
    const lecture = values.lecture;
    const body = { files, fileNames, id, lecture };

    await axios.post(URL + "api/Courses/uploadFiles", body, config);

    await axios
      .post(URL + "api/Courses/getFiles", body, config)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        let accordionData = [];
        if (data) {
          data.forEach(() => {
            accordionData.push(false);
          });
        }

        this.setState({
          lectureFiles: data,
          accordion: accordionData,
          loadinLec: false,
        });
      });
  }
  getTotalRating() {
    if (this.state.reviews && this.state.reviews.CourseRate) {
      let sum = 0;
      const placeHolder = this.state.reviews.TeacherRate;
      const length = this.state.reviews.TeacherRate.length;
      for (let i = 0; i < length; i++) {
        let temp = placeHolder[i].rating;
        sum = sum + temp;
      }
      return sum / length;
    }
  }
  getCourseRating() {
    if (this.state.reviews && this.state.reviews.CourseRate) {
      let sum = 0;
      const placeHolder = this.state.reviews.CourseRate;
      const length = this.state.reviews.CourseRate.length;
      for (let i = 0; i < length; i++) {
        let temp = placeHolder[i].rating;
        sum = sum + temp;
      }
      return sum / length;
    }
  }
  async DeleteFile(e, item, id) {
    const body = JSON.stringify({ item, id });
    await axios.post(URL + "api/Courses/EditFiles", body, config);
    window.location.reload();
  }

  async EditLecture(e, lecture, id) {
    this.setState({ id: id, lecture: lecture });
    this.EditModal();
  }

  async EditDoneLecture(e) {
    const id = this.state.id;
    const lecture = this.state.lecture;
    const body = JSON.stringify({ id, lecture });
    await axios.post(URL + "api/Courses/editLecture", body, config);
    window.location.reload();
  }
  async watchVideo(e, item) {
    const type = item.split(".")[1];
    const ext = type[type.length - 1].toLowerCase();
    if (ext === "mp4") {
      this.setState({
        video: item,
        vidType: "video/mp4",
      });
    } else {
      this.setState({
        video: item,
        vidType: "video/ogg",
      });
    }
    this.VideoModal();
  }
  render() {
    const { messages } = this.props.intl;
    let courseimg;
    if (this.state.course) {
      courseimg = this.state.course.pic;
    }
    let RoomId = null;
    if (this.props.rooms.length > 0) {
      RoomId = this.props.rooms.find(
        (x) => x.course._id === this.state.course._id
      );
    }

    return (
      <Fragment>
        {this.props.user && this.state.course && this.props.userProfile ? (
          <Row>
            <Modal
              isOpen={this.state.EditOpen}
              toggle={this.EditModal}
              backdrop="static"
            >
              <ModalHeader toggle={this.EditModal}>
                <IntlMessages id="edit.lecture" />
              </ModalHeader>
              <ModalBody>
                <Label>Lecture Description</Label>
                <Input
                  type="text"
                  name="lecture"
                  onChange={(e) => {
                    this.setState({ lecture: e.target.value });
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  className="button-outline"
                  onClick={(e) => this.EditDoneLecture(e)}
                >
                  Accept
                </Button>{" "}
                <Button
                  color="secondary"
                  className="button-outline"
                  onClick={this.toggleModal}
                >
                  Reject
                </Button>
              </ModalFooter>
            </Modal>
            <Modal
              isOpen={this.state.modalOpen}
              toggle={this.toggleModal}
              backdrop="static"
            >
              <ModalHeader toggle={this.toggleModal}>
                <IntlMessages id="room.guidelines" />
              </ModalHeader>
              <ModalBody>
                <Label>Room GuideLines</Label>
                <Input
                  type="text"
                  name="guidelines"
                  onChange={(e) => {
                    this.setState({ guidelines: e.target.value });
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  className="button-outline"
                  onClick={(e) => this.createRoom(e)}
                >
                  Accept
                </Button>{" "}
                <Button
                  color="secondary"
                  className="button-outline"
                  onClick={this.toggleModal}
                >
                  Reject
                </Button>
              </ModalFooter>
            </Modal>
            <Modal
              isOpen={this.state.VideoOpen}
              toggle={this.VideoModal}
              backdrop="static"
            >
              <ModalHeader toggle={this.VideoModal}>
                <IntlMessages id="survey.add-new-title" />
              </ModalHeader>
              <ModalBody>
                <VideoPlayer
                  autoplay={false}
                  controls={true}
                  controlBar={{
                    pictureInPictureToggle: true,
                  }}
                  className="video-js side-bar-video"
                  sources={[
                    {
                      src: this.state.video,
                      type: this.state.vidType,
                    },
                  ]}
                />
              </ModalBody>
            </Modal>
            <Colxx xxs="12">
              <h1>{this.state.course.name}</h1>

              <Separator className="mb-8" />
              <br></br>
              <br></br>
              <Row>
                <Colxx xxs="12" xl="8" className="col-left">
                  <Card className="mb-4" id="rest">
                    <CardImg
                      id="courseDetails"
                      src={courseimg}
                      data-src="holder.js/793x500"
                      fluid
                      className="img-thumbnail"
                    ></CardImg>
                  </Card>
                  <Card className="mb-4" id="rest">
                    <CardHeader>
                      <Nav tabs className="card-header-tabs " id="nav">
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.activeFirstTab === "1",
                              "nav-link": true,
                            })}
                            onClick={() => {
                              this.toggleTab("1");
                            }}
                            to={
                              "/app/mycourses/courseView/?id=" +
                              this.state.course._id
                            }
                          >
                            <IntlMessages id="pages.outcome" />
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.activeFirstTab === "2",
                              "nav-link": true,
                            })}
                            onClick={() => {
                              this.toggleTab("2");
                            }}
                            to={
                              "/app/mycourses/courseView/?id=" +
                              this.state.course._id
                            }
                          >
                            <IntlMessages id="pages.prereq" />
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.activeFirstTab === "3",
                              "nav-link": true,
                            })}
                            onClick={() => {
                              this.toggleTab("3");
                            }}
                            to={
                              "/app/mycourses/courseView/?id=" +
                              this.state.course._id
                            }
                          >
                            <IntlMessages id="pages.content" />
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.activeFirstTab === "4",
                              "nav-link": true,
                            })}
                            onClick={() => {
                              this.toggleTab("4");
                            }}
                            to={
                              "/app/mycourses/courseView/?id=" +
                              this.state.course._id
                            }
                          >
                            <IntlMessages id="pages.intructor" />
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.activeFirstTab === "5",
                              "nav-link": true,
                            })}
                            onClick={() => {
                              this.toggleTab("5");
                            }}
                            to={
                              "/app/mycourses/courseView/?id=" +
                              this.state.course._id
                            }
                          >
                            <IntlMessages id="pages.reviews" />
                          </NavLink>
                        </NavItem>
                        {this.props.user._id === this.state.course.user && (
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: this.state.activeFirstTab === "6",
                                "nav-link": true,
                              })}
                              onClick={() => {
                                this.toggleTab("6");
                              }}
                              to={
                                "/app/mycourses/courseView/?id=" +
                                this.state.course._id
                              }
                            >
                              <IntlMessages id="pages.followers" />
                            </NavLink>
                          </NavItem>
                        )}
                      </Nav>
                    </CardHeader>

                    <TabContent activeTab={this.state.activeFirstTab}>
                      <TabPane tabId="1">
                        <Row>
                          <Colxx sm="12">
                            <CardBody>
                              <br />
                              <p className="font-weight-bold">OUTCOMES</p>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: this.state.course.outcome,
                                }}
                              ></div>
                            </CardBody>
                          </Colxx>
                        </Row>
                      </TabPane>
                      <TabPane tabId="2">
                        <Row>
                          <Colxx sm="12">
                            <CardBody>
                              <br />
                              <p className="font-weight-bold">PREREQUISITES</p>

                              <div
                                dangerouslySetInnerHTML={{
                                  __html: this.state.course.preReq,
                                }}
                              ></div>
                            </CardBody>
                          </Colxx>
                        </Row>
                      </TabPane>
                      <TabPane tabId="3">
                        <Row>
                          <Colxx sm="12">
                            <CardBody>
                              {!this.state.loadinLec ? (
                                this.state.lectureFiles &&
                                this.state.lectureFiles.map(
                                  (lecture, index) => {
                                    return (
                                      <div className="border" key={index}>
                                        <Button
                                          color="link"
                                          onClick={() =>
                                            this.toggleAccordion(index)
                                          }
                                          aria-expanded={
                                            this.state.accordion[index]
                                          }
                                        >
                                          Lecture {index + 1}
                                        </Button>
                                        <Collapse
                                          isOpen={this.state.accordion[index]}
                                        >
                                          <div className="p-4">
                                            <Link
                                              to={
                                                "/app/mycourses/courseView/?id=" +
                                                this.state.course._id
                                              }
                                              onClick={(e) =>
                                                this.EditLecture(
                                                  e,
                                                  lecture.lecture,
                                                  lecture._id
                                                )
                                              }
                                            >
                                              Edit
                                            </Link>
                                            <br></br>
                                            <br></br>
                                            {lecture.lecture}
                                            <Table borderless>
                                              <thead>
                                                <tr>
                                                  <th scope="col">#</th>
                                                  <th scope="col">
                                                    Lecture Content
                                                  </th>
                                                  {this.props.user._id ===
                                                    this.state.course.user && (
                                                    <th scope="col">Action</th>
                                                  )}
                                                </tr>
                                              </thead>
                                              {lecture.files.map(
                                                (item, index) => {
                                                  const getExt = lecture.fileNames[
                                                    index
                                                  ].split(".");
                                                  const type = getExt[
                                                    getExt.length - 1
                                                  ].toLowerCase();
                                                  const name = VidFile.find(
                                                    (x) => x === type
                                                  );
                                                  return (
                                                    <tbody key={index}>
                                                      <tr>
                                                        <th scope="row">1</th>
                                                        <td>
                                                          {this.props.user
                                                            ._id ===
                                                            this.state.course
                                                              .user && (
                                                            <a
                                                              href={item}
                                                              target="_blank"
                                                              download
                                                              rel="noopener noreferrer"
                                                            >
                                                              {
                                                                lecture
                                                                  .fileNames[
                                                                  index
                                                                ]
                                                              }
                                                            </a>
                                                          )}
                                                          {!name &&
                                                            this.props.user
                                                              ._id !==
                                                              this.state.course
                                                                .user && (
                                                              <a
                                                                href={item}
                                                                target="_blank"
                                                                download
                                                                rel="noopener noreferrer"
                                                              >
                                                                {
                                                                  lecture
                                                                    .fileNames[
                                                                    index
                                                                  ]
                                                                }
                                                              </a>
                                                            )}
                                                          {name &&
                                                            this.props.user
                                                              ._id !==
                                                              this.state.course
                                                                .user &&
                                                            lecture.fileNames[
                                                              index
                                                            ]}
                                                        </td>

                                                        {this.props.user._id ===
                                                          this.state.course
                                                            .user && (
                                                          <td>
                                                            <Link
                                                              to={
                                                                "/app/mycourses/courseView/?id=" +
                                                                this.state
                                                                  .course._id
                                                              }
                                                              onClick={(e) =>
                                                                this.DeleteFile(
                                                                  e,
                                                                  item,
                                                                  lecture._id
                                                                )
                                                              }
                                                            >
                                                              Delete
                                                            </Link>{" "}
                                                          </td>
                                                        )}

                                                        <td>
                                                          {name && (
                                                            <Link
                                                              to={
                                                                "/app/mycourses/courseView/?id=" +
                                                                this.state
                                                                  .course._id
                                                              }
                                                              onClick={(e) =>
                                                                this.watchVideo(
                                                                  e,
                                                                  item
                                                                )
                                                              }
                                                            >
                                                              Watch
                                                            </Link>
                                                          )}
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  );
                                                }
                                              )}
                                            </Table>
                                          </div>
                                        </Collapse>
                                      </div>
                                    );
                                  }
                                )
                              ) : (
                                <div className="loading"></div>
                              )}
                              {this.props.user._id ===
                                this.state.course.user && (
                                <Formik
                                  validate={this.validate}
                                  initialValues={{
                                    file: null,
                                    lecture: "",
                                  }}
                                  onSubmit={this.uploadFiles}
                                >
                                  {({ errors, touched }) => (
                                    <Form className="av-tooltip tooltip-label-right">
                                      <FormGroup className="form-group">
                                        <Label className="d-block">
                                          <IntlMessages id="course.lecture" />
                                        </Label>
                                        <Field
                                          className="form-control"
                                          name="lecture"
                                        />
                                        {errors.lecture && touched.lecture && (
                                          <div className="invalid-feedback d-block">
                                            {errors.lecture}
                                          </div>
                                        )}
                                      </FormGroup>
                                      <FormGroup className="form-group">
                                        <InputGroup>
                                          <CustomInput
                                            type="file"
                                            id="exampleCustomFileBrowser4"
                                            name="customFile"
                                            onChange={this.onChangeHandler}
                                            multiple
                                            accept=".pdf,.docx,.ppt,.pptx,.mp4"
                                          />
                                          <InputGroupAddon addonType="append">
                                            <Button
                                              outline
                                              color="secondary"
                                              type="submit"
                                            >
                                              <IntlMessages id="input-groups.button" />
                                            </Button>
                                          </InputGroupAddon>
                                        </InputGroup>
                                        {errors.file && touched.file ? (
                                          <div className="invalid-feedback d-block">
                                            {errors.file}
                                          </div>
                                        ) : null}
                                      </FormGroup>
                                    </Form>
                                  )}
                                </Formik>
                              )}
                            </CardBody>
                          </Colxx>
                        </Row>
                      </TabPane>
                      <TabPane tabId="4">
                        <Row>
                          <Colxx md="8" sm="8" lg="6" xxs="12">
                            <br></br>
                            <br></br>
                            <div className="text-center">
                              <img
                                src={this.props.userProfile.user.avatar}
                                alt="user profile"
                                data-src="holder.js/300x300"
                                className="img-thumbnail img-responsive"
                              ></img>
                              <br></br>

                              <NavLink
                                to={
                                  "/app/profile/userprofile/?profile=" +
                                  this.props.userProfile.user._id
                                }
                              >
                                <br></br>
                                <h2>{this.props.userProfile.user.name}</h2>
                              </NavLink>

                              <h6 className="text-muted text-small mb-4">
                                {this.props.userProfile.status}
                              </h6>
                            </div>
                          </Colxx>
                          <Colxx>
                            <ProfileCard
                              major={this.props.userProfile.major}
                              theCourses={this.state.theCourses}
                              follower={this.state.follower}
                              rating={this.getTotalRating()}
                              review={
                                this.state.reviews &&
                                this.state.reviews.TeacherRate &&
                                this.state.reviews.TeacherRate.length
                              }
                            />
                          </Colxx>
                        </Row>
                        <br></br>
                      </TabPane>
                      <TabPane tabId="5">
                        <Row>
                          <Colxx sm="12">
                            {this.state.reviews &&
                              this.state.reviews.CourseRate && (
                                <CardBody>
                                  {this.state.reviews.CourseRate.map(
                                    (item, index) => {
                                      return (
                                        <Reviews
                                          data={item}
                                          key={item._id}
                                        ></Reviews>
                                      );
                                    }
                                  )}
                                </CardBody>
                              )}
                          </Colxx>
                        </Row>
                      </TabPane>
                      <TabPane tabId="6">
                        <Row>
                          <Colxx sm="12">
                            <CardBody>
                              {this.state.subscriberUsers &&
                                this.state.subscriberUsers.map((itemData) => {
                                  return (
                                    <Colxx
                                      xxs="12"
                                      md="6"
                                      lg="4"
                                      key={itemData.key}
                                    >
                                      <UserCardBasic data={itemData} />
                                    </Colxx>
                                  );
                                })}
                            </CardBody>
                          </Colxx>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </Card>
                </Colxx>

                <Colxx xxs="12" xl="4" className="col-right">
                  {!this.state.subscribed &&
                    this.props.user.roll.toLowerCase() !== "admin" &&
                    this.props.user._id !== this.state.course.user && (
                      <Button
                        size="md"
                        id="subscribecourse"
                        onClick={(e) => this.subscribeCourse(e)}
                      >
                        SUBSCRIBE
                      </Button>
                    )}

                  <div>
                    {this.state.subscribed && (
                      <Button
                        size="md"
                        id="unsubscribecourse"
                        onClick={(e) => this.unsubscribeCourse(e)}
                      >
                        UNSUBSCRIBE
                      </Button>
                    )}
                    {!this.state.isReviewed && this.state.subscribed && (
                      <NavLink
                        to={
                          "/app/feedback/" +
                          this.state.course._id +
                          "/" +
                          this.state.course.user
                        }
                        className="w-40 w-sm-100 float-right"
                      >
                        <Button color="primary" size="md">
                          REVIEW
                        </Button>
                      </NavLink>
                    )}
                  </div>

                  {this.props.user._id === this.state.course.user && (
                    <div>
                      <NavLink
                        to={
                          "/app/mycourses/wizard/?id=" + this.state.course._id
                        }
                        className="w-40 w-sm-100"
                      >
                        <Button color="primary" size="md">
                          EDIT
                        </Button>
                      </NavLink>
                      {RoomId ? (
                        <NavLink
                          to={"/app/myrooms/roomview/?id=" + RoomId._id}
                          className="w-40 w-sm-100 float-right"
                        >
                          <Button color="primary" size="md">
                            Open Room
                          </Button>
                        </NavLink>
                      ) : (
                        <Button
                          color="primary"
                          size="md float-right"
                          onClick={this.toggleModal}
                        >
                          Create Room
                        </Button>
                      )}
                    </div>
                  )}
                  <br></br>
                  <br></br>

                  <Card className="mb-4" id="rest">
                    <CardBody>
                      <Rating
                        total={5}
                        rating={this.getCourseRating()}
                        interactive={false}
                      />
                    </CardBody>
                  </Card>

                  <Card className="mb-4" id="rest">
                    <CardBody>
                      <h3>Why Should I Enroll For This Course?</h3>
                      <br></br>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: this.state.course.importance,
                        }}
                      ></div>
                      <p className="text-muted text-small mb-2">
                        {messages["forms.tags"]}
                      </p>
                      <p className="mb-3">
                        {this.state.course.tags.map((tag) => (
                          <Badge
                            key={tag}
                            color="outline-secondary"
                            className="mb-1 mr-1"
                            pill
                          >
                            {tag}
                          </Badge>
                        ))}
                      </p>
                    </CardBody>
                  </Card>
                  {this.state.relatedcourses.length > 0 && (
                    <Card className="mb-4">
                      <CardBody>
                        <CardTitle>
                          <IntlMessages id="pages.similar-projects" />
                        </CardTitle>
                        <RelatedCourse courses={this.state.relatedcourses} />
                      </CardBody>
                    </Card>
                  )}
                </Colxx>
              </Row>
            </Colxx>
          </Row>
        ) : (
          <div className="loading"></div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.auth;
  const { subscribed } = state.subscribtion;
  const { userProfile } = state.profile;
  const { rooms, room } = state.room;
  return {
    user,
    userProfile,
    subscribed,
    rooms,
    room,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    createRoom,
    getRooms,
    getProfileById,
    GetSubscription,
  })(DetailsPages)
);
