import React, { Component } from "react";
import "react-tagsinput/react-tagsinput.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Card, CardBody, Form, FormGroup, Label } from "reactstrap";
import IntlMessages from "../../util/IntlMessages";
import { Wizard, Steps, Step } from "react-albus";
import { injectIntl } from "react-intl";
import { BottomNavigation } from "../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../components/wizard/TopNavigation";
import { URL, config } from "../../constants/defaultValues";
import axios from "axios";
import { Colxx } from "../../components/CustomBootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Rating from "../../components/Rating";
import { quillFormats, quillModules } from "../../components/editors";
class Basic extends Component {
  constructor(props) {
    super(props);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.topNavClick = this.topNavClick.bind(this);
    this.state = {
      bottomNavHidden: false,
      topNavDisabled: false,
      courserating: 0,
      teacherrating: 0,
      courseReview: "",
      teacherReview: "",
      course: ""
    };
  }

  topNavClick(stepItem, push) {
    if (this.state.topNavDisabled) {
      return;
    }
    push(stepItem.id);
  }

  onClickNext(goToNext, steps, step) {
    step.isDone = true;
    if (steps.length - 2 <= steps.indexOf(step)) {
      this.setState({ bottomNavHidden: true, topNavDisabled: true });
      this.submitReview();
    }
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    goToNext();
  }

  onClickPrev(goToPrev, steps, step) {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  }
  async submitReview() {
    const CourseRate = {};
    let course = this.state.course;
    CourseRate.rating = this.state.courserating;
    CourseRate.student = this.props.user._id;
    CourseRate.review = this.state.courseReview;

    const TeacherRate = {};
    let teacher = this.state.teacher;
    TeacherRate.rating = this.state.teacherrating;

    TeacherRate.review = this.state.teacherReview;

    TeacherRate.student = this.props.user._id;
    const body = JSON.stringify({
      CourseRate,
      TeacherRate,
      course,
      teacher
    });
    await axios.post(URL + "api/subscribe/rate", body, config);
  }

  componentDidMount() {
    this.setState({
      course: this.props.match.params.cid,
      teacher: this.props.match.params.tid
    });
  }
  handleCourse = courseReview => {
    this.setState({ courseReview });
  };
  handleTeacher = teacherReview => {
    this.setState({ teacherReview });
  };
  render() {
    const { messages } = this.props.intl;
    return (
      <Card>
        <CardBody className="wizard wizard-default">
          <Wizard>
            <TopNavigation
              className="justify-content-center"
              disableNav={false}
              topNavClick={this.topNavClick}
            />
            <Steps>
              <Step
                id="step1"
                name={messages["wizard.step-name-1"]}
                desc={messages["wizard.step-revdesc-1"]}
              >
                <div className="wizard-basic-step">
                  <Form>
                    <FormGroup>
                      <Label>
                        <IntlMessages id="rate.course" />
                      </Label>
                      <Colxx xxs="12" sm="6">
                        <Rating
                          total={5}
                          rating={this.state.courserating}
                          onRate={rating => {
                            this.setState({ courserating: rating.rating });
                          }}
                        />
                      </Colxx>
                      <br></br>
                      <br></br>
                      <row>
                        <Label>
                          <IntlMessages id="rate.teacher" />
                        </Label>
                      </row>
                      <Colxx xxs="12" sm="6">
                        <Rating
                          total={5}
                          rating={this.state.teacherrating}
                          onRate={rating => {
                            this.setState({ teacherrating: rating.rating });
                          }}
                        />
                      </Colxx>
                      <br></br>
                      <br></br>
                    </FormGroup>
                  </Form>
                </div>
              </Step>
              <Step
                id="step2"
                name={messages["wizard.step-name-2"]}
                desc={messages["wizard.step-revdesc-2"]}
              >
                <div className="wizard-basic-step">
                  <Form>
                    <FormGroup>
                      <row>
                        <Label>
                          <IntlMessages id="review.course" />
                        </Label>
                      </row>
                      <row>
                        <ReactQuill
                          theme="snow"
                          value={this.state.courseReview}
                          onChange={this.handleCourse}
                          modules={quillModules}
                          formats={quillFormats}
                        />
                      </row>
                      <br></br>
                      <br></br>
                      <row>
                        <Label>
                          <IntlMessages id="review.teacher" />
                        </Label>
                      </row>
                      <row>
                        <ReactQuill
                          theme="snow"
                          value={this.state.teacherReview}
                          onChange={this.handleTeacher}
                          modules={quillModules}
                          formats={quillFormats}
                        />
                      </row>
                    </FormGroup>
                  </Form>
                </div>
              </Step>

              <Step id="step3" hideTopNav={true}>
                <div className="wizard-basic-step text-center">
                  <h2 className="mb-2">
                    <IntlMessages id="wizard.course-thanks" />
                  </h2>
                </div>
              </Step>
            </Steps>
            <BottomNavigation
              onClickNext={this.onClickNext}
              onClickPrev={this.onClickPrev}
              className={
                "justify-content-center " +
                (this.state.bottomNavHidden && "invisible")
              }
              prevLabel={messages["wizard.prev"]}
              nextLabel={messages["wizard.next"]}
            />
          </Wizard>
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return {
    user
  };
};
export default injectIntl(withRouter(connect(mapStateToProps, {})(Basic)));
