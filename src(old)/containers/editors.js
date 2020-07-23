import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx } from "../components/CustomBootstrap";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

export const quillModules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"]
  ]
};

export const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "link"
];

export default class EditorsUi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textQuillStandart: ""
    };
  }

  handleChangeQuillStandart = textQuillStandart => {
    this.setState({ textQuillStandart });
  };

  render() {
    return (
      <Fragment>
        <Row className="mb-4">
          <Colxx xxs="12">
            <ReactQuill
            id="rest"
              theme="snow"
              value={this.state.textQuillStandart}
              onChange={this.handleChangeQuillStandart}
              modules={quillModules}
              formats={quillFormats}
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
