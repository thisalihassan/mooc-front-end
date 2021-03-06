import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import { Colxx } from "../../components/CustomBootstrap";
import ReactCountdownClock from "react-countdown-clock";
class DetailCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  deleteClick = () => {
    this.props.deleteClick();
  };
  render() {
    return (
      <Colxx xxs="12" lg="4" className="mb-4">
        <Card className="mb-4" id="rest">
          {this.props.isSubmitted &&
          this.props.quiz &&
          this.props.user._id !== this.props.quiz.user._id ? (
            <CardBody>
              <p className="text-muted text-small mb-2">Quiz</p>
              <p className="mb-3">{this.props.quiz.title}</p>
              <p className="text-muted text-small mb-2">Time</p>
              <p className="mb-3">
                <ReactCountdownClock
                  seconds={this.props.quiz.time * 60}
                  color="#000"
                  alpha={0.9}
                  size={100}
                  onComplete={this.deleteClick}
                />
              </p>
              <p className="text-muted text-small mb-2">Instructions</p>
              <p className="mb-3">
                Closing Quiz Tab or minimizing the window will auto submit the
                Quiz
              </p>
              <p className="mb-3">
                Please click on <i className="simple-icon-check" /> after
                complete your Question or Change your answer
              </p>
            </CardBody>
          ) : (
            <CardBody>
              <p className="text-muted text-small mb-2">Name</p>
              <p className="mb-3">{"Quiz by " + this.props.quiz.user.name}</p>
              <p className="text-muted text-small mb-2">Course</p>
              <p className="mb-3">{this.props.quiz.course.name}</p>
              <p className="text-muted text-small mb-2">Marks</p>
              {this.props.quiz.quiz ? (
                <p className="mb-3">
                  {this.props.quiz.marks} out of {this.props.quiz.quiz.marks}
                </p>
              ) : (
                <p className="mb-3">out of {this.props.quiz.marks}</p>
              )}
              <p className="text-muted text-small mb-2">Instructions</p>
              <p className="mb-3">
                Closing Quiz Tab or minimizing the window will auto submit the
                Quiz
              </p>
              <p className="mb-3">
                Please click on <i className="simple-icon-check" /> after you
                complete the Question
              </p>
            </CardBody>
          )}
        </Card>
      </Colxx>
    );
  }
}

export default DetailCard;
