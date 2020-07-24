import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/CustomBootstrap";
import ListItem from "../../containers/Assignment/AssignmentView";
import axios from "axios";
import { Image } from "react-bootstrap";
import AddAssingment from "./addassignment.svg";
import { URL, config } from "../../constants/defaultValues";
class Assignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayOptionsIsOpen: false,
      submitassignment: [],
      course: "",
      title: "",
    };
  }
  async componentDidMount() {
    let id = this.props.match.params.id;
    if (id) {
      await axios
        .post(URL + "api/assignment/getsubassignment/" + id, {}, config)
        .then((res) => {
          console.log(res.data);
          this.setState({
            title: res.data.assignn.assignment[0].title,
            submitassignment: res.data.assign.submitassignment,
            course: res.data.course.name.toUpperCase(),
          });
        });
    }
  }
  render() {
    const { submitassignment, course, title } = this.state;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <div className="mb-2 text-center">
              <h2>{course}</h2>
            </div>
            <Separator className="mb-2" />
            <div className="mb-3 mt-3">
              <h3>{title.toUpperCase()}</h3>
            </div>
            <Row>
              {submitassignment ? (
                submitassignment.length > 0 ? (
                  submitassignment.map((assignment) => {
                    return (
                      <ListItem
                        key={`item_${assignment._id}`}
                        item={assignment}
                      />
                    );
                  })
                ) : (
                  <div class="imgNullContainer h-100 w-100 d-flex justify-content-center align-items-center">
                    <Image
                      className="mt-5"
                      style={{ width: "35%" }}
                      src={AddAssingment}
                      alt="Snow"
                    />
                    <div class="img_centered_c mt-2">
                      <h6>
                        None of the students have submitted this assignment
                        yet!!
                      </h6>
                    </div>
                  </div>
                )
              ) : (
                <div className="loading"></div>
              )}
            </Row>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ quizList }) => {
  return { quizList };
};
export default injectIntl(connect(mapStateToProps, {})(Assignment));
