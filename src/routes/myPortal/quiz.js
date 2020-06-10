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
  addQuizToList,
  getSurveyListWithOrder,
  getSurveyListSearch,
  getmyCourse,
  GetSubscription,
  selectedSurveyItemsChange,
} from "../../redux/actions";

import ListItem from "../../containers/Quiz/ListItem";
import AddNewModal from "../../containers/Quiz/AddNewModel";
import ApplicationMenu from "../../containers/Quiz/ApplicationMenu";
import axios from "axios";
import { URL, config } from "../../constants/defaultValues";
import queryString from "query-string";
class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownSplitOpen: false,
      modalOpen: false,
      firstTime: true,
      lastChecked: null,
      displayOptionsIsOpen: false,
      listCourse: [],
      title: null,
      course: null,
      autocheck: false,
      time: 1,
    };
  }
  async componentDidMount() {
    this.props.GetSubscription();
    this.props.getmyCourse();
    const values = queryString.parse(this.props.location.search);
    if (values.id) {
      await axios
        .post(URL + "api/quiz/detailquiz/" + values.id, {}, config)
        .then((res) => {
          this.props.history.push("/app/myportal/quiz");
          this.setState({
            id: values.id,
            title: res.data.title,
            autocheck: res.data.autocheck,
            time: res.data.time,
            course: { label: res.data.course.name, value: res.data.course._id },
          });

          this.toggleModal();
        });
    }
  }
  componentDidUpdate(prevState, prevProps) {
    if (this.props.user && this.state.listCourse.length == 0) {
      this.makecoursesList();
      this.props.addQuizToList(
        this.state.listCourse,
        this.props.user.roll.toLowerCase()
      );
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

  toggleSplit = () => {
    this.setState((prevState) => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen,
    }));
  };

  changeOrderBy = (column) => {
    this.props.getSurveyListWithOrder(column);
  };

  async deleteQuiz(id) {
    await axios
      .post(URL + "api/quiz/deletequiz/" + id, {}, config)
      .then(this.props.history.push("/app/myportal/quiz"));
    window.location.reload();
  }
  reloadModel() {
    this.props.history.push("/app/myportal/quiz");
    window.location.reload();
  }

  render() {
    const {
      surveyItems,
      loading,
      orderColumn,
      orderColumns,
      selectedItems,
    } = this.props.quizList;
    const { messages } = this.props.intl;
    const { modalOpen } = this.state;
    return (
      <Fragment>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <div className="mb-2">
              <h1>
                <IntlMessages id="menu.quizes" />
              </h1>

              {this.props.user && this.props.user.roll === "teacher" && (
                <div className="float-sm-right">
                  <Button
                    
                    size="lg"
                    className="top-right-button mr-1"
                    onClick={this.toggleModal}
                  >
                    <IntlMessages id="quizes.add-new" />
                  </Button>
                </div>
              )}
            </div>

            <div className="mb-2">
              <Button
               
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
                </div>
              </Collapse>
            </div>
            <Separator className="mb-5" />
            <Row>
              {surveyItems ? (
                surveyItems.map((item, index) => {
                  return (
                    <ListItem
                      key={`todo_item_${index}`}
                      item={item}
                      deleteClick={(id) => {
                        this.deleteQuiz(id);
                      }}
                      roll={this.props.user.roll}
                    />
                  );
                })
              ) : (
                <div className="loading"></div>
              )}
            </Row>
          </Colxx>
        </Row>

        {this.props.user && this.props.user.roll === "teacher" ? (
          <div>
            <ApplicationMenu courses={this.props.myCourses} />
            <AddNewModal
              id={this.state.id}
              title={this.state.title}
              time={this.state.time}
              autocheck={this.state.autocheck}
              course={this.state.course}
              reloadModel={(e) => this.reloadModel(e)}
              toggleModal={this.toggleModal}
              modalOpen={modalOpen}
              courses={this.props.myCourses}
            />
          </div>
        ) : (
          this.props.courses && <ApplicationMenu courses={this.props.courses} />
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = ({ quizList, auth, course, subscribtion }) => {
  const { user } = auth;
  const { courses } = subscribtion.subscribed;
  const { myCourses } = course;
  return {
    courses,
    myCourses,
    user,
    quizList,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    addQuizToList,
    getSurveyListWithOrder,
    getSurveyListSearch,
    selectedSurveyItemsChange,
    getmyCourse,
    GetSubscription,
  })(Quiz)
);
