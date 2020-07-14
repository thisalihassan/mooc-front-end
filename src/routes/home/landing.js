import React, { Component, Fragment } from "react";
import "./landing.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image } from "react-bootstrap";

import { NavLink } from "react-router-dom";
import classnames from "classnames";
import Slides from "./landing/slides";
import ReactGA from "react-ga";
import uuid from "uuid";
import { connect } from "react-redux";
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  CardHeader,
  TabPane,
  TabContent,
} from "reactstrap";
import { Colxx } from "../../components/CustomBootstrap";
import GlideComponent from "../../components/carousel/GlideComponent";
import { GetTopCourses } from "../../redux/actions";
import axios from "axios";
import { URL, config } from "../../constants/defaultValues";
const options = [
  "Business",
  "IT and Software",
  "Artificial Intelligence",
  "Programming and Development",
  "Accounting",
  "Photography",
  "Data Science",
  "Design",
  "Music",
];
const BasicCarouselItem = ({ product }) => {
  return (
    <div className="glide-item">
      <Card className="flex-row">
        <div className="w-50 position-relative">
          {" "}
          <NavLink to={`/mooc/courseview/?id=${product._id}`}>
            <img
              className="card-img-left"
              src={product.pic}
              alt={product.name}
            />{" "}
          </NavLink>
        </div>
        <div className="w-50">
          <CardBody>
            <h6 className="mb-4">{product.name}</h6>
          </CardBody>
        </div>
      </Card>
    </div>
  );
};
class mainLanding extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeTab: "0",
      category: null,
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
    this.getCourses(this.state.activeTab);
  }
  getCourses(activeTab) {
    const category = options[parseInt(activeTab)];
    const body = JSON.stringify({ category });
    axios
      .post(URL + "api/Courses/topcoursesbycat", body, config)
      .then((res) => {
        this.setState({ category: res.data });
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.activeTab !== prevState.activeTab) {
      this.setState({ category: null });
      this.getCourses(this.state.activeTab);
    }
  }
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  render() {
    return (
      <Fragment>
        <Slides />
        <Image
          width="1400px"
          src="https://res.cloudinary.com/mooc/image/upload/v1592576682/assests/whyagain_ncixv7.png"
        ></Image>{" "}
        <Row>
          <Colxx xxs="4">
            <Card>
              <CardBody className="text-center">Our Top Sellers</CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="8">
            <Card className="big" id="big">
              <CardHeader>
                <Nav tabs className="card-header-tabs " id="nav">
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeFirstTab === "0",
                        "nav-link": true,
                      })}
                      onClick={() => {
                        this.toggleTab("0");
                      }}
                      to="#"
                    >
                      {options[0]}
                    </NavLink>
                  </NavItem>{" "}
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
                      {options[1]}
                    </NavLink>
                  </NavItem>{" "}
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
                      {options[2]}
                    </NavLink>
                  </NavItem>{" "}
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
                      {options[3]}
                    </NavLink>
                  </NavItem>{" "}
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId={this.state.activeTab}>
                    <Colxx xxs="12" className="pl-0 pr-0 mb-5">
                      {this.state.category ? (
                        <GlideComponent
                          settings={{
                            gap: 5,
                            perView: 3,
                            type: "carousel",
                            breakpoints: {
                              600: { perView: 2 },
                              1400: { perView: 3 },
                            },
                          }}
                        >
                          {this.state.category.map((product) => {
                            return (
                              <BasicCarouselItem
                                key={product.id}
                                product={product}
                              />
                            );
                          })}
                        </GlideComponent>
                      ) : (
                        <div className="loading"></div>
                      )}
                    </Colxx>
                  </TabPane>
                </TabContent>
              </CardHeader>
            </Card>
          </Colxx>
        </Row>
        <Image
          width="1350px"
          src="https://res.cloudinary.com/mooc/image/upload/v1592579789/assests/easy_mwcy7i.png"
        ></Image>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ subscribtion }) => {
  const { topcourses, toploading } = subscribtion;
  return {
    topcourses,
    toploading,
  };
};
export default connect(mapStateToProps, {
  GetTopCourses,
})(mainLanding);
