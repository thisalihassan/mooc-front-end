import Holder from "react-holder";
import React, { Component, Fragment } from "react";
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
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { Separator, Colxx } from "../../components/CustomBootstrap";
import IntlMessages from "../../util/IntlMessages";
import { injectIntl } from "react-intl";
import Reviews from "../../components/pages/Review";
import { CardImg } from "react-bootstrap";
import queryString from "query-string";
import axios from "axios";
import { connect } from "react-redux";
import UserCardBasic from "../../components/cards/UserCardBasic";
import ProfileCard from "../../components/Profile/ProfileCard";
import { URL, config } from "../../constants/defaultValues";
import { getProfileById } from "../../redux/actions";
import Rating from "../../components/Rating";
export class DetailsPages extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeFirstTab: "1",
      course: "",
      runTime: "true",
      files: "",
      theCourses: 0,
      follower: "",
      lectureFiles: [],
      reviews: [],
      firstTime: true,
      lecture: "",
    };
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
    const values = queryString.parse(this.props.location.search);
    if (values.id) {
      id = values.id;

      let body = JSON.stringify({ id });
      // axios
      //   .post(URL + "api/recomendation/likecourses", body, config)
      //   .then((res) => {
      //     this.setState({ relatedcourses: res.data.courses });
      //   });
      axios.post(URL + "api/subscribe/getrate", body, config).then((res) => {
        this.setState({ reviews: res.data });
      });
      axios
        .post(URL + "api/Courses/mycourse", body, config)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          id = data.user;
          this.props.getProfileById(id);
          body = JSON.stringify({ id });
          axios
            .post(URL + "api/Courses/getcourses", body, config)
            .then((res) => this.setState({ theCourses: res.data.length }));

          axios
            .post(URL + "api/subscribe/getfollowers", body, config)
            .then((res) => this.setState({ follower: res.data }));

          this.setState({ course: data });
        });
    }
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

  render() {
    const { messages } = this.props.intl;
    let courseimg;
    if (this.state.course) {
      courseimg = this.state.course.pic;
    }
    return (
      <Fragment>
        {this.state.course && this.props.userProfile ? (
          <Row>
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
                            to={"/mooc/courseview/?id=" + this.state.course._id}
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
                            to={"/mooc/courseview/?id=" + this.state.course._id}
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
                            to={"/mooc/courseview/?id=" + this.state.course._id}
                          >
                            <IntlMessages id="pages.intructor" />
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
                            to={"/mooc/courseview/?id=" + this.state.course._id}
                          >
                            <IntlMessages id="pages.reviews" />
                          </NavLink>
                        </NavItem>
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
                          <Colxx md="8" sm="8" lg="6" xxs="12">
                            <br></br>
                            <br></br>
                            <div className="text-center">
                              <img
                                src={this.props.userProfile.user.avatar}
                                data-src="holder.js/300x300"
                                className="img-thumbnail img-responsive"
                              ></img>
                              <br></br>

                              <NavLink
                                to={
                                  "/mooc/courseview/?id=" +
                                  this.state.course._id
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
                      <TabPane tabId="4">
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
  const { userProfile } = state.profile;

  return {
    userProfile,
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    getProfileById,
  })(DetailsPages)
);
