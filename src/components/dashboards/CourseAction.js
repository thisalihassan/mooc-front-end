import React from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import ReactTable from "react-table";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Pagination from "../DatatablePagination";
import { getPendingCourse } from "../../redux/actions";
import { AcceptCourse, RejectCourse } from "../../redux/actions";
import { NavLink } from "react-router-dom";
class CourseAction extends React.Component {
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
  AcceptCourse(e, id) {
    e.preventDefault();
    this.props.AcceptCourse(id);
    this.props.history.push("/app/admin");
  }
  RejectCourse(e, id) {
    e.preventDefault();
    this.props.RejectCourse(id);
    this.props.history.push("/app/admin");
  }

  componentDidMount() {
    this.props.getPendingCourse();
  }

  render() {
    return (
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
    );
  }
}
const mapStateToProps = state => {
  const { pendingCourses } = state.course;
  return { pendingCourses };
};
export default withRouter(
  connect(mapStateToProps, { getPendingCourse, AcceptCourse, RejectCourse })(
    CourseAction
  )
);
