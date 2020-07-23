import React, { Component } from "react";
import { connect } from "react-redux";
import { NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";

import IntlMessages from "../../util/IntlMessages";
import ApplicationMenu from "../../components/ApplicationMenu";

import { getAssignmentswithFilter } from "../../redux/actions";
export class MyApplicationMenu extends Component {
  constructor(props) {
    super();
  }

  addFilter(column, value) {
    this.props.getAssignmentswithFilter(column, value);
  }
  render() {
    const { filter } = this.props.assignment;
    return (
      <ApplicationMenu>
        <PerfectScrollbar
          option={{ suppressScrollX: true, wheelPropagation: false }}
        >
          <div className="p-4">
            <p className="text-muted text-small">
              <IntlMessages id="quizes.status" />
              Status
            </p>
            <ul className="list-unstyled mb-5">
              <NavItem className={classnames({ active: !filter })}>
                <NavLink id="filter" to="#" onClick={(e) => this.addFilter("", "")}>
                  All Items
                </NavLink>
              </NavItem>
              {this.props.courses &&
                this.props.courses.map((itemData) => {
                  let match;
                  if (filter) match = filter.value === itemData._id;
                  return (
                    <NavItem className={classnames({ active: match })}>
                      <NavLink
                      id="filter"
                        to="#"
                        onClick={(e) => this.addFilter("course", itemData._id)}
                      >
                        {itemData.name}
                        {/* <span className="float-right">
                          {loading && assignments.length}
                        </span> */}
                      </NavLink>
                    </NavItem>
                  );
                })}
            </ul>
          </div>
        </PerfectScrollbar>
      </ApplicationMenu>
    );
  }
}
const mapStateToProps = ({ assignment }) => {
  return {
    assignment,
  };
};
export default connect(mapStateToProps, {
  getAssignmentswithFilter,
})(MyApplicationMenu);
