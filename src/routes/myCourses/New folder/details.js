import React, { Component, Fragment } from "react";
import Holder from "react-holder";
import "./nav.css";
import {
  Row,
  Card,
  CardTitle,
  CardBody,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  Badge,
  CardHeader,
  Table,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Collapse
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { Separator, Colxx } from "../../components/CustomBootstrap";
import IntlMessages from "../../util/IntlMessages";
import { injectIntl } from "react-intl";
import GlideComponentThumbs from "../../components/carousel/GlideComponentThumbs";
import { detailImages, detailThumbs } from "../../data/carouselItems";
import { detailsQuestionsData } from "../../data/questions";
import CommentWithLikes from "../../components/pages/CommentWithLikes";
import { commentWithLikesData } from "../../data/comments";
import QuestionAnswer from "../../components/pages/QuestionAnswer";
import GalleryDetail from "../../components/pages/GalleryDetail";
import { CardImg } from "react-bootstrap";

class DetailsPages extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeFirstTab: "1",
      collapse: false,
      accordion: [false, false, false]
    };
  }
  toggleAccordion = tab => {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      accordion: state
    });
  };

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab
      });
    }
  }

  render() {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>Magdalena Cake</h1>

            <Separator className="mb-8" />
            <br></br>
            <br></br>
            <Row>
              <Colxx xxs="12" xl="8" className="col-left">
                <Card className="mb-4">
                  <CardImg
                    src="http://upload.wikimedia.org/wikipedia/sr/0/0c/Firefox-logo.png"
                    data-src="holder.js/793x300"
                    fluid
                    class="img-thumbnail img-responsive"
                  ></CardImg>

                  {/* <GlideComponentThumbs
                      settingsImages={{
                        bound: true,
                        rewind: false,
                        focusAt: 0,
                        startAt: 0,
                        gap: 5,
                        perView: 1,
                        data: detailImages
                      }}
                      settingsThumbs={{
                        bound: true,
                        rewind: false,
                        focusAt: 0,
                        startAt: 0,
                        gap: 10,
                        perView: 5,
                        data: detailThumbs,
                        breakpoints: {
                          576: {
                            perView: 4
                          },
                          420: {
                            perView: 3
                          }
                        }
                      }}
                    /> */}
                </Card>
                <Card className="mb-4">
                  <CardHeader>
                    <Nav tabs className="card-header-tabs " id="nav">
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeFirstTab === "1",
                            "nav-link": true
                          })}
                          onClick={() => {
                            this.toggleTab("1");
                          }}
                          to="#"
                        >
                          <IntlMessages id="pages.outcome" />
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeFirstTab === "2",
                            "nav-link": true
                          })}
                          onClick={() => {
                            this.toggleTab("2");
                          }}
                          to="#"
                        >
                          <IntlMessages id="pages.prereq" />
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeFirstTab === "3",
                            "nav-link": true
                          })}
                          onClick={() => {
                            this.toggleTab("3");
                          }}
                          to="#"
                        >
                          <IntlMessages id="pages.content" />
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeFirstTab === "4",
                            "nav-link": true
                          })}
                          onClick={() => {
                            this.toggleTab("4");
                          }}
                          to="#"
                        >
                          <IntlMessages id="pages.intructor" />
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeFirstTab === "5",
                            "nav-link": true
                          })}
                          onClick={() => {
                            this.toggleTab("5");
                          }}
                          to="#"
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
                            <Table borderless>
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Outcomes</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>Outcome 1</td>
                                </tr>
                                <tr>
                                  <th scope="row">2</th>
                                  <td>Outcome 2</td>
                                </tr>
                                <tr>
                                  <th scope="row">3</th>
                                  <td colSpan="2">Outcome 3</td>
                                </tr>
                              </tbody>
                            </Table>
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
                            <Table borderless>
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Prerequisites</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>prereq 1</td>
                                </tr>
                                <tr>
                                  <th scope="row">2</th>
                                  <td>prereq 2</td>
                                </tr>
                                <tr>
                                  <th scope="row">3</th>
                                  <td colSpan="2">prereq 3</td>
                                </tr>
                              </tbody>
                            </Table>
                          </CardBody>
                        </Colxx>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Colxx sm="12">
                          <CardBody>
                            <div className="border">
                              <Button
                                color="link"
                                onClick={() => this.toggleAccordion(0)}
                                aria-expanded={this.state.accordion[0]}
                              >
                                Lecture 1
                              </Button>
                              <Collapse isOpen={this.state.accordion[0]}>
                                <div className="p-4">
                                  <Table borderless>
                                    <thead>
                                      <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Outcomes</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th scope="row">1</th>
                                        <td>Outcome 1</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">2</th>
                                        <td>Outcome 2</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">3</th>
                                        <td colSpan="2">Outcome 3</td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                              </Collapse>
                            </div>
                          </CardBody>
                        </Colxx>
                      </Row>
                    </TabPane>
                    <TabPane tabId="5">
                      <Row>
                        <Colxx sm="12">
                          <CardBody>
                            {commentWithLikesData.map((item, index) => {
                              return (
                                <CommentWithLikes
                                  data={item}
                                  key={item.key}
                                ></CommentWithLikes>
                              );
                            })}
                            {/* <InputGroup className="comment-contaiener">
                              <Input
                                placeholder={messages["pages.addComment"]}
                              />
                              {/* <InputGroupAddon addonType="append">
                                <Button color="primary">
                                  <span className="d-inline-block">
                                    {messages["pages.send"]}
                                  </span>{" "}
                                  <i className="simple-icon-arrow-right ml-2"></i>
                                </Button>
                              </InputGroupAddon> */}
                          </CardBody>
                        </Colxx>
                      </Row>
                    </TabPane>
                  </TabContent>
                </Card>
              </Colxx>

              <Colxx xxs="12" xl="4" className="col-right">
                <Button color="primary" size="lg">
                  {" "}
                  ENROLL
                </Button>
                <br></br>
                <br></br>
                <Card className="mb-4">
                  <CardBody>
                    <h3>Why Should I Enroll For This Course?</h3>
                    <br></br>
                    <p>
                      {" "}
                      Add basic services that you will provide to the students
                      and also the main outcome of teh course. Do not go too
                      deep in the ooutcomes since u will be discussing them in a
                      saperate section
                    </p>

                    <p className="text-muted text-small mb-2">
                      {messages["forms.tags"]}
                    </p>
                    <p className="mb-3">
                      <Badge
                        color="outline-secondary"
                        className="mb-1 mr-1"
                        pill
                      >
                        FRONTEND
                      </Badge>
                      <Badge
                        color="outline-secondary"
                        className="mb-1 mr-1"
                        pill
                      >
                        JAVASCRIPT
                      </Badge>
                      <Badge
                        color="outline-secondary"
                        className="mb-1 mr-1"
                        pill
                      >
                        SECURITY
                      </Badge>
                      <Badge
                        color="outline-secondary"
                        className="mb-1 mr-1"
                        pill
                      >
                        DESIGN
                      </Badge>
                    </p>
                  </CardBody>
                </Card>
                <Card className="mb-4">
                  <CardBody>
                    <CardTitle>
                      <IntlMessages id="pages.similar-projects" />
                    </CardTitle>
                    <GalleryDetail />
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(DetailsPages);
