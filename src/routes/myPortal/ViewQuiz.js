import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Row, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import { Colxx, Separator } from "../../components/CustomBootstrap";
import QuestionBuilder from "../../containers/Quiz/QuestionBuilder";
import {
  getQuizDetail,
  deleteQuizQuestion,
  saveSurvey,
  findSolvedQuiz,
} from "../../redux/actions";
import QuizDetailCard from "../../containers/Quiz/DetailCard";
import axios from "axios";
import { URL, config } from "../../constants/defaultValues";

class SurveyDetailApp extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeFirstTab: "1",
      dropdownSplitOpen: false,
      actions: "",
      firstTime: true,
      runTimes: 2,
      marks: 0,
    };
  }

  componentDidMount() {
    this.props.getQuizDetail(this.props.match.params.id);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.quiz !== prevProps.quiz) {
      this.setState({ marks: this.props.quiz.marks });
    }
  }
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab,
      });
    }
  }
  async setMarks(e) {
    e.preventDefault();
    const marks = this.state.marks;
    const body = JSON.stringify({ marks });
    await axios.post(
      URL + "api/quiz/setMarks/" + this.props.quiz._id,
      body,
      config
    );
    this.props.getQuizDetail(this.props.match.params.id);
  }

  render() {
    let roll = "";
    if (this.props.user) roll = this.props.user.roll.toLowerCase();
    if (this.props.roll === "student") roll = this.props.roll;
    return (
      <Fragment>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <h1>
              <span className="align-middle d-inline-block pt-1">
                {this.props.quiz && this.props.quiz.course.name}
              </span>
            </h1>
            <Separator className="mb-5" />
            <div>
              <Row>
                <table id="quiz">
                  <tr>
                    <td>
                      <Button
                        className="top-right-button top-right-button-single "
                        size="lg"
                        onClick={(e) => this.setMarks(e)}
                      >
                        Mark Quiz
                      </Button>
                    </td>
                    <td>
                      <input
                        type="Number"
                        value={this.state.marks}
                        min="0"
                        onChange={(val) => {
                          this.setState({ marks: val.target.value });
                        }}
                      />
                    </td>
                  </tr>
                </table>
              </Row>
            </div>

            {this.props.loading ? (
              <Fragment>
                <Row>
                  {this.props.user && (
                    <QuizDetailCard
                      quiz={this.props.quiz}
                      user={this.props.user}
                    />
                  )}

                  <Colxx xxs="12" lg="8">
                    <ul className="list-unstyled mb-4">
                      {this.props.quiz ? (
                        this.props.quiz.questions.map((item, index) => {
                          return (
                            <li data-id={item.id} key={item.id}>
                              <QuestionBuilder
                                order={index + 1}
                                {...item}
                                roll="student"
                                answerType={this.props.quiz.autocheck}
                                answers={item.answers}
                                myAnswer={item.myAnswer}
                                expanded={!item.question && true}
                                runTimes={this.state.runTimes}
                              />
                            </li>
                          );
                        })
                      ) : (
                        <div className="loading"></div>
                      )}
                    </ul>
                  </Colxx>
                </Row>
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
  const { quiz, loading } = quizzes;
  const { user } = auth;
  const { allSurveyItems } = quizList;
  return {
    allSurveyItems,
    quizzes,
    quiz,
    loading,
    user,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    getQuizDetail,
    findSolvedQuiz,
    deleteQuizQuestion,
    saveSurvey,
  })(SurveyDetailApp)
);
