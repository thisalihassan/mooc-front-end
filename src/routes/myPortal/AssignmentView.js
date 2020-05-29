import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Row, Button, Collapse } from "reactstrap";

import { Colxx, Separator } from "../../components/CustomBootstrap";

import ListItem from "../../containers/Assignment/AssignmentView";
import axios from "axios";
import { URL, config } from "../../constants/defaultValues";
class Assignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayOptionsIsOpen: false,
      submitassignment: [],
      course: ""
    };
  }
  async componentDidMount() {
    let id = this.props.match.params.id;
    if (id) {
      await axios
        .post(URL + "api/assignment/getsubassignment/" + id, {}, config)
        .then(res => {
          this.setState({
            submitassignment: res.data.assign.submitassignment,
            course: res.data.course.name.toUpperCase()
          });
        });
    }
  }

  async downloadFile(name) {
    console.log(name);
    const res = await axios.get(URL + "downloadfile/" + name, {}, config);
    console.log(res.data);
  }
  render() {
    const { submitassignment, course } = this.state;
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <div className="mb-2">
              <h1>{course}</h1>
            </div>

            <div className="mb-2">
              <Collapse
                className="d-md-block"
                isOpen={this.state.displayOptionsIsOpen}
              >
                <div className="d-block mb-2 d-md-inline-block">
                  <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top"></div>
                </div>
              </Collapse>
            </div>
            <Separator className="mb-5" />
            <Row>
              {submitassignment.map(assignment => {
                return (
                  <ListItem
                    key={`item_${assignment._id}`}
                    download={id => {
                      this.downloadFile(id);
                    }}
                    item={assignment}
                  />
                );
              })}
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
