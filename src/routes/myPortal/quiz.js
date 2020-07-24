import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Row, Button, Collapse } from "reactstrap";

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
import { Image } from "react-bootstrap";
import NoQuiz from "./noquiz.svg";
import AddQuiz from "./addquiz.svg";
import { URL, config } from "../../constants/defaultValues";
class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownSplitOpen: false,
      modalOpen: false,
      firstTime: true,
      lastChecked: null,

      listCourse: [],
      title: null,
      course: null,
      autocheck: null,
      marks: null,
      time: null,
    };
  }
  async componentDidMount() {
    this.props.GetSubscription();
    this.props.getmyCourse();
  }
  componentDidUpdate(prevState, prevProps) {
    if (this.props.user && this.state.listCourse.length === 0) {
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

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };
  clearModal = () => {
    this.setState({
      id: null,
      title: null,
      course: null,
      autocheck: null,
      marks: null,
      time: null,
    });
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };
  toggleSplit = () => {
    this.setState((prevState) => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen,
    }));
  };

  async deleteQuiz(id) {
    await axios.post(URL + "api/quiz/deletequiz/" + id, {}, config);

    this.makecoursesList();
    this.props.addQuizToList(
      this.state.listCourse,
      this.props.user.roll.toLowerCase()
    );
  }

  async updateQuiz(id) {
    axios.post(URL + "api/quiz/detailquiz/" + id, {}, config).then((res) => {
      this.setState({
        id: id,
        title: res.data.title,
        marks: res.data.marks,
        autocheck: res.data.autocheck,
        time: res.data.time,
        course: { label: res.data.course.name, value: res.data.course._id },
      });
      this.toggleModal();
    });
  }
  reloadModel() {
    this.makecoursesList();
    this.props.addQuizToList(
      this.state.listCourse,
      this.props.user.roll.toLowerCase()
    );
  }

  render() {
    const { surveyItems, loading } = this.props.quizList;
    const { modalOpen } = this.state;
    return (
      <Fragment>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <table>
              <tr>
                <td>
                  <div className="announcement">
                    <h2>
                      <IntlMessages id="menu.quizes" />
                    </h2>
                  </div>
                </td>
                <td>
                  {this.props.user && this.props.user.roll === "teacher" && (
                    <div className="float-sm-right">
                      <Button
                        size="lg"
                        float="right"
                        onClick={this.toggleModal}
                      >
                        <IntlMessages id="quizes.add-new" />
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            </table>

            <div className="mb-2"></div>
            <Separator className="mb-5" />

            <Row>
              {this.props.user && loading ? (
                surveyItems.length > 0 ? (
                  surveyItems.map((item, index) => {
                    return (
                      <ListItem
                        key={`todo_item_${index}`}
                        item={item}
                        deleteClick={(id) => {
                          this.deleteQuiz(id);
                        }}
                        updateQuiz={(id) => this.updateQuiz(id)}
                        roll={this.props.user.roll}
                      />
                    );
                  })
                ) : (
                  <div class="imgNullContainer h-100 d-flex justify-content-center align-items-center">
                    {this.props.user.roll === "teacher" ? (
                      <Image
                        className="mt-5"
                        style={{ width: "65%" }}
                        src={AddQuiz}
                        alt="Snow"
                      />
                    ) : (
                      <Image
                        className="mt-4"
                        style={{ width: "65%" }}
                        src={NoQuiz}
                        alt="Snow"
                      />
                    )}
                    {this.props.user.roll === "student" ? (
                      <div class="img_centered_c">
                        <h3>You don't have any Quizzes for now</h3>
                      </div>
                    ) : (
                      <div class="img_centered_c">
                        <h3>You can add quiz for your courses here!!</h3>
                      </div>
                    )}
                  </div>
                )
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
              marks={this.state.marks}
              autocheck={this.state.autocheck}
              course={this.state.course}
              reloadModel={(e) => this.reloadModel(e)}
              toggleModal={this.clearModal}
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
