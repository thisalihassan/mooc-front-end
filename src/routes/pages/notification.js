import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardSubtitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Separator, Colxx } from "../../components/CustomBootstrap";
import {
  GetSubscription,
  getmyCourse,
  getNotifications
} from "../../redux/actions";
import moment from "moment";
class NotificationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      firstTime: true,
      listCourse: [],
      loadNotification: true
    };
  }
  makecoursesList() {
    let size;
    if (this.props.user.roll === "teacher") {
      size = this.props.myCourses ? this.props.myCourses.length : 0;
      for (let i = 0; i < size; i++) {
        this.state.listCourse[i] = this.props.myCourses[i]._id;
      }
    } else {
      size = this.props.courses ? this.props.courses.length : 0;
      for (let i = 0; i < size; i++) {
        this.state.listCourse[i] = this.props.courses[i]._id;
      }
    }
    this.props.getNotifications(this.state.listCourse, this.props.user._id);
  }

  componentDidMount() {
    this.props.GetSubscription();
    this.props.getmyCourse();
  }
  componentDidUpdate() {
    if (this.props.notify.length > 0 && this.state.loadNotification) {
      this.setState({
        notifications: this.props.notify,
        loadNotification: false
      });
    }
    if (this.props.user && this.state.listCourse.length == 0) {
      this.makecoursesList();
    }
  }
  notificationsTab(message, date) {
    return (
      <Card className="d-flex flex-row mb-4">
        <div className=" d-flex flex-grow-1 min-width-zero ">
          <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
            <div className="min-width-zero">
              <CardSubtitle className="list-item-heading mb-1 color-theme-1">
                {message}
              </CardSubtitle>
              <CardText className="text-muted text-small mb-2">
                {moment(date).format("LLL")}
              </CardText>
            </div>
          </CardBody>
        </div>
      </Card>
    );
  }
  render() {
    const rowLength = this.state.notifications.length;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" className="mb-4">
            {/* {this.state.searchItem && (
              <h1>{this.state.searchItem.user.name}</h1>
            )} */}

            {this.state.notifications.map((item, i) => {
              let match = true;
              let itself = false;
              if (item.course) {
                match = this.state.listCourse.find(u => u === item.course);
              }
              if (item.user) {
                itself = item.user === this.props.user._id;
              }

              if (match && !itself) {
                return (
                  <div
                    key={i}
                    className={`${rowLength !== i + 1 ? "mb-3" : ""}`}
                  >
                    {item.anouncements && (
                      <Link
                        to="/app/myportal/anouncements"
                        className="w-40 w-sm-100"
                      >
                        {this.notificationsTab(item.message, item.date)}
                      </Link>
                    )}
                    {item.quiz && (
                      <Link to="/app/myportal/quiz" className="w-40 w-sm-100">
                        {this.notificationsTab(item.message, item.date)}
                      </Link>
                    )}
                    {item.assignment && (
                      <Link
                        to="/app/myportal/assignment"
                        className="w-40 w-sm-100"
                      >
                        {this.notificationsTab(item.message, item.date)}
                      </Link>
                    )}
                    {rowLength !== i + 1 && <Separator />}
                  </div>
                );
              }
            })}
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ auth, subscribtion, course, notifications }) => {
  const { notify, loading } = notifications;
  const { user } = auth;
  const { courses } = subscribtion.subscribed;
  const { myCourses } = course;
  return {
    loading,
    notify,
    courses,
    myCourses,
    user
  };
};
export default injectIntl(
  connect(mapStateToProps, { getmyCourse, GetSubscription, getNotifications })(
    NotificationPage
  )
);
