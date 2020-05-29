import React, { Component, textarea } from "react";

import "./basic.css";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Row
} from "reactstrap";
import IntlMessages from "../../util/IntlMessages";
import { Wizard, Steps, Step } from "react-albus";
import { injectIntl } from "react-intl";
import { BottomNavigation } from "../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../components/wizard/TopNavigation";
import TagsInputExample from "../../containers/forms/TagsInputExample";
import DropzoneExample from "../../components/DropzoneExample";
class roomBasic extends Component {
  constructor(props) {
    super(props);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.topNavClick = this.topNavClick.bind(this);
    this.state = {
      name: "",
      email: "",
      password: "",
      categories: ["a", "b", "c", "d"],
      dropdownBasicOpen: false
    };
  }
  toggleBasic = () => {
    this.setState(prevState => ({
      dropdownBasicOpen: !prevState.dropdownBasicOpen
    }));
  };

  topNavClick(stepItem, push) {
    push(stepItem.id);
  }

  onClickNext(goToNext, steps, step) {
    step.isDone = true;
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
                name={messages["rwizard.step-name-1"]}
                desc={messages["rwizard.step-desc-1"]}
              >
                <div className="wizard-basic-step">
                  <Form>
                    <FormGroup>
                      <Label>
                        <IntlMessages id="rforms.name" />
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        placeholder={messages["forms.roomname"]}
                        value={this.state.name}
                        onChange={e => {
                          this.setState({ name: e.target.value });
                        }}
                      />
                      <br></br>
                      <br></br>
                      <row>
                        <Label>
                          <IntlMessages id="forms.rpic" />
                        </Label>
                      </row>
                      <br></br>
                      <row>
                        <input type="file" name="pic" accept="image/*"></input>
                      </row>
                      <br></br>
                      <br></br>
                      <br></br>

                      <row>
                        <Label>
                          <IntlMessages id="forms.description" />
                        </Label>
                      </row>
                      <row>
                        <textarea
                          type="textarea"
                          name="importance"
                          placeholder={messages["forms.ddesc"]}
                        />
                      </row>
                    </FormGroup>
                  </Form>
                </div>
              </Step>
              <Step
                id="step2"
                name={messages["rwizard.step-name-2"]}
                desc={messages["rwizard.step-desc-2"]}
              >
                <div className="wizard-basic-step">
                  <Form>
                    <FormGroup>
                      <row>
                        <Label>
                          <IntlMessages id="forms.obj" />
                        </Label>
                      </row>
                      <row>
                        <textarea
                          type="textarea"
                          name="prerequisite"
                          placeholder={messages["forms.obji"]}
                        />
                      </row>
                    </FormGroup>
                  </Form>
                </div>
              </Step>
              <Step
                id="step3"
                name={messages["wizard.step-name-3"]}
                desc={messages["rwizard.step-desc-3"]}
              >
                <div className="wizard-basic-step">
                  <Form>
                    <FormGroup>
                      <Label>
                        <IntlMessages id="forms.type" />
                      </Label>

                      <Dropdown
                        isOpen={this.state.dropdownBasicOpen}
                        toggle={this.toggleBasic}
                        className="mb-5"
                      >
                        <DropdownToggle caret color="secondary">
                          <IntlMessages id="dropdowns.rdropdown" />
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem>
                            <IntlMessages id="dropdowns.rheader" />
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>

                      <Label>
                        <IntlMessages id="rforms.pwd" />
                      </Label>
                      <Input
                        type="password"
                        name="name"
                        placeholder={messages["forms.roompass"]}
                        value={this.state.name}
                        onChange={e => {
                          this.setState({ name: e.target.value });
                        }}
                      />
                    </FormGroup>
                  </Form>
                </div>
              </Step>
              <Step id="step4" hideTopNav={true}>
                <div className="wizard-basic-step text-center">
                  <h2 className="mb-2">
                    <IntlMessages id="wizard.content-rthanks" />
                  </h2>
                  <p>
                    <IntlMessages id="wizard.rregistered" />
                  </p>
                </div>
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
              className="justify-content-center"
              prevLabel={messages["wizard.prev"]}
              nextLabel={messages["wizard.next"]}
            />
          </Wizard>
        </CardBody>
      </Card>
    );
  }
}
export default injectIntl(roomBasic);
