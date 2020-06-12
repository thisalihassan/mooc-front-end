import React from "react";
import {
  Card,
  Button,
  Collapse,
  FormGroup,
  Label,
  Form,
  Input,
  Badge,
  CustomInput,
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../components/CustomSelectInput";
import Sortable from "react-sortablejs";
import { connect } from "react-redux";

import { mapOrder } from "../../util/Utils";
import { saveSurvey, saveQuiz } from "../../redux/actions";
const answerTypes = [
  { label: "Text Area", value: "1", id: 1 },
  { label: "Radiobutton", value: "2", id: 2 },
];
const autocheck = { label: "Radiobutton", value: "2", id: 2 };
class SurveyQuestionBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: this.props.expanded || false,
      mode: "edit-quesiton",
      id: this.props.id,
      question: this.props.question || "",
      answerType: this.props.answerType ? autocheck : answerTypes,
      answers: this.props.answers || [],
      shouldHide: true,
      myAnswer: this.props.myAnswer || "",
    };
  }
  deleteClick = () => {
    this.props.deleteClick(this.state.id);
  };
  toggleClick = () => {
    if (this.props.roll === "student") {
      this.setState({ mode: "view-quesiton" });
    }
    this.setState({ collapse: !this.state.collapse });
  };

  submitQuestion() {
    console.log(this.state.myAnswer);
    this.setState({ shouldHide: false });
    for (let i = 0; i < this.props.runTimes; i++) {
      this.props.submitQuestion(
        this.state.id,
        this.state.question,
        this.state.answerType.id,
        this.state.answers,
        this.state.myAnswer
      );
    }
  }

  editClick = () => {
    this.setState({ mode: "edit-quesiton" });
    this.setState({ collapse: true });
  };
  viewClick = () => {
    this.setState({ mode: "view-quesiton" });
    this.setState({ collapse: true });
  };
  typeChange = (answerType) => {
    if (this.state.answerType) {
      if (
        (this.state.answerType.id === 2 || this.state.answerType.id === 3) &&
        answerType.id === 1
      ) {
        this.setState({ answers: [] });
      }
    }
    this.setState({ answerType });
  };
  removeAnswer = (answerId) => {
    this.setState({
      answers: this.state.answers.filter((item) => item.id !== answerId),
    });
  };
  addAnswer = () => {
    var nextId = 0;
    if (this.state.answers.length > 0) {
      var orderedAnswers = this.state.answers.slice().sort((a, b) => {
        return a.id < b.id;
      });
      nextId = orderedAnswers[0].id + 1;
    }
    this.setState({
      answers: [...this.state.answers, { id: nextId, label: "" }],
    });
  };

  updateAnswer = (answerId, event) => {
    var answerIndex = this.state.answers.findIndex(
      (item) => item.id === answerId
    );
    var answers = this.state.answers;
    answers[answerIndex]["label"] = event.target.value;
    this.setState({
      answers,
    });
  };

  renderViewModeAnswers = () => {
    if (!this.state.answerType) {
      return;
    }
    switch (this.state.answerType.id) {
      case 1:
        return (
          <Input
            type="text"
            value={this.state.myAnswer}
            onChange={(val) => {
              this.setState({ myAnswer: val.target.value });
            }}
          />
        );
      case 2:
        return (
          <FormGroup>
            {this.state.answers.map((answer) => {
              return (
                <CustomInput
                  key={answer.id}
                  type="radio"
                  checked={answer.label === this.state.myAnswer}
                  onChange={(val) => {
                    this.setState({ myAnswer: answer.label });
                  }}
                  name={`radio${this.state.id}`}
                  id={`radio${this.state.id}_${answer.id}`}
                  label={answer.label}
                />
              );
            })}
          </FormGroup>
        );
      default:
        return (
          <Input
            type="text"
            placeholder=""
            value={this.state.myAnswer}
            onChange={(val) => {
              this.setState({ myAnswer: val.target.value });
            }}
          />
        );
    }
  };
  render() {
    const roll = this.props.roll.toLowerCase();
    return (
      <Card id="rest" className={`question d-flex mb-4 ${this.state.mode}`}>
        <div className="d-flex flex-grow-1 min-width-zero">
          <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
              <span className="heading-number d-inline-block">
                {this.props.order + 1}
              </span>
              {this.state.question}
            </div>
          </div>

          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            {roll === "teacher" && (
              <Button
                outline
                color={"theme-3"}
                className="icon-button ml-1 edit-button"
                onClick={this.editClick}
              >
                <i id="in" className="simple-icon-pencil" />
              </Button>
            )}
            {roll === "teacher" && (
              <Button
                outline
                color={"theme-3"}
                className="icon-button ml-1 view-button no-border"
                onClick={this.viewClick}
              >
                <i className="simple-icon-eye" />
              </Button>
            )}
            <Button
              outline
              color={"theme-3"}
              className={`icon-button ml-1 rotate-icon-click ${
                this.state.collapse ? "rotate" : ""
              }`}
              onClick={this.toggleClick}
            >
              <i className="simple-icon-arrow-down" />
            </Button>

            {roll === "teacher" && (
              <Button
                outline
                color={"theme-3"}
                className="icon-button ml-1"
                onClick={this.deleteClick}
              >
                <i className="simple-icon-ban" />
              </Button>
            )}
            {roll === "teacher" && (
              <Button
                outline
                color={"theme-3"}
                style={this.state.shouldHide ? {} : { display: "none" }}
                className={"icon-button ml-1"}
                onClick={() => this.submitQuestion()}
              >
                <i className="simple-icon-check" />
              </Button>
            )}
            {roll === "student" && (
              <Button
                outline
                color={"theme-3"}
                className="icon-button ml-1"
                onClick={() => this.submitQuestion()}
              >
                <i className="simple-icon-check" />
              </Button>
            )}
          </div>
        </div>

        <Collapse isOpen={this.state.collapse}>
          <div className="card-body pt-0">
            <div className="edit-mode">
              <Form>
                <FormGroup>
                  <Label>Question</Label>
                  <Input
                    type="text"
                    value={this.state.question}
                    onChange={(event) => {
                      this.setState({ question: event.target.value });
                    }}
                  />
                </FormGroup>
                <div className="separator mb-4 mt-4" />

                {!this.props.answerType && (
                  <FormGroup>
                    <Label>Answer Type</Label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={this.state.answerType}
                      onChange={this.typeChange}
                      options={answerTypes}
                    />
                  </FormGroup>
                )}
                {this.state.answers.length > 0 && <Label>Answers</Label>}

                <Sortable
                  className="answers"
                  options={{
                    handle: ".handle",
                  }}
                  onChange={(order, sortable, evt) => {
                    var answers = mapOrder(this.state.answers, order, "id");
                    this.setState({ answers });
                  }}
                >
                  {this.state.answers.map((item) => {
                    return (
                      <FormGroup
                        data-id={item.id}
                        key={item.id}
                        className="mb-1"
                      >
                        <Input
                          type="text"
                          value={item.label}
                          autoFocus
                          onChange={(event) => {
                            this.updateAnswer(item.id, event);
                          }}
                        />
                        <div className="input-icons">
                          <Badge className="handle" color="empty" pill>
                            <i className="simple-icon-cursor-move" />
                          </Badge>
                          <Badge
                            color="empty"
                            pill
                            onClick={() => this.removeAnswer(item.id)}
                          >
                            <i className="simple-icon-close" />
                          </Badge>
                        </div>
                      </FormGroup>
                    );
                  })}
                </Sortable>

                <div className="text-center">
                  {this.state.answerType && this.state.answerType.id !== 1 && (
                    <Button className="mt-3" onClick={() => this.addAnswer()}>
                      <i className="simple-icon-plus btn-group-icon" /> Add
                      Answer
                    </Button>
                  )}
                </div>
              </Form>
            </div>
            <div className="view-mode">
              <FormGroup>
                <Label>{this.state.question}</Label>
                {this.renderViewModeAnswers()}
              </FormGroup>
            </div>
          </div>
        </Collapse>
      </Card>
    );
  }
}
const mapStateToProps = ({ quiz }) => {
  return {
    quiz,
  };
};
export default connect(mapStateToProps, {
  saveSurvey,
  saveQuiz,
})(SurveyQuestionBuilder);
