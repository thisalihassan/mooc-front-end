import React, { Component } from "react";
import { Card, CardBody, Badge } from "reactstrap";
import { Colxx } from "../../components/CustomBootstrap";
import ReactCountdownClock from "react-countdown-clock";
class DetailCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  deleteClick = () => {
    this.props.deleteClick(this.state.id);
  };
  render() {
    return (
      <Colxx xxs="12" lg="4" className="mb-4">
        <Card className="mb-4">
          {this.props.isSubmitted &&
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
            </CardBody>
          ) : (
            <CardBody>
              <p className="text-muted text-small mb-2">Name</p>
              <p className="mb-3">{"Quiz by " + this.props.quiz.user.name}</p>

              <p className="text-muted text-small mb-2">Course</p>
              <p className="mb-3">{this.props.quiz.course.name}</p>
            </CardBody>
          )}
        </Card>
      </Colxx>
    );
  }
}

export default DetailCard;
