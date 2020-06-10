import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Collapse,
} from "reactstrap";

import IntlMessages from "../../util/IntlMessages";
import { Colxx, Separator } from "../../components/CustomBootstrap";

import {
  getSurveyListWithOrder,
  getSurveyListSearch,
  getmyCourse,
  GetSubscription,
  getAssignments,
} from "../../redux/actions";

import ListItem from "../../containers/Assignment/ListItem";
import AddNewModel from "../../containers/Assignment/AddNewModel";
import ApplicationMenu from "../../containers/Assignment/ApplicationMenu";
import axios from "axios";
import queryString from "query-string";
import { URL, config } from "../../constants/defaultValues";
class Assignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      firstTime: true,
      lastChecked: null,
      displayOptionsIsOpen: false,
      listCourse: [],
      id: null,
      file: null,
      title: null,
      duedate: null,
      course: null,
    };
  }
  async componentDidMount() {
    this.props.GetSubscription();
    this.props.getmyCourse();
    const values = queryString.parse(this.props.location.search);
    if (values.id) {
      await axios
        .post(URL + "api/assignment/getassignment/" + values.id, {}, config)
        .then((res) => {
          this.setState({
            id: values.id,
            file: res.data.assignment[0].file,
            title: res.data.assignment[0].title,
            duedate: res.data.assignment[0].duedate,
            course: { label: res.data.course.name, value: res.data.course._id },
          });
          this.toggleModal();
        });
    }
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.props.user && this.state.listCourse.length == 0) {
      this.makecoursesList();
      this.props.getAssignments(this.state.listCourse, this.props.user);
    }
  }

  makecoursesList() {
    if (this.props.user.roll === "teacher") {
      const size = this.props.myCourses ? this.props.myCourses.length : 0;
      for (let i = 0; i < size; i++) {
        this.state.listCourse[i] = this.props.myCourses[i]._id;
      }
    } else {
      const size = this.props.courses ? this.props.courses.length : 0;
      for (let i = 0; i < size; i++) {
        this.state.listCourse[i] = this.props.courses[i]._id;
      }
    }
  }
  toggleDisplayOptions = () => {
    this.setState({ displayOptionsIsOpen: !this.state.displayOptionsIsOpen });
  };

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };

  changeOrderBy = (column) => {
    this.props.getSurveyListWithOrder(column);
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.props.getSurveyListSearch(e.target.value);
    }
  };
  reloadModel(e) {
    this.props.history.push("/app/myportal/assignment");
    window.location.reload();
  }

  async deleteAssignment(id) {
    await axios
      .post(URL + "api/assignment/remove/" + id, {}, config)
      .then(this.props.history.push("/app/myportal/assignment"));
    window.location.reload();
  }
  render() {
    const { orderColumn, orderColumns } = this.props.quizList;
    const { selectedassignments } = this.props.assignment;
    const { messages } = this.props.intl;
    const { modalOpen } = this.state;
    return (
      <Fragment>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <div className="mb-2">
              <h1>
                <IntlMessages id="menu.assignment" />
              </h1>

              {this.props.user && this.props.user.roll === "teacher" && (
                <div className="float-sm-right">
                  <Button
                    
                    size="lg"
                    className="top-right-button mr-1"
                    onClick={this.toggleModal}
                  >
                    <IntlMessages id="assignment.add-new" />
                  </Button>
                </div>
              )}
            </div>

            <div className="mb-2">
              <Button
                color="empty"
                id="displayOptions"
                className="pt-0 pl-0 d-inline-block d-md-none"
                onClick={this.toggleDisplayOptions}
              >
                <IntlMessages id="survey.display-options" />{" "}
                <i className="simple-icon-arrow-down align-middle" />
              </Button>

              <Collapse
                className="d-md-block"
                isOpen={this.state.displayOptionsIsOpen}
              >
                <div className="d-block mb-2 d-md-inline-block">
                  <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                    <DropdownToggle caret color="outline-dark" size="xs">
                      <IntlMessages id="quizes.orderby" />
                      {orderColumn ? orderColumn.label : ""}
                    </DropdownToggle>
                    <DropdownMenu>
                      {orderColumns.map((o, index) => {
                        return (
                          <DropdownItem
                            key={index}
                            onClick={() => this.changeOrderBy(o.column)}
                          >
                            {o.label}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                    <input
                      type="text"
                      name="keyword"
                      id="search"
                      placeholder={messages["menu.search"]}
                      onKeyPress={(e) => this.handleKeyPress(e)}
                    />
                  </div>
                </div>
              </Collapse>
            </div>
            <Separator className="mb-5" />
            <Row>
              {selectedassignments &&
                selectedassignments.map((item, index) => {
                  const name = item.course.name;
                  {
                    return item.assignment.map((n, k) => {
                      return (
                        <ListItem
                          key={`todo_item_${n._id}`}
                          item={n}
                          name={name}
                          roll={this.props.user.roll}
                          reloadModel={(e) => this.reloadModel(e)}
                        />
                      );
                    });
                  }
                })}
            </Row>
          </Colxx>
        </Row>

        {this.props.user && this.props.user.roll === "teacher" ? (
          <div>
            <ApplicationMenu courses={this.props.myCourses} />
            <AddNewModel
              id={this.state.id}
              title={this.state.title}
              duedate={this.state.duedate}
              course={this.state.course}
              reloadModel={(e) => this.reloadModel(e)}
              toggleModal={this.toggleModal}
              modalOpen={modalOpen}
              courses={this.props.myCourses && this.props.myCourses}
            />
          </div>
        ) : (
          this.props.courses && <ApplicationMenu courses={this.props.courses} />
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = ({
  quizList,
  assignment,
  auth,
  course,
  subscribtion,
}) => {
  const { user } = auth;
  const { courses } = subscribtion.subscribed;
  const { myCourses } = course;
  return {
    courses,
    myCourses,
    user,
    assignment,
    quizList,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getSurveyListWithOrder,
    getSurveyListSearch,
    getmyCourse,
    GetSubscription,
    getAssignments,
  })(Assignment)
);
