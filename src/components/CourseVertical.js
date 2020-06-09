import React, { Component } from "react";
import { NavLink } from "react-router-dom";
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
                <NavLink
                  to="/app/pages/details"
                  className="d-block position-relative"
                >
                  <img
                    src={course.pic}
                    alt={course.name}
                    className="list-thumbnail border-0"
                  />
                </NavLink>

                <div className="pl-3 pt-2 pr-2 pb-2">
                  <NavLink to="/app/pages/details">
                    <p className="list-item-heading">{course.name}</p>
                    <div className="text-primary text-small font-weight-medium d-none d-sm-block">
                      {moment(course.date).format("YYYY MMM DD")}
                    </div>
                  </NavLink>
                </div>
              </div>
            );
          })}
        </PerfectScrollbar>
      </div>
    );
  }
}
