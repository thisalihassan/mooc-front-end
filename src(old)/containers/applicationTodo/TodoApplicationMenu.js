import React, { Component } from "react";
import { connect } from "react-redux";
import { NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import ApplicationMenu from "../../components/ApplicationMenu";
import IntlMessages from "../../util/IntlMessages";
import { getAnouncementswithFilter } from "../../redux/actions";
class TodoApplicationMenu extends Component {
  constructor(props) {
    super();
  }
  addFilter(column, value) {
    this.props.getAnouncementswithFilter(column, value);
  }
  render() {
    const { filter } = this.props.todoApp;
    return (
      <ApplicationMenu>
        <PerfectScrollbar
          option={{ suppressScrollX: true, wheelPropagation: false }}
        >
          <div className="p-4">
            <p className="text-muted text-small">
              <IntlMessages id="todo.status" />
            </p>
            <ul className="list-unstyled mb-5">
              <NavItem className={classnames({ active: !filter })}>
                <NavLink to="#" onClick={(e) => this.addFilter("", "")}>
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
                        to="#"
                        onClick={(e) => this.addFilter("course", itemData._id)}
                      >
                        {itemData.name}
                        {/* <span className="float-right">
                          {loading && allSurveyItems.length}
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

const mapStateToProps = ({ todoApp }) => {
  return {
    todoApp,
  };
};
export default connect(mapStateToProps, { getAnouncementswithFilter })(
  TodoApplicationMenu
);
