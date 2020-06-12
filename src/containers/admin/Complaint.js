import React, { Component, Fragment } from "react";
import { Collapse, FormGroup } from "reactstrap";
import { Row, Card, Input, Button } from "reactstrap";
import { Colxx } from "../../components/CustomBootstrap";
import { URL, config } from "../../constants/defaultValues";
import axios from "axios";
class ChatApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      accordion: [],
      answers: [],
      complaints: [],
    };
  }

  toggleAccordion = (tab) => {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      accordion: state,
    });
  };
  componentDidMount() {
    axios
      .post(URL + "api/complaint/getComplaints", {}, config)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        let accordionData = [];
        let answersdata = [];
        data.forEach((d) => {
          accordionData.push(false);
          if (d.answer) {
            answersdata.push(d.answer);
          } else {
            answersdata.push("");
          }
        });

        this.setState({
          complaints: data,
          accordion: accordionData,
          answers: answersdata,
        });
      });
  }

  async replyComplaint(index, id) {
    const answer = this.state.answers[index];
    const body = JSON.stringify({ answer, id });
    await axios.post(URL + "api/complaint/answercomplaints", body, config);
    await axios
      .post(URL + "api/complaint/getComplaints", {}, config)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        let accordionData = [];
        let answersdata = [];
        data.forEach((d) => {
          accordionData.push(false);
          if (d.answer) {
            answersdata.push(d.answer);
          } else {
            answersdata.push("");
          }
        });

        this.setState({
          complaints: data,
          accordion: accordionData,
          answers: answersdata,
        });
      });
  }
  render() {
    return (
      <Fragment>
        <h1>Complaints </h1>

        <Row>
          <Colxx xxs="12" className="mb-4">
            <Fragment>
              {this.state.complaints.map((item, index) => {
                return (
                  <Card id="rest" className="d-flex mb-3" key={index}>
                    <div className="d-flex flex-grow-1 min-width-zero">
                      <Button
                        color="link"
                        className="card-body  btn-empty btn-link list-item-heading text-left text-one"
                        onClick={() => this.toggleAccordion(index)}
                        aria-expanded={this.state.accordion[index]}
                      >
                        {item.question}
                      </Button>
                    </div>
                    <Collapse isOpen={this.state.accordion[index]}>
                      <div className="card-body accordion-content pt-0">
                        <FormGroup>
                          <Input
                            className="form-control-alternative"
                            placeholder="Write your reply"
                            rows="4"
                            type="textarea"
                            name="description"
                            value={this.state.answers[index]}
                            onChange={(e) => {
                              const ans = this.state.answers;
                              ans[index] = e.target.value;
                              this.setState({ answers: ans });
                            }}
                            readOnly={this.state.mydescription}
                          />
                          <Button
                            onClick={() =>
                              this.replyComplaint(index, item.user)
                            }
                          >
                            Reply
                          </Button>
                        </FormGroup>
                      </div>
                    </Collapse>
                  </Card>
                );
              })}
            </Fragment>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default ChatApplication;
