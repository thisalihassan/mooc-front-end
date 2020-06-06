import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardSubtitle, CardText } from "reactstrap";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import Pagination from "../../components/pages/Pagination";
import { Separator, Colxx } from "../../components/CustomBootstrap";
import { search } from "../../redux/actions";
import axios from "axios";
import ThumbnailImage from "../../components/cards/ThumbnailImage";
import queryString from "query-string";
import { URL, config } from "../../constants/defaultValues";
class SearchPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentPage: 1,
      totalPage: 12,
      keyword: "",
      isLoading: true,
      perPage: 6,
      viewProfile: false,
    };
    // this.dataListRender();
  }

  onChangePage(page) {
    this.setState(
      {
        currentPage: page,
      },
      () => {
        this.dataListRender();
      }
    );
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    if (values.search) {
      if (values.r) {
        this.props.history.push("/app/search/?search=" + values.search);
        window.location.reload();
      }
      this.dataListRender(values.search);
    }
  }
  componentDidUpdate() {
    const values = queryString.parse(this.props.location.search);
    if (values.search) {
      if (values.r) {
        this.props.history.push("/app/search/?search=" + values.search);
        window.location.reload();
      }
    }
  }
  async dataListRender(search) {
    const name = this.props.searchBy;
    console.log(name);
    const searchItem = search;
    console.log(search);
    const perPage = this.state.perPage;
    const currentPage = this.state.currentPage;
    const body = JSON.stringify({ currentPage, searchItem, perPage });
    let searchURL = "/api/Courses/search";
    if (name === "User") {
      searchURL = "api/auth/search";
    } else if (name === "Course") {
      searchURL = "api/Courses/search";
    }

    await axios
      .post(URL + searchURL, body, config)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        this.setState({
          items: data.search,
          totalPage: data.totalPage,
          isLoading: false,
        });
      });
  }

  render() {
    const rowLength = this.state.items.length;
    const { isLoading } = this.state;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" className="mb-4">
            {!isLoading && this.state.items.length ? (
              this.state.items.map((item, i) => {
                return (
                  <div
                    key={i}
                    className={`${rowLength !== i + 1 ? "mb-3" : ""}`}
                  >
                    {this.props.searchBy === "User" && (
                      <NavLink
                        to={`/app/profile/userprofile/?profile=${item._id}`}
                        className="w-40 w-sm-100"
                      >
                        <Card className="d-flex flex-row mb-4">
                          <ThumbnailImage
                            rounded
                            small
                            src={item.avatar}
                            alt="profile"
                            className="m-4"
                          />
                          <div className=" d-flex flex-grow-1 min-width-zero">
                            <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                              <div className="min-width-zero">
                                <CardSubtitle className="list-item-heading mb-1 color-theme-1">
                                  {item.name}
                                </CardSubtitle>
                                <CardText className="text-muted text-small mb-2">
                                  {item.roll.toUpperCase()}
                                </CardText>
                                <CardText className="text-muted text-small mb-2">
                                  {item.description}
                                </CardText>
                              </div>
                            </CardBody>
                          </div>
                        </Card>
                      </NavLink>
                    )}
                    {this.props.searchBy === "Course" && (
                      <NavLink
                        to={`/app/mycourses/courseView/?id=${item._id}`}
                        className="w-40 w-sm-100"
                      >
                        <Card className="d-flex flex-row mb-4">
                          <ThumbnailImage
                            rounded
                            small
                            src={item.pic}
                            alt="profile"
                            className="m-4"
                          />
                          <div className=" d-flex flex-grow-1 min-width-zero">
                            <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                              <div className="min-width-zero">
                                <CardSubtitle className="list-item-heading mb-1 color-theme-1">
                                  {item.name}
                                </CardSubtitle>
                                <CardText className="text-muted text-small mb-2">
                                  {item.description}
                                </CardText>
                              </div>
                            </CardBody>
                          </div>
                        </Card>
                      </NavLink>
                    )}
                    {rowLength !== i + 1 && <Separator />}
                  </div>
                );
              })
            ) : (
              <div>No search found</div>
            )}
          </Colxx>
          <Pagination
            currentPage={
              this.state.currentPage === 0 ? 1 : this.state.currentPage
            }
            totalPage={this.state.totalPage === 0 ? 1 : this.state.totalPage}
            onChangePage={(i) => this.onChangePage(i)}
          />
        </Row>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ settings }) => {
  const { locale, searchBy, searchKeyword } = settings;
  return { locale, searchBy, searchKeyword };
};
export default injectIntl(
  withRouter(connect(mapStateToProps, { search })(SearchPages))
);
