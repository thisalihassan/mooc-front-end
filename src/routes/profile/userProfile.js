import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Row, Nav, NavItem, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { Colxx } from "../../components/CustomBootstrap";
import IntlMessages from "../../util/IntlMessages";
import { injectIntl } from "react-intl";
import AboutTab from "./tabs/AboutTab";
import AccountDelete from "./tabs/Settings";
import UserCardBasic from "../../components/cards/UserCardBasic";
import { getCurrentProfile, GetSubscription } from "../../redux/actions";
import PortfolioTab from "./tabs/portfolioTab";
import { NavLink } from "react-router-dom";
import axios from "axios";
import ReactGA from "react-ga";
import uuid from "uuid";
import { URL, config } from "../../constants/defaultValues";
class ProfilePortfolio extends Component {
  constructor(props) {
    super(props);

    this.toggleTab = this.toggleTab.bind(this);

    this.state = {
      activeTab: "1",
      loading: true,
    };
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.GetSubscription();
  }
  async componentDidUpdate() {
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
    if (this.props.user && this.props.user.roll === "admin") {
      this.props.history.push("/app/admin/visitors");
    }
    if (this.props.user && this.props.user._id) {
      if (this.state.loading && this.props.user.roll === "teacher") {
        let id = this.props.user._id;
        const body = JSON.stringify({ id });
        const res = await axios.post(
          URL + "api/Courses/mycourses",
          body,
          config
        );
        this.setState({ myCourses: res.data, loading: false });
      } else if (
        this.state.loading &&
        this.props.user.roll === "student" &&
        this.props.subscribed.courses
      ) {
        this.setState({
          myCourses: this.props.subscribed.courses,
          loading: false,
        });
      }
    }
  }
  render() {
    const user = this.props.user;
    const { profile } = this.props.profile;

    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            {/* <h1>Welcome {user && user.name}</h1> */}
            <Nav tabs className="separator-tabs ml-0 mb-5">
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
                  <IntlMessages id="pages.details" />
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
                  <IntlMessages id="pages.AboutMe" />
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
                  <IntlMessages id="pages.settings" />
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
                  to="#"
                >
                  {user && user.roll.toLowerCase() === "teacher" ? (
                    <IntlMessages id="pages.followers" />
                  ) : (
                    <IntlMessages id="pages.following" />
                  )}
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                {profile ? (
                  <PortfolioTab
                    skills={profile.skills}
                    description={profile.description}
                    user={user}
                    major={profile.major}
                    education={profile.education}
                    myCourses={this.state.myCourses}
                  />
                ) : (
                  <div className="loading"></div>
                )}
              </TabPane>
              <TabPane tabId="2">
                <AboutTab
                  location={this.props.location}
                  history={this.props.history}
                />
              </TabPane>
              <TabPane tabId="3">{<AccountDelete />}</TabPane>
              <TabPane tabId="4">
                <Row>
                  {user && user.roll === "student"
                    ? this.props.subscribed.following &&
                      this.props.subscribed.following.map((itemData) => {
                        return (
                          <Colxx xxs="12" md="6" lg="4" key={itemData.key}>
                            <UserCardBasic data={itemData} />
                          </Colxx>
                        );
                      })
                    : this.props.subscribed.followers &&
                      this.props.subscribed.followers.map((itemData) => {
                        return (
                          <Colxx xxs="12" md="6" lg="4" key={itemData.key}>
                            <UserCardBasic data={itemData} />
                          </Colxx>
                        );
                      })}
                </Row>
              </TabPane>
            </TabContent>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  const { user } = state.auth;
  const profile = state.profile;
  const { subscribed } = state.subscribtion;
  return { user, profile, subscribed };
};

export default injectIntl(
  connect(mapStateToProps, { getCurrentProfile, GetSubscription })(
    ProfilePortfolio
  )
);
