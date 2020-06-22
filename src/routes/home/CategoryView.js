import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardHeader,
  CardBody,
  CardSubtitle,
  CardImg,
  CardText,
} from "reactstrap";
import Pagination from "../../components/pages/Pagination";
import { Colxx } from "../../components/CustomBootstrap";
import { NavLink } from "react-router-dom";
import { ContextMenuTrigger } from "react-contextmenu";
import queryString from "query-string";
import { URL, config } from "../../constants/defaultValues";
import axios from "axios";
import moment from "moment";
function collect(props) {
  return { data: props.data };
}
class ThumbListPages extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);

    this.state = {
      activeTab: "1",
      currentPage: 1,
      totalPage: 1,
      perPage: 6,
      start: 0,
      end: 6,
      courses: null,
      subloading: true,
    };
  }
  async componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    if (values.category) {
      let category = values.category;
      const body = JSON.stringify({ category });
      await axios
        .post(URL + "api/Courses/searchbycat", body, config)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          this.setState({
            courses: data,

            subloading: false,
          });
        });
    }
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
      start: page == 1 ? 0 : start - (start / 6 == 1 ? 0 : Math.round(div) - 1),
      end: page == 1 ? 6 : start + 7,
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

                <Row>
                  {!this.state.subloading ? (
                    this.state.courses &&
                    this.state.courses.slice(start, end).map((product) => {
                      return (
                        <Colxx
                          xxs="12"
                          lg="6"
                          xl="4"
                          className="mb-4"
                          key={product._id}
                        >
                          <ContextMenuTrigger
                            id="menu_id"
                            data={product._id}
                            collect={collect}
                          >
                            <Card className="course" id="course">
                              <div className="position-relative">
                                <NavLink
                                  to={`/mooc/courseview/?id=${product._id}`}
                                  className="w-40 w-sm-100"
                                >
                                  <CardImg
                                    className=".card-img-details"
                                    alt={product.name}
                                    src={product.pic}
                                  />
                                </NavLink>
                              </div>
                              <CardBody>
                                <Row>
                                  <CardSubtitle>{product.name}</CardSubtitle>
                                </Row>
                                <Row>
                                  <CardText className="text-muted text-small mb-0 font-weight-light">
                                    {moment(product.date).format("YYYY MMM DD")}
                                  </CardText>
                                </Row>
                              </CardBody>
                            </Card>
                          </ContextMenuTrigger>
                        </Colxx>
                      );
                    })
                  ) : (
                    <div className="loading"></div>
                  )}

                  {this.state.courses && (
                    <Pagination
                      currentPage={currentPage}
                      totalPage={this.state.courses.length / 6}
                      onChangePage={(i) => this.onChangePage(i)}
                    />
                  )}
                  <br></br>
                </Row>
              </CardHeader>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

export default ThumbListPages;
