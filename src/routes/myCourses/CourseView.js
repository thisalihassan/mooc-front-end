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

import classnames from "classnames";
import { Colxx } from "../../components/CustomBootstrap";
import IntlMessages from "../../util/IntlMessages";
import { NavLink } from "react-router-dom";
import Pagination from "../../components/pages/Pagination";
import ImageListView from "../../components/pages/ImageListView";
import { connect } from "react-redux";
import ReactGA from "react-ga";
import uuid from "uuid";
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
    this.props.GetSubscription();
    this.props.GetRecommendation();
    this.props.GetTopCourses();
  }
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  onChangePage = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  render() {
    console.log(this.props.topcourses);
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
                      <IntlMessages id="student.courses" />
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
                      <IntlMessages id="Student.recommended" />
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
                      to="#"
                    >
                      <IntlMessages id="student.top" />
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      {!this.props.subloading ? (
                        this.props.courses &&
                        this.props.courses.map((product) => {
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
                      )}

                      {this.props.courses && (
                        <Pagination
                          currentPage={this.state.currentPage}
                          totalPage={this.props.courses.length / 8}
                          onChangePage={(i) => this.onChangePage(i)}
                        />
                      )}
                      <br></br>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      {!this.props.recloading ? (
                        this.props.recommendation ? (
                          this.props.recommendation.map((product) => {
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
                          <div>You don't have any recommendations</div>
                        )
                      ) : (
                        <div className="loading"></div>
                      )}
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      {!this.props.toploading ? (
                        this.props.topcourses &&
                        this.props.topcourses.map((product) => {
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
  const { courses } = subscribtion.subscribed;
  const {
    recommendation,
    recloading,
    subloading,
    topcourses,
    toploading,
  } = subscribtion;
  return {
    recommendation,
    courses,
    user,
    recloading,
    subloading,
    topcourses,
    toploading,
  };
};
export default connect(mapStateToProps, {
  GetSubscription,
  GetTopCourses,
  GetRecommendation,
})(ThumbListPages);
