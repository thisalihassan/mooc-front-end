import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Row, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import { Colxx } from "../../components/CustomBootstrap";
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
    console.log(this.props.quizzes.quiz._id);
    await axios.post(
      URL + "api/quiz/setMarks/" + this.props.quizzes.quiz._id,
      body,
      config
    );
    this.props.getQuizDetail(this.props.match.params.id);
  }

  render() {
    const { quiz, loading } = this.props.quizzes;
    let roll;
    if (this.props.user) roll = this.props.user.roll.toLowerCase();
    if (this.props.roll === "student") roll = this.props.roll;
    return (
      <Fragment>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <h1>
              <span className="align-middle d-inline-block pt-1">
                {quiz && quiz.course.name}
              </span>
            </h1>
            <div className="float-sm-right mb-2">
              <Button
                outline
                className="top-right-button top-right-button-single flex-grow-1"
                size="lg"
                onClick={(e) => this.setMarks(e)}
              >
                > Mark Quiz
              </Button>
            </div>
            <div className="mb-2">
              <input
                type="Number"
                value={this.state.marks}
                min="0"
                onChange={(val) => {
                  this.setState({ marks: val.target.value });
                }}
              />
            </div>
            {loading ? (
              <Fragment>
                <Row>
                  {this.props.user && (
                    <QuizDetailCard quiz={quiz} user={this.props.user} />
                  )}

                  <Colxx xxs="12" lg="8">
                    <ul className="list-unstyled mb-4">
                      {quiz &&
                        quiz.questions.map((item, index) => {
                          return (
                            <li data-id={item.id} key={item.id}>
                              <QuestionBuilder
                                order={index}
                                {...item}
                                roll="student"
                                answers={item.answers}
                                myAnswer={item.myAnswer}
                                expanded={!item.question && true}
                                runTimes={this.state.runTimes}
                              />
                            </li>
                          );
                        })}
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
  })(SurveyDetailApp)
);
