import React, { Component } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import "./basic.css";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  CustomInput,
} from "reactstrap";
import IntlMessages from "../../util/IntlMessages";
import { Wizard, Steps, Step } from "react-albus";
import { injectIntl } from "react-intl";
import { BottomNavigation } from "../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../components/wizard/TopNavigation";
import queryString from "query-string";
import { URL, config } from "../../constants/defaultValues";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { quillFormats, quillModules } from "../editors";
import Select from "react-select";
const options = [
  { value: "Business", label: "Business", id: 0 },
  { value: "Design", label: "Design", id: 1 },
  { value: "Music", label: "Music", id: 2 },
  { value: "Photography", label: "Photography", id: 3 },
  {
    value: "Programming and Development",
    label: "Programming and Development",
    id: 4,
  },
  { value: "Data Science", label: "Data Science", id: 5 },
  { value: "Artificial Intelligence", label: "Artificial Intelligence", id: 6 },
  { value: "Accounting", label: "Accounting", id: 7 },
  { value: "IT and Software", label: "IT and Software", id: 8 },
];

export class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.topNavClick = this.topNavClick.bind(this);
    this.state = {
      name: "",
      pic: "",
      category: options[0],
      tags: [],
      importance: "",
      preReq: "",
      outcome: "",
      content: "",
      id: "",
      bottomNavHidden: false,
      topNavDisabled: false,
      upload: false,
    };
  }
  onChangeHandler = (event) => {
    this.setState({ pic: event.target.files[0] });
  };
  async uploadPic() {
    try {
      const file = new FormData();
      file.append("file", this.state.pic);
      const configg = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const res = await axios.post(URL + "coursepic", file, configg);
      console.log(res.data);
      this.setState({ upload: false, pic: res.data });
    } catch (error) {}
  }
  async RegisterCourse() {
    const name = this.state.name;
    const pic = this.state.pic;
    const tags = this.state.tags;
    const importance = this.state.importance;
    const preReq = this.state.preReq;
    const outcome = this.state.outcome;
    const courseContent = this.state.content;
    let category;
    if (this.state.category) category = this.state.category.label;
    const id = this.state.id;

    const body = JSON.stringify({
      id,
      name,
      pic,
      tags,
      importance,
      preReq,
      outcome,
      courseContent,
      category,
    });
    await axios.post(URL + "api/Courses/", body, config);
  }

  topNavClick(stepItem, push) {
    if (this.state.topNavDisabled) {
      return;
    }
    push(stepItem.id);
  }
  async componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    if (values.id) {
      let id = values.id;
      let body = JSON.stringify({ id });
      await axios
        .post(URL + "api/Courses/mycourse", body, config)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          console.log(data.category);
          this.setState({
            id: id,
            name: data.name,
            pic: data.pic,
            tags: data.tags,
            importance: data.importance,
            preReq: data.preReq,
            outcome: data.outcome,
            category: options.filter((value) => {
              return value.label === data.category;
            }),
            courseContent: data.courseContent,
          });
        });
    }
  }
  async onClickNext(goToNext, steps, step) {
    step.isDone = true;
    if (steps.indexOf(step) === 2) {
      this.setState({ upload: true });
    }
    if (steps.length - 2 <= steps.indexOf(step)) {
      this.setState({ bottomNavHidden: true, topNavDisabled: true });

      await this.uploadPic();
      this.RegisterCourse();
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
  handleTagChange = (tags) => {
    this.setState({ tags });
  };
  handleOutcome = (outcome) => {
    this.setState({ outcome });
  };
  handlePrerequisite = (preReq) => {
    this.setState({ preReq });
  };
  handleImportance = (importance) => {
    this.setState({ importance });
  };

  render() {
    return (
      <Card id="rest">
        <CardBody className="wizard wizard-default">
          <Wizard>
            <TopNavigation
              className="justify-content-center"
              disableNav={true}
            />
            <Steps>
              <Step id="step1" name="Step 1" desc="Basic Information">
                <div className="wizard-basic-step">
                  <Form>
                    <FormGroup>
                      <Label>Course Name</Label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Course Name"
                        value={this.state.name}
                        onChange={(e) => {
                          this.setState({ name: e.target.value });
                        }}
                      />
                      <br></br>
                      <br></br>
                      <row>
                        <Label>Course Image</Label>
                      </row>
                      <br></br>
                      <row>
                        <InputGroup className="mb-3">
                          <CustomInput
                            type="file"
                            name="pic"
                            accept="image/*"
                            onChange={this.onChangeHandler}
                          />
                        </InputGroup>
                      </row>
                      <br></br>
                      <br></br>
                      <br></br>
                      <label htmlFor="roll">Category</label>
                      <Select
                        name="select"
                        options={options}
                        value={this.state.category}
                        className="form-control"
                        onChange={(e) => this.setState({ category: e })}
                      ></Select>

                      <br></br>
                      <br></br>
                      <Label>Related Tags</Label>
                      <TagsInput
                        value={this.state.tags}
                        onChange={this.handleTagChange}
                      />
                      <br></br>
                      <br></br>
                      <row>
                        <Label>
                          <IntlMessages id="forms.importance" />
                        </Label>
                      </row>
                      <row>
                        <ReactQuill
                          theme="snow"
                          value={this.state.importance + ""}
                          onChange={this.handleImportance}
                          modules={quillModules}
                          formats={quillFormats}
                        />
                      </row>
                    </FormGroup>
                  </Form>
                </div>
              </Step>
              <Step id="step2" name="Step 2" desc="Pre-requisites">
                <div className="wizard-basic-step">
                  <Form>
                    <FormGroup>
                      <row>
                        <Label>
                          <IntlMessages id="forms.email" />
                        </Label>
                      </row>
                      <row>
                        <ReactQuill
                          theme="snow"
                          value={this.state.preReq + ""}
                          onChange={this.handlePrerequisite}
                          modules={quillModules}
                          formats={quillFormats}
                        />
                      </row>
                    </FormGroup>
                  </Form>
                </div>
              </Step>
              <Step id="step3" name="Step 3" desc="Outcomes">
                {" "}
                {this.state.upload ? (
                  <div>
                    <div className="loading"></div>
                    <h2>Please Wait...</h2>
                  </div>
                ) : (
                  <div className="wizard-basic-step">
                    <Form>
                      <FormGroup>
                        <row>
                          <Label>
                            <IntlMessages id="forms.outcome" />
                          </Label>
                        </row>
                        <row>
                          <ReactQuill
                            theme="snow"
                            value={this.state.outcome + ""}
                            onChange={this.handleOutcome}
                            modules={quillModules}
                            formats={quillFormats}
                          />
                        </row>
                      </FormGroup>
                    </Form>
                  </div>
                )}
              </Step>

              <Step id="step4" hideTopNav={true}>
                <div className="wizard-basic-step text-center">
                  <h2 className="mb-2">
                    <IntlMessages id="wizard.content-thanks" />
                  </h2>
                  <p>
                    <IntlMessages id="wizard.registered" />
                  </p>
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
              prevLabel="Back"
              nextLabel="Next"
            />
          </Wizard>
        </CardBody>
      </Card>
    );
  }
}
export default injectIntl(withRouter(AddCourse));
