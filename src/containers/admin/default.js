import React, { Component, Fragment } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import ReactTable from "react-table";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Pagination from "../../components/DatatablePagination";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/CustomBootstrap";
import RecentOrders from "../../components/dashboards/RecentOrders";
import SalesChartCard from "../../components/dashboards/SalesChartCard";
import WebsiteVisitsChartCard from "../../components/dashboards/WebsiteVisitsChartCard";
import CourseAnalyitcs from "../../components/dashboards/CourseAnalyitcs";
import TopRatedItems from "../../components/dashboards/TopRatedItems";
import { getPendingCourse } from "../../redux/actions";
import { AcceptCourse, DeleteCourse } from "../../redux/actions";
import { NavLink } from "react-router-dom";
class DefaultDashboard extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          Header: "Name",
          accessor: "name",
          Cell: props => (
            <NavLink
              to={"/app/mycourses/courseView/?id=" + props.original._id}
              className="w-40 w-sm-100"
            >
              {props.value}
            </NavLink>
          )
        },
        {
          Header: "Publisher",
          accessor: "publisher",
          Cell: props => (
            <p className="text-muted">{props.original.user.name}</p>
          )
        },
        {
          Header: "Category",
          accessor: "category",
          Cell: props => <p className="text-muted">{props.value}</p>
        },
        {
          Header: "Action",
          accessor: "accept",
          Cell: props => (
            <div>
              <Button outline color="danger" className="icon-button">
                <i
                  className="simple-icon-check"
                  onClick={e => this.AcceptCourse(e, props.original._id)}
                />
              </Button>
              <Button outline className="icon-button">
                <i
                  className="simple-icon-close"
                  onClick={e => this.RejectCourse(e, props.original._id)}
                />
              </Button>
            </div>
          )
        }
      ]
    };
  }

  componentDidMount() {
    this.props.getPendingCourse();
  }
  render() {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            Admin Panel
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx lg="12" xl="6">
            <Row>
              <Colxx md="12" className="mb-4">
                <SalesChartCard />
              </Colxx>
            </Row>
          </Colxx>
          <Colxx lg="12" xl="6" className="mb-4">
            <RecentOrders />
          </Colxx>
        </Row>

        <Row>
          {/* <Colxx xl="6" lg="12" className="mb-4">
            <Calendar/>
          </Colxx> */}
          <Colxx xl="6" lg="12" className="mb-4">
            <Card className="h-100">
              <CardBody>
                <CardTitle>
                  <h2>Course Requests</h2>
                </CardTitle>
                <ReactTable
                  defaultPageSize={6}
                  data={this.props.pendingCourses}
                  columns={this.state.columns}
                  minRows={0}
                  showPageJump={false}
                  showPageSizeOptions={false}
                  PaginationComponent={Pagination}
                />
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xl="6" lg="12" className="mb-4">
            <TopRatedItems />
          </Colxx>
        </Row>

        {/* <Row>
          <Colxx sm="12" lg="4" className="mb-4">
           <ProfileStatuses/>
          </Colxx>
          <Colxx md="6" lg="4" className="mb-4">
            <GradientCardContainer/>
          </Colxx>
          <Colxx md="6" lg="4" className="mb-4">
           <Cakes/>
          </Colxx>
        </Row> */}
        {/* <SortableStaticticsRow messages={messages} /> */}
        <Row>
          <Colxx sm="12" md="6" className="mb-4">
            <WebsiteVisitsChartCard />
          </Colxx>
          <Colxx sm="12" md="6" className="mb-4">
            <CourseAnalyitcs />
          </Colxx>
        </Row>

        {/* <Colxx lg="12" md="6" xl="4">
            <Row>
              <Colxx lg="4" xl="12" className="mb-4">
                <GradientWithRadialProgressCard
                  icon="iconsminds-clock"
                  title={`5 ${messages["dashboards.files"]}`}
                  detail={messages["dashboards.pending-for-print"]}
                  percent={(5 * 100) / 12}
                  progressText="5/12"
                />
              </Colxx>
              <Colxx lg="4" xl="12" className="mb-4">
                <GradientWithRadialProgressCard
                  icon="iconsminds-male"
                  title={`4 ${messages["dashboards.orders"]}`}
                  detail={messages["dashboards.on-approval-process"]}
                  percent={(4 * 100) / 6}
                  progressText="4/6"
                />
              </Colxx>
              <Colxx lg="4" xl="12" className="mb-4">
                <GradientWithRadialProgressCard
                  icon="iconsminds-bell"
                  title={`8 ${messages["dashboards.alerts"]}`}
                  detail={messages["dashboards.waiting-for-notice"]}
                  percent={(8 * 100) / 10}
                  progressText="8/10"
                />
              </Colxx>
            </Row>
          </Colxx> */}
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  const { pendingCourses } = state.course;
  return { pendingCourses };
};
export default injectIntl(
  withRouter(
    connect(mapStateToProps, { getPendingCourse, AcceptCourse, DeleteCourse })(
      DefaultDashboard
    )
  )
);
