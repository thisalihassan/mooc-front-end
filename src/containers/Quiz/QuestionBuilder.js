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
  Tooltip,
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../components/CustomSelectInput";
import Sortable from "react-sortablejs";
import { connect } from "react-redux";

import { mapOrder } from "../../util/Utils";
import { saveSurvey, saveQuiz } from "../../redux/actions";
const answerTypes = { label: "Text Area", value: "1", id: 1 };
const autocheck = { label: "Radiobutton", value: "2", id: 2 };
class QuestionBuilder extends React.Component {
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
      tooltipOpen1: false,
      tooltipOpen2: false,
      tooltipOpen3: false,
      tooltipOpen4: false,
      tooltipOpen5: false,
      tooltipOpen6: false,
    };
  }
  ToolTiptoggle = () => {
    this.setState((prevState) => ({
      tooltipOpen1: !prevState.tooltipOpen1,
    }));
  };
  ToolTiptoggle2 = () => {
    this.setState((prevState) => ({
      tooltipOpen2: !prevState.tooltipOpen2,
    }));
  };
  ToolTiptoggle3 = () => {
    this.setState((prevState) => ({
      tooltipOpen3: !prevState.tooltipOpen3,
    }));
  };
  ToolTiptoggle4 = () => {
    this.setState((prevState) => ({
      tooltipOpen4: !prevState.tooltipOpen4,
    }));
  };
  ToolTiptoggle5 = () => {
    this.setState((prevState) => ({
      tooltipOpen5: !prevState.tooltipOpen5,
    }));
  };
  ToolTiptoggle6 = () => {
    this.setState((prevState) => ({
      tooltipOpen6: !prevState.tooltipOpen6,
    }));
  };
  deleteClick = () => {
    this.props.deleteClick(this.state.id);
  };
  toggleClick = () => {
    if (this.props.roll === "student") {
      this.setState({ mode: "view-quesiton" });
    }
    this.setState({ collapse: !this.state.collapse });
  };

  submitQuestion(e) {
    console.log(this.state.myAnswer);
    this.setState({ shouldHide: false });
    console.log(this.props.id);
    this.props.submitQuestion(
      this.state.id,
      this.state.question,
      this.state.answerType.id,
      this.state.answers,
      this.state.myAnswer
    );
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
    this.setState({
      answers: [
        ...this.state.answers,
        { id: this.state.answers.length, label: "" },
      ],
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
            type="textarea"
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
                  label={"....." + answer.label}
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
                {this.props.order}
              </span>
              {this.state.question}
            </div>
          </div>

          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            {roll === "teacher" && (
              <Button
                outline
                style={{ background: "white" }}
                id="Tooltip-1"
                color={"theme-3"}
                className="icon-button ml-1 edit-button"
                onClick={this.editClick}
              >
                <Tooltip
                  placement="top"
                  isOpen={this.state.tooltipOpen}
                  target={"Tooltip-1"}
                  toggle={this.ToolTiptoggle}
                >
                  Edit Question
                </Tooltip>
                <i
                  id="in"
                  className="simple-icon-pencil"
                  style={{ color: "red" }}
                />
              </Button>
            )}
            {roll === "teacher" && (
              <Button
                style={{ background: "white" }}
                outline
                id="Tooltip-2"
                color={"theme-3"}
                className="icon-button ml-1 view-button no-border"
                onClick={this.viewClick}
              >
                <Tooltip
                  placement="top"
                  isOpen={this.state.tooltipOpen2}
                  target="Tooltip-2"
                  toggle={this.ToolTiptoggle2}
                >
                  View Question
                </Tooltip>
                <i className="simple-icon-eye" style={{ color: "red" }} />
              </Button>
            )}
            <Button
              style={{ background: "white" }}
              outline
              id="Tooltip-3"
              color={"theme-3"}
              className={`icon-button ml-1 rotate-icon-click ${
                this.state.collapse ? "rotate" : ""
              }`}
              onClick={this.toggleClick}
            >
              <Tooltip
                placement="top"
                isOpen={this.state.tooltipOpen3}
                target={"Tooltip-3"}
                toggle={this.ToolTiptoggle3}
              >
                Collapse/View
              </Tooltip>
              <i className="simple-icon-arrow-down" style={{ color: "red" }} />
            </Button>

            {roll === "teacher" && (
              <Button
                color={"theme-3"}
                style={{ display: "none" }}
                className={"icon ml-1 teachersubmitQuestion"}
                onClick={(e) => this.submitQuestion(e)}
              ></Button>
            )}
            {roll === "student" && (
              <Button
                style={{ background: "white", display: "none" }}
                color={"theme-3"}
                className="icon ml-1 studentsubmit"
                onClick={(e) => this.submitQuestion(e)}
              ></Button>
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
                      </FormGroup>
                    );
                  })}
                </Sortable>

                <div className="text-center">
                  {this.state.answerType && this.state.answerType.id === 2 && (
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
})(QuestionBuilder);
