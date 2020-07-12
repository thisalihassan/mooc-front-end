import React from "react";
import "../myCourses/nav.css";

import queryString from "query-string";
import Reviews from "../../components/pages/Review";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import {
  Row,
  Card,
  CardBody,
  Button,
  Badge,
  CardSubtitle,
  CardText,
  CardImg,
  CardHeader,
  Table,
} from "reactstrap";
import moment from "moment";
import ProfileCard from "../../components/Profile/ProfileCard";
import IntlMessages from "../../util/IntlMessages";
import { Colxx } from "../../components/CustomBootstrap";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import axios from "axios";
import { URL, config, AURL } from "../../constants/defaultValues";
import { getProfileById, GetSubscription } from "../../redux/actions";
import { socket } from "../../containers/TopNav";
import Pagination from "../../components/pages/Pagination";
import NewWindow from "react-new-window";
class OthersProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdown: false,
      theCourses: [],
      activeTab: "1",
      subscribed: null,
      runTime: true,
      follower: "",
      isRported: false,
      reviews: [],
      showMSg: false,
      currentPage: 1,
      totalPage: 1,
      perPage: 6,
      start: 0,
      end: 6,
    };
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  async componentDidMount() {
    let id;
    this.props.GetSubscription();
    const values = queryString.parse(this.props.location.search);
    if (values.profile) {
      id = values.profile;
      this.props.getProfileById(id);
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
      this.setState({ theCourses: res.data, follower: res2.data });
      await axios
        .post(URL + "api/subscribe/getrate", body, config)
        .then((res) => {
          this.setState({ reviews: res.data });
        });
    }
  }
  getTotalRating() {
    let sum = 0;
    const placeHolder = this.state.reviews.TeacherRate;
    const length = this.state.reviews.TeacherRate.length;
    for (let i = 0; i < length; i++) {
      let temp = placeHolder[i].rating;
      sum = sum + temp;
    }
    return sum / length;
  }
  componentDidUpdate(prevState, prevProps) {
    if (this.props.user) {
      if (this.props.subscribed !== prevProps.subscribed) {
        const values = queryString.parse(this.props.location.search);
        let id = values.profile;
        if (this.state.runTime && this.props.subscribed.following) {
          const log = this.props.subscribed.following.find((x) => x._id === id);
          const match = this.props.subscribed.followers.find(
            (x) => x._id === id
          );
          this.setState({ showMSg: log && match });
          this.setState({ subscribed: log });
          this.setState({ runTime: false });
          const body = JSON.stringify({ id });
          axios
            .post(URL + "api/profile/findmyreport", body, config)
            .then((res) => {
              return res.data;
            })
            .then((data) => {
              this.setState({
                isRported: data,
              });
            });
        }
      }
    }
  }
  async subscribeTeacher(e) {
    e.preventDefault();
    const id = this.props.userProfile.user._id;
    let body = JSON.stringify({ id });
    await axios.post(URL + "api/subscribe/follow", body, config);
    const message = this.props.user.name + " has started following you";
    const following = this.props.userProfile.user._id;
    const follower = this.props.user._id;
    body = JSON.stringify({ following, follower, message });
    socket.emit("new_notification", {
      body: body,
      message: message,
      user: following,
      follower: follower,
    });
    this.props.GetSubscription();
    window.location.reload();
  }

  async unsubscribeTeacher(e) {
    e.preventDefault();
    const id = this.props.userProfile.user._id;
    const body = JSON.stringify({ id });
    await axios.post(URL + "api/subscribe/unfollow", body, config);
    this.props.GetSubscription();
    window.location.reload();
  }
  async reportProfile(e) {
    e.preventDefault();
    const id = this.props.userProfile.user._id;
    const body = JSON.stringify({ id });
    await axios.post(URL + "api/profile/reprotProfile", body, config);
    this.props.GetSubscription();
    window.location.reload();
  }

  startAudioCall(owner, user) {
    const myData = [owner, user];
    const myroom = myData.sort();
    const name = this.props.user.name;
    const userid = owner;
    const URL = AURL + "?roomid=" + myroom[0] + "" + myroom[1] + "&u=join";
    const tuple = { userid, name, URL };
    socket.emit("CallRing", tuple, () =>
      this.setState({
        modalOpen: !this.state.modalOpen,
        videoURL:
          AURL +
          "?roomid=" +
          myroom[0] +
          "" +
          myroom[1] +
          "&u=start&n=" +
          this.props.user.name,
      })
    );
  }
  onChangePage(page) {
    const start = page * (page + 1);
    const div = start / 6;
    this.setState({
      currentPage: page,
      start: page == 1 ? 0 : start - (start / 6 == 1 ? 0 : Math.round(div) - 1),
      end: page == 1 ? 6 : start + 7,
    });
  }
  render() {
    const { start, end, currentPage } = this.state;
    return (
      <Row>
        {this.state.modalOpen && (
          <NewWindow url={this.state.videoURL}></NewWindow>
        )}
        <Colxx xxs="1"></Colxx>
        {this.props.user && this.props.userProfile ? (
          <Colxx xxs="10" className="mb-5">
            <div className="text-center">
              <h1>{this.props.userProfile.user.name}</h1>
            </div>

            <Card>
              <Row>
                <Colxx md="8" sm="8" lg="6" xxs="12">
                  <br></br>
                  <br></br>
                  <div className="text-center">
                    <img
                      src={this.props.userProfile.user.avatar}
                      data-src="holder.js/300x300"
                      class="img-thumbnail img-responsive"
                    ></img>
                    <br></br>
                    <br></br>
                  </div>
                </Colxx>
                <Colxx md="8" sm="8" lg="6" xxs="12">
                  <div className="text-center">
                    <br></br>
                    <br></br>
                    {this.props.user._id !== this.props.userProfile.user._id &&
                      this.props.user.roll.toLowerCase() !== "admin" && (
                        <div>
                          <Button
                            id="g"
                            onClick={() =>
                              this.startAudioCall(
                                this.props.userProfile.user._id,
                                this.props.user._id
                              )
                            }
                          >
                            <i id="othr" className="simple-icon-phone" />
                          </Button>
                          {this.state.showMSg && (
                            <a
                              href={
                                "/app/messages/chat/?t=" +
                                this.props.userProfile.user._id
                              }
                            >
                              <Button>
                                <i id="othr" className="simple-icon-bubble"></i>
                              </Button>
                            </a>
                          )}
                          {!this.state.isRported && (
                            <Button onClick={(e) => this.reportProfile(e)}>
                              Report
                            </Button>
                          )}{" "}
                          {!this.state.subscribed && (
                            <Button onClick={(e) => this.subscribeTeacher(e)}>
                              SUBSCRIBE
                            </Button>
                          )}
                          {this.state.subscribed && (
                            <Button onClick={(e) => this.unsubscribeTeacher(e)}>
                              UNSUBSCRIBE
                            </Button>
                          )}
                        </div>
                      )}
                  </div>
                  {this.state.reviews && this.state.reviews.TeacherRate ? (
                    <ProfileCard
                      major={this.props.userProfile.major}
                      theCourses={this.state.theCourses.length}
                      follower={this.state.follower}
                      rating={this.getTotalRating()}
                      review={this.state.reviews.TeacherRate.length}
                    />
                  ) : (
                    <ProfileCard
                      major={this.props.userProfile.major}
                      theCourses={this.state.theCourses.length}
                      follower={this.state.follower}
                      rating={0}
                      review={0}
                    />
                  )}
                </Colxx>
              </Row>
            </Card>
            <Card>
              <CardHeader>
                <br></br>
                <br></br>
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
                        "/app/profile/userprofile/?profile=" +
                        this.props.userProfile.user._id
                      }
                    >
                      <IntlMessages id="profile.courses" />
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
                        "/app/profile/userprofile/?profile=" +
                        this.props.userProfile.user._id
                      }
                    >
                      <IntlMessages id="profile.presonal" />
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
                        "/app/profile/userprofile/?profile=" +
                        this.props.userProfile.user._id
                      }
                    >
                      <IntlMessages id="profile.education" />
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
                        "/app/profile/userprofile/?profile=" +
                        this.props.userProfile.user._id
                      }
                    >
                      <IntlMessages id="profile.work" />
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
                        "/app/profile/userprofile/?profile=" +
                        this.props.userProfile.user._id
                      }
                    >
                      <IntlMessages id="pages.reviews" />
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <div className="pl-lg-4">
                      <Colxx md="12">
                        <Row>
                          {this.state.theCourses.length > 0 &&
                            this.state.theCourses
                              .slice(start, end)
                              .map((course) => {
                                return (
                                  <Colxx
                                    xxs="12"
                                    lg="6"
                                    xl="4"
                                    className="mb-4"
                                    key={course._id}
                                  >
                                    <Card className="course" id="course">
                                      <div className="position-relative">
                                        <NavLink
                                          to={
                                            "/app/mycourses/courseView/?id=" +
                                            course._id
                                          }
                                          className="w-40 w-sm-100"
                                        >
                                          <CardImg
                                            className=".card-img-details"
                                            alt={course.name}
                                            src={course.pic}
                                          />
                                        </NavLink>
                                      </div>
                                      <CardBody>
                                        <NavLink
                                          to={
                                            "/app/mycourses/courseView/?id=" +
                                            course._id
                                          }
                                          className="w-40 w-sm-100"
                                        >
                                          <CardSubtitle>
                                            {course.name}
                                          </CardSubtitle>
                                        </NavLink>
                                        <CardText className="text-muted text-small mb-0 font-weight-light">
                                          {moment(course.date).format(
                                            "YYYY MMM DD"
                                          )}
                                        </CardText>
                                      </CardBody>
                                    </Card>
                                  </Colxx>
                                );
                              })}
                          {this.state.theCourses.length > 0 && (
                            <Pagination
                              currentPage={currentPage}
                              totalPage={Math.ceil(
                                this.state.theCourses.length / 6
                              )}
                              onChangePage={(i) => this.onChangePage(i)}
                            />
                          )}
                        </Row>
                      </Colxx>
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <div className="pl-lg-4">
                      <Row>
                        <Colxx md="12">
                          <br></br>
                          <br></br>
                          <h2>About Me</h2>
                          <p>{this.props.userProfile.description}</p>
                          <br></br>
                          <br></br>
                          <h2>Skills</h2>
                          <p className="mb-3">
                            {this.props.userProfile.skills.map((skill) => (
                              <Badge
                                key={skill}
                                color="outline-secondary"
                                className="mb-1 mr-1"
                                pill
                              >
                                {skill}
                              </Badge>
                            ))}
                          </p>
                        </Colxx>
                      </Row>
                    </div>
                  </TabPane>
                  <TabPane tabId="3">
                    <div className="pl-lg-4">
                      <Row>
                        <Colxx md="12">
                          <br></br>
                          <br></br>
                          <Table>
                            <thead>
                              <tr>
                                <th>Field of Study</th>
                                <th>Current Education</th>
                                <th>From</th>
                                <th>To</th>
                              </tr>
                            </thead>{" "}
                            <tbody>
                              {this.props.userProfile.education.map((edu) => (
                                <tr key={edu._id}>
                                  <td>{edu.fieldofstudy}</td>
                                  <td>{edu.current}</td>
                                  <td>
                                    {moment(edu.from).format("YYYY-MM-DD")}
                                  </td>
                                  <td>{moment(edu.to).format("YYYY-MM-DD")}</td>{" "}
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Colxx>
                      </Row>
                    </div>
                  </TabPane>
                  <TabPane tabId="4">
                    <div className="pl-lg-4">
                      <Row>
                        <Colxx md="12">
                          <br></br>
                          <br></br>
                          <Table>
                            <thead>
                              <tr>
                                <th>Company Name</th>
                                <th>Job Position</th>
                                <th>From</th>
                                <th>To</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.props.userProfile.work.map((work) => (
                                <tr key={work._id}>
                                  <td>{work.company}</td>
                                  <td>{work.position}</td>
                                  <td>
                                    {moment(work.from).format("YYYY-MM-DD")}
                                  </td>
                                  <td>
                                    {moment(work.to).format("YYYY-MM-DD")}
                                  </td>{" "}
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Colxx>
                      </Row>
                    </div>
                  </TabPane>
                  <TabPane tabId="5">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          {this.state.reviews &&
                            this.state.reviews.TeacherRate &&
                            this.state.reviews.TeacherRate.map(
                              (item, index) => {
                                return (
                                  <Reviews data={item} key={item._id}></Reviews>
                                );
                              }
                            )}
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                </TabContent>
              </CardHeader>
            </Card>
          </Colxx>
        ) : (
          <div className="loading"></div>
        )}
      </Row>
    );
  }
}
// const mapStateToProps = state => {
//   const authUser = state.auth;
//   const profile = state.profile;
//   return { authUser, profile };
// };

const mapStateToProps = (state) => {
  const { userProfile } = state.profile;
  const { user } = state.auth;
  const { subscribed } = state.subscribtion;
  return { userProfile, subscribed, user };
};

export default injectIntl(
  connect(mapStateToProps, { getProfileById, GetSubscription })(OthersProfile)
);
