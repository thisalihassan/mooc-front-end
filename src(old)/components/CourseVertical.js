import React, { Component } from "react";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment";
export default class CourseVertical extends Component {
  render() {
    return (
      <div className="scroll dashboard-list-with-thumbs">
        <PerfectScrollbar
          options={{ suppressScrollX: true, wheelPropagation: false }}
        >
          {this.props.courses.map((course, index) => {
            return (
              <div key={index} className="d-flex flex-row mb-3">
                <Link
                  to={"/app/mycourses/courseView/?id=" + course._id}
                  className="d-block position-relative"
                  target="_blank"
                >
                  <img
                    src={course.pic}
                    alt={course.name}
                    className="list-thumbnail border-0"
                  />
                </Link>

                <div className="pl-3 pt-2 pr-2 pb-2">
                  <Link
                    to={"/app/mycourses/courseView/?id=" + course._id}
                    target="_blank"
                  >
                    <p className="list-item-heading">{course.name}</p>
                    <div className="text-primary text-small font-weight-medium d-none d-sm-block">
                      {moment(course.date).format("YYYY MMM DD")}
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </PerfectScrollbar>
      </div>
    );
  }
}
