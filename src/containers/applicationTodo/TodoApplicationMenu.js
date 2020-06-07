import React, { Component } from "react";
import { connect } from "react-redux";
import { NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import ApplicationMenu from "../../components/ApplicationMenu";
import IntlMessages from "../../util/IntlMessages";
// import { getQuizListWithFilter } from "../../redux/actions";
class TodoApplicationMenu extends Component {
  constructor(props) {
    super();
  }
  // addFilter(column, value) {
  //   this.props.getQuizListWithFilter(column, value);
  // }
  render() {
    const { allTodoItems, loading } = this.props.todoApp;
    const { allSurveyItems } = this.props.quizList;
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
              {this.props.courses &&
                this.props.courses.map(itemData => {
                  return (
                    <NavItem>
                      <NavLink to="#">
                        <i className="simple-icon-reload" />
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

const mapStateToProps = ({ todoApp, quizList }) => {
  return {
    todoApp,
    quizList
  };
};
export default connect(mapStateToProps, {})(TodoApplicationMenu);
