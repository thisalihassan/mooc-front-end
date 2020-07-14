import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import Pagination from "../../components/DatatablePagination";
import {
  Row,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Card,
  CardHeader,
  CardTitle,
  Button,
} from "reactstrap";
import classnames from "classnames";
import { Colxx } from "../../components/CustomBootstrap";
import IntlMessages from "../../util/IntlMessages";
import { injectIntl } from "react-intl";
import UserCardBasic from "./UserCardBasic";
import {
  AcceptCourse,
  DeleteCourse,
  getApprovedCourse,
  getPendingCourse,
} from "../../redux/actions";
import axios from "axios";

import { URL, config } from "../../constants/defaultValues";
import { NavLink } from "react-router-dom";
class ProfilePortfolio extends Component {
  constructor(props) {
    super(props);

    this.toggleTab = this.toggleTab.bind(this);

    this.state = {
      activeTab: "1",
      columns: [
        {
          Header: "Name",
          accessor: "name",
          Cell: (props) => (
            <NavLink
              to={"/app/mycourses/courseView/?id=" + props.original._id}
              className="w-40 w-sm-100"
            >
              {props.value}
            </NavLink>
          ),
        },
        {
          Header: "Publisher",
          accessor: "publisher",
          Cell: (props) => (
            <p className="text-muted">{props.original.user.name}</p>
          ),
        },
        {
          Header: "Category",
          accessor: "category",
          Cell: (props) => <p className="text-muted">{props.value}</p>,
        },
        {
          Header: "Action",
          accessor: "accept",
          Cell: (props) => (
            <div>
              <Button id="g" className="icon-button">
                <i
                  className="simple-icon-check"
                  onClick={(e) => this.AcceptCourse(e, props.original._id)}
                />
              </Button>
              <Button className="icon-button">
                <i
                  className="simple-icon-close"
                  onClick={(e) => this.RejectCourse(e, props.original._id)}
                />
              </Button>
            </div>
          ),
        },
      ],
    };
  }
  async AcceptCourse(e, id) {
    e.preventDefault();
    await axios.get(URL + "api/Courses/acceptcourse/" + id, {}, config);
    this.props.getApprovedCourse();
    this.props.getPendingCourse();
  }
  async RejectCourse(e, id) {
    e.preventDefault();
    await axios.delete(URL + "api/Courses/delete/" + id, {}, config);
    this.props.getApprovedCourse();
    this.props.getPendingCourse();
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  componentDidMount() {
    this.props.getApprovedCourse();
    this.props.getPendingCourse();
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>
              <IntlMessages id="admin.managecourse" />
            </h1>
            <Card id="rest">
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
                      to="#"
                    >
                      <IntlMessages id="admin.coursereq" />
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
                      <IntlMessages id="admin.activeCourses" />
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Colxx xl="1" lg="1" className="mb-4"></Colxx>
                      <Colxx xl="10" lg="12" className="mb-4">
                        <CardTitle>
                          <h2>
                            {" "}
                            <IntlMessages id="admin.courserequest" />
                          </h2>
                        </CardTitle>
                        <br></br>
                        <ReactTable
                          defaultPageSize={6}
                          data={this.props.pendingCourses}
                          columns={this.state.columns}
                          minRows={0}
                          showPageJump={false}
                          showPageSizeOptions={false}
                          PaginationComponent={Pagination}
                        />
                      </Colxx>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      {this.props.activeCourses &&
                        this.props.activeCourses.map((itemData) => {
                          return (
                            <Colxx xxs="12" md="6" lg="4" key={itemData.key}>
                              <UserCardBasic data={itemData} />
                            </Colxx>
                          );
                        })}
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

const mapStateToProps = (state) => {
  const { pendingCourses, activeCourses } = state.course;
  return { pendingCourses, activeCourses };
};
export default injectIntl(
  connect(mapStateToProps, {
    getPendingCourse,
    AcceptCourse,
    getApprovedCourse,
    DeleteCourse,
  })(ProfilePortfolio)
);
