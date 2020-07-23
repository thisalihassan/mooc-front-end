import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Row,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
import { Colxx } from "../../components/CustomBootstrap";
import QuestionBuilder from "../../containers/Quiz/QuestionBuilder";
import ThumbnailImage from "../../components/cards/ThumbnailImage";
import {
  getQuizDetail,
  deleteQuizQuestion,
  saveSurvey,
  findSolvedQuiz,
} from "../../redux/actions";
import QuizDetailCard from "../../containers/Quiz/DetailCard";
import axios from "axios";
import { URL, config } from "../../constants/defaultValues";
import { socket } from "../../containers/TopNav";
import queryString from "query-string";

let hidden = null;
let visibilityChange = null;
if (typeof document.hidden !== "undefined") {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "hidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "hidden";
  visibilityChange = "webkitvisibilitychange";
}

class QuizViewDetails extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handleWindowClose = this.handleWindowClose.bind(this);
    this.state = {
      activeFirstTab: "1",
      dropdownSplitOpen: false,
      socket: null,
      firstTime: true,
      totalQuestions: [],
      myQuestions: [],
      Questions: [],
      quiz: "",
      course: "",
      isSubmitted: false,
    };
  }

  componentDidUpdate() {
    if (this.props.quizzes.quiz && this.state.firstTime) {
      this.setState({
        firstTime: false,
        totalQuestions: this.props.quizzes.quiz.questions,
      });
    }
  }
  async componentDidMount() {
    window.addEventListener("beforeunload", this.handleWindowClose);
    document.addEventListener(
      visibilityChange,
      this.handleVisibilityChange,
      false
    );
    const values = queryString.parse(this.props.location.search);

    if (values.id) {
      this.props.getQuizDetail(values.id);
      this.checkSubmission(values.id);
    }
    if (values.id && values.cid) {
      this.setState({ course: values.cid, quiz: values.id });
      this.props.findSolvedQuiz(values.cid, values.id);
    }
    if (!this.state.socket) {
      this.state.socket = socket;
    }
  }

  async checkSubmission(id) {
    const quiz = id;
    const body = JSON.stringify({ quiz });
    await axios.post(URL + "api/quiz/isSubmitted", body, config).then((res) => {
      this.setState({ isSubmitted: res.data });
    });
  }
  handleVisibilityChange = () => {
    if (document[hidden]) {
      if (
        !this.state.isSubmitted &&
        this.props.user &&
        this.props.user.roll.toLowerCase() === "student"
      ) {
        this.studentSubmitQuiz();
      }
    }
  };
  handleWindowClose() {
    if (
      !this.state.isSubmitted &&
      this.props.user &&
      this.props.user.roll.toLowerCase() === "student"
    ) {
      this.studentSubmitQuiz();
    }
  }

  componentWillUnmount() {
    if (
      !this.state.isSubmitted &&
      this.props.user &&
      this.props.user.roll.toLowerCase() === "student"
    ) {
      document.removeEventListener(
        visibilityChange,
        this.handleVisibilityChange
      );
      window.removeEventListener("onbeforeunload", this.handleWindowClose);
    }
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab,
      });
    }
  }
  SolvedAnswers(id, qestion, type, answers, myans) {
    this.setState((prevState) => ({
      myQuestions: [
        ...prevState.myQuestions,
        {
          id: id,
          question: qestion,
          answerType: type,
          answers: answers,
          myAnswer: myans,
        },
      ],
    }));
  }

  SaveQuestion(id, qestion, type, answers, myAnswer) {
    if (id > 0) {
      this.setState((prevState) => ({
        Questions: [
          ...prevState.Questions,
          {
            id: id,
            question: qestion,
            answerType: type,
            answers: answers,
            myAnswer: myAnswer,
          },
        ],
      }));
    }
  }
  addQuestion() {
    const { quiz } = this.props.quizzes;
    var nextId = quiz.questions.length;
    const newQuizItem = Object.assign({}, quiz);
    newQuizItem.questions.push({
      id: nextId,
      question: "",
      answerType: quiz.autocheck ? 2 : 1,
      answers: "",
      myAnswer: "",
    });
    this.props.saveSurvey(newQuizItem);
  }
  find(array, title) {
    return array.find((element) => {
      return element.title === title;
    });
  }
  studentSubmitQuiz = async () => {
    let quizzes = this.props.quizzes;
    let getsubmitbutton = document.getElementById("studentSubmit");
    if (getsubmitbutton && quizzes) {
      getsubmitbutton.disabled = true;
      let gettick = document.getElementsByClassName("studentsubmit");
      for (let i = 0; i < gettick.length; i++) {
        gettick[i].click();
      }

      await setTimeout(
        function () {
          console.log("this.state.myQuestions");
        }.bind(this),
        1500
      );
      console.log(this.state.myQuestions);
      const items = this.state.myQuestions;

      let questions = [];
      for (let i = 0; i < items.length; i++) {
        let bool = questions.find((element) => element.id === items[i].id);
        if (!bool) {
          questions.unshift(items[i]);
        }
      }
      const values = queryString.parse(this.props.location.search);
      const quiz = values.id;
      const course = values.cid;
      const title = values.title;
      const autocheck = quizzes.quiz.autocheck;
      let body = JSON.stringify({
        quiz,
        course,
        questions,
        title,
        autocheck,
      });
      axios.post(URL + "api/quiz/studentsubmit", body, config).then((data) => {
        this.props.history.push("/app/profile/profile");
      });
    }
  };

  async submitQuiz(e) {
    e.preventDefault();
    let gettick = document.getElementsByClassName("teachersubmitQuestion");
    for (let i = 0; i < gettick.length; i++) {
      gettick[i].click();
    }

    await setTimeout(
      function () {
        console.log("this.state.myQuestions");
      }.bind(this),
      1500
    );
    const items = this.state.Questions;
    let questions = [];
    for (let i = items.length - 1; i > 0; i--) {
      let bool = questions.find((element) => element.id === items[i].id);
      if (!bool) {
        questions.push(items[i]);
      }
    }
    let bool = questions.find((element) => element.id === items[0].id);
    if (!bool) {
      questions.push(items[0]);
    }
    const id = this.state.quiz;
    let body = JSON.stringify({ questions, id });
    const res = await axios.post(URL + "api/quiz/uploadquiz", body, config);

    const quiz = res.data._id;
    const course = res.data.course._id;
    const user = this.props.user._id;
    const message = `Quiz for ${res.data.course.name} has been added`;
    body = JSON.stringify({ user, course, quiz, message });
    this.state.socket.emit("new_notification", {
      body: body,
      message: message,
      user: user,
      course: course,
      quiz: quiz,
    });
    window.location.reload();
  }

  deleteQuestion(id) {
    this.props.deleteQuizQuestion(id, this.props.quizzes.quiz);
  }
  async deleteStudentQuiz(e, id) {
    await axios.post(URL + "api/quiz/deletequiz/" + id, {}, config);
    await this.props.findSolvedQuiz(this.state.course, this.state.quiz);
  }
  render() {
    const { quiz, loading } = this.props.quizzes;
    let roll;
    if (this.props.user) roll = this.props.user.roll.toLowerCase();
    return (
      <Fragment>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <h1>
              <span className="align-middle d-inline-block pt-1">
                {this.props.quizzes.quiz && this.props.quizzes.quiz.course.name}
              </span>
            </h1>

            {this.props.user &&
              this.props.quizzes &&
              this.props.quizzes.quiz &&
              this.props.quizzes.quiz.user._id === this.props.user._id &&
              roll === "teacher" && (
                <div className="float-sm-right mb-2">
                  <Button
                    className="top-right-button top-right-button-single flex-grow-1"
                    size="lg"
                    onClick={(e) => this.submitQuiz(e)}
                  >
                    UPDATE
                  </Button>
                </div>
              )}
            {this.props.user &&
              this.props.quizzes &&
              this.props.quizzes.quiz &&
              this.props.quizzes.quiz.user._id !== this.props.user._id &&
              !this.state.isSubmitted && (
                <div className="float-sm-right mb-2">
                  <Button
                    outline
                    id="studentSubmit"
                    className="top-right-button top-right-button-single flex-grow-1"
                    size="lg"
                    onClick={this.studentSubmitQuiz}
                  >
                    SUBMIT
                  </Button>
                </div>
              )}
            {loading ? (
              <Fragment>
                {roll === "teacher" && (
                  <Nav tabs className="separator-tabs ml-0 mb-5">
                    <NavItem>
                      <Link
                        className={classnames({
                          active: this.state.activeFirstTab === "1",
                          "nav-link": true,
                        })}
                        onClick={() => {
                          this.toggleTab("1");
                        }}
                        to={`/app/myportal/openquiz/?id=${this.state.quiz}&cid=${this.state.course}`}
                      >
                        DETAILS
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link
                        className={classnames({
                          active: this.state.activeFirstTab === "2",
                          "nav-link": true,
                        })}
                        onClick={() => {
                          this.toggleTab("2");
                        }}
                        to={`/app/myportal/openquiz/?id=${this.state.quiz}&cid=${this.state.course}`}
                      >
                        RESULTS
                      </Link>
                    </NavItem>
                  </Nav>
                )}

                <TabContent activeTab={this.state.activeFirstTab}>
                  <TabPane tabId="1">
                    <Row>
                      {this.props.user && (
                        <QuizDetailCard
                          deleteClick={() => {
                            this.studentSubmitQuiz();
                          }}
                          isSubmitted={!this.state.isSubmitted}
                          user={this.props.user}
                          quiz={quiz}
                        />
                      )}

                      <Colxx xxs="12" lg="8">
                        {roll === "teacher" && (
                          <ul className="list-unstyled mb-4">
                            {quiz.questions.map((item, index) => {
                              return (
                                <li data-id={index} key={index}>
                                  <QuestionBuilder
                                    order={index + 1}
                                    myAnswer={item.myAnswer}
                                    id={index + 1}
                                    question={item.question}
                                    roll="teacher"
                                    answerType={quiz.autocheck}
                                    answers={item.answers}
                                    expanded={!item.question && true}
                                    deleteClick={(id) => {
                                      this.deleteQuestion(id);
                                    }}
                                    submitQuestion={(
                                      id,
                                      qestion,
                                      type,
                                      answers,
                                      myAnswer
                                    ) => {
                                      this.SaveQuestion(
                                        id,
                                        qestion,
                                        type,
                                        answers,
                                        myAnswer
                                      );
                                    }}
                                  />
                                </li>
                              );
                            })}
                          </ul>
                        )}
                        {roll === "student" && (
                          <ul className="list-unstyled mb-4">
                            {this.state.totalQuestions.map((item, index) => {
                              return (
                                <li data-id={item.id} key={index}>
                                  <QuestionBuilder
                                    order={index + 1}
                                    myAnswer={
                                      this.props.quizzes &&
                                      this.props.quizzes.quiz &&
                                      this.props.quizzes.quiz.user._id ===
                                        this.props.user._id &&
                                      item.myAnswer
                                    }
                                    id={index + 1}
                                    question={item.question}
                                    answers={item.answers}
                                    expanded={!item.question && true}
                                    answerType={quiz.autocheck}
                                    roll="student"
                                    submitQuestion={(
                                      id,
                                      qestion,
                                      type,
                                      answers,
                                      myans
                                    ) => {
                                      this.SolvedAnswers(
                                        id,
                                        qestion,
                                        type,
                                        answers,
                                        myans
                                      );
                                    }}
                                  />
                                </li>
                              );
                            })}
                          </ul>
                        )}
                        {quiz && roll === "teacher" && (
                          <div className="text-center">
                            <Button
                              outline
                              color="primary"
                              className="mt-3"
                              onClick={() => this.addQuestion()}
                            >
                              <i className="simple-icon-plus btn-group-icon" />{" "}
                              Add Question
                            </Button>
                          </div>
                        )}
                      </Colxx>
                    </Row>
                  </TabPane>
                  {roll === "teacher" &&
                    this.props.allSurveyItems &&
                    this.props.allSurveyItems.map((item, index) => {
                      return (
                        <TabPane tabId="2">
                          <Colxx xxs="12">
                            <Card
                              className="card d-flex flex-row mb-3"
                              id="rest"
                              id="rest"
                            >
                              <div className="d-flex flex-grow-1 min-width-zero">
                                <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                  <Link
                                    to={`/app/profile/userprofile/?profile=${item.user._id}`}
                                    target="_blank"
                                    className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
                                  >
                                    <ThumbnailImage
                                      rounded
                                      small
                                      src={item.user.avatar}
                                      alt="profile"
                                      className="m-4"
                                    />
                                    <i className="" />
                                    <span className="align-middle d-inline-block">
                                      {item.user.name}
                                    </span>
                                  </Link>
                                  <div>
                                    <Button
                                      outline
                                      color="primary"
                                      className="mt-3"
                                    >
                                      <Link
                                        to={`/app/myportal/viewquiz/${item._id}`}
                                        target="_blank"
                                      >
                                        Open Quiz
                                      </Link>
                                    </Button>
                                    <br></br>
                                    <Button
                                      outline
                                      className="mt-3"
                                      onClick={(e) =>
                                        this.deleteStudentQuiz(e, item._id)
                                      }
                                    >
                                      Delete Quiz
                                    </Button>
                                  </div>
                                </CardBody>
                              </div>
                            </Card>
                          </Colxx>
                        </TabPane>
                      );
                    })}
                </TabContent>
              </Fragment>
            ) : (
              <div className="loading" />
            )}
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ quizzes, quizList, auth }) => {
  const { user } = auth;
  const { allSurveyItems } = quizList;
  return {
    allSurveyItems,
    quizzes,
    user,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    getQuizDetail,
    findSolvedQuiz,
    deleteQuizQuestion,
    saveSurvey,
  })(QuizViewDetails)
);
