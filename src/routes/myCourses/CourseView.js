import React, { Component, Fragment } from "react";
import {
  Row,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Card,
  CardHeader,
} from "reactstrap";
import Pagination from "../../components/pages/Pagination";
import classnames from "classnames";
import { Colxx } from "../../components/CustomBootstrap";
import IntlMessages from "../../util/IntlMessages";
import { NavLink } from "react-router-dom";
import ImageListView from "../../components/pages/ImageListView";
import { connect } from "react-redux";
import ReactGA from "react-ga";
import uuid from "uuid";
import { Image } from "react-bootstrap";
import Recommended from "./recommended.svg";
import {
  GetSubscription,
  GetTopCourses,
  GetRecommendation,
} from "../../redux/actions";
function collect(props) {
  return { data: props.data };
}
class ThumbListPages extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    // this.mouseTrap = require("mousetrap");
    this.state = {
      activeTab: "1",
      currentPage: 1,
      totalPage: 1,
      perPage: 6,
      start: 0,
      end: 6,
    };
  }
  componentDidMount() {
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

    this.props.GetRecommendation();
    this.props.GetTopCourses();
  }
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        currentPage: 1,
        start: 0,
        end: 6,
      });
    }
  }
  onChangePage(page) {
    const start = page * (page + 1);
    const div = start / 6;
    this.setState({
      currentPage: page,
      start:
        page === 1 ? 0 : start - (start / 6 === 1 ? 0 : Math.round(div) - 1),
      end: page === 1 ? 6 : start + 7,
    });
  }

  render() {
    const { start, end, currentPage } = this.state;
    return (
      <Fragment>
        <Row>
          <h1>COURSES</h1>
          <Colxx lg="1"></Colxx>

          <Colxx xxs="12" lg="10">
            <Card className="big" id="big">
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
                      to="#"
                    >
                      <IntlMessages id="Student.recommended" />
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
                      to="#"
                    >
                      <IntlMessages id="student.top" />
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      {!this.props.recloading ? (
                        this.props.recommendation.length > 0 ? (
                          this.props.recommendation
                            .slice(start, end)
                            .map((product) => {
                              return (
                                <ImageListView
                                  key={product.id}
                                  user={this.props.user}
                                  product={product}
                                  collect={collect}
                                />
                              );
                            })
                        ) : (
                          <div class="imgNullContainer h-100 d-flex justify-content-center align-items-center">
                            <Image
                              className="mt-5"
                              style={{ width: "45%" }}
                              src={Recommended}
                              alt="Snow"
                            />
                            <div class="img_centered_c">
                              <h6>
                                Subscribe courses to personalize your
                                recommendation
                              </h6>
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="loading"></div>
                      )}
                      {this.props.recommendation && (
                        <Pagination
                          currentPage={currentPage}
                          totalPage={this.props.recommendation.length / 6}
                          onChangePage={(i) => this.onChangePage(i)}
                        />
                      )}
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      {!this.props.toploading ? (
                        this.props.topcourses &&
                        this.props.topcourses
                          .slice(start, end)
                          .map((product) => {
                            return (
                              <ImageListView
                                key={product.id}
                                user={this.props.user}
                                product={product}
                                collect={collect}
                              />
                            );
                          })
                      ) : (
                        <div className="loading"></div>
                      )}{" "}
                      {this.props.topcourses && (
                        <Pagination
                          currentPage={currentPage}
                          totalPage={this.props.topcourses.length / 6}
                          onChangePage={(i) => this.onChangePage(i)}
                        />
                      )}
                    </Row>
                  </TabPane>
                </TabContent>
              </CardHeader>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth, subscribtion }) => {
  const { user } = auth;

  const { recommendation, recloading, topcourses, toploading } = subscribtion;
  return {
    recommendation,
    user,
    recloading,
    topcourses,
    toploading,
  };
};
export default connect(mapStateToProps, {
  GetSubscription,
  GetTopCourses,
  GetRecommendation,
})(ThumbListPages);
