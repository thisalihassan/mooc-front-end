import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import {
  Row,
  Nav,
  NavItem,
  Button,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  ButtonDropdown
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { mapOrder } from "../../util/Utils";

import IntlMessages from "../../util/IntlMessages";
import { Colxx } from "../../components/CustomBootstrap";
import QuestionBuilder from "../../containers/Quiz/QuestionBuilder";

import {
  getSurveyDetailItems,
  deleteSurveyQuestion,
  saveSurvey
} from "../../redux/actions";
import SurveyDetailApplicationMenu from "../../containers/Quiz/SurveyDetailApplicationMenu";
import SurveyDetailCard from "../../containers/Quiz/SurveyDetailCard";

const surveyData = [];

class SurveyDetailApp extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.state = {
      activeFirstTab: "1",
      dropdownSplitOpen: false,
      surveyData: surveyData
    };
  }
  componentDidMount() {
    this.props.getSurveyDetailItems();
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab
      });
    }
  }

  toggleSplit() {
    this.setState(prevState => ({
      dropdownSplitOpen: !prevState.dropdownSplitOpen
    }));
  }

  addQuestion() {
    const { survey } = this.props.quiz;

    var nextId = 0;
    if (survey.questions.length > 0) {
      var ordered = survey.questions.slice().sort((a, b) => {
        return a.id < b.id;
      });
      nextId = ordered[0].id + 1;
    }
    const newSurvey = Object.assign({}, survey);
    newSurvey.questions.push({ id: nextId });
    this.props.saveSurvey(newSurvey);
  }

  handleSortChange(order, sortable, evt) {
    const { survey } = this.props.quiz;
    var ordered_array = mapOrder(survey.questions, order, "id");
    this.props.saveSurvey(ordered_array);
  }

  deleteQuestion(id) {
    this.props.deleteSurveyQuestion(id, this.props.quiz.survey);
  }

  render() {
    const { survey, loading } = this.props.quiz;

    return (
      <Fragment>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <h1>
              <i className="simple-icon-refresh heading-icon" />{" "}
              <span className="align-middle d-inline-block pt-1">
                Developer Survey
              </span>
            </h1>
            <div className="float-sm-right mb-2">
              <ButtonDropdown
                className="top-right-button top-right-button-single"
                isOpen={this.state.dropdownSplitOpen}
                toggle={this.toggleSplit}
              >
                <Button outline className="flex-grow-1" size="lg">
                  SAVE
                </Button>
                <DropdownToggle size="lg" className="pr-4 pl-4" caret outline />
                <DropdownMenu right>
                  <DropdownItem header>
                    <IntlMessages id="survey.delete" />
                  </DropdownItem>
                  <DropdownItem disabled>
                    <IntlMessages id="survey.edit" />
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
            {loading ? (
              <Fragment>
                <Nav tabs className="separator-tabs ml-0 mb-5">
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeFirstTab === "1",
                        "nav-link": true
                      })}
                      onClick={() => {
                        this.toggleTab("1");
                      }}
                      to="#"
                    >
                      DETAILS
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeFirstTab === "2",
                        "nav-link": true
                      })}
                      onClick={() => {
                        this.toggleTab("2");
                      }}
                      to="#"
                    >
                      RESULTS
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeFirstTab}>
                  <TabPane tabId="1">
                    <Row>
                      <SurveyDetailCard survey={survey} />

                      <Colxx xxs="12" lg="8">
                        <ul className="list-unstyled mb-4">
                          {survey.questions.map((item, index) => {
                            return (
                              <li data-id={item.id} key={item.id}>
                                <QuestionBuilder
                                  order={index}
                                  {...item}
                                  expanded={!item.title && true}
                                  deleteClick={id => {
                                    this.deleteQuestion(id);
                                  }}
                                />
                              </li>
                            );
                          })}
                        </ul>

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
                      </Colxx>
                    </Row>
                  </TabPane>
                </TabContent>
              </Fragment>
            ) : (
              <div className="loading" />
            )}
          </Colxx>
        </Row>
        <SurveyDetailApplicationMenu />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ quiz }) => {
  return {
    quiz
  };
};
export default connect(mapStateToProps, {
  getSurveyDetailItems,
  deleteSurveyQuestion,
  saveSurvey
})(SurveyDetailApp);
