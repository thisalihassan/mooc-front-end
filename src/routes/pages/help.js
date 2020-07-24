import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Collapse } from "reactstrap";
import IntlMessages from "../../util/IntlMessages";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from "reactstrap";
import { URL, config } from "../../constants/defaultValues";
import axios from "axios";
import { Colxx } from "../../components/CustomBootstrap";
import { setAlert } from "../../redux/actions";
import { socket } from "../../containers/TopNav";
class ChatApplication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      accordion: [],
      question: "",
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

  async makeComplaint(e) {
    e.preventDefault();
    const check = this.state.question.split(" ").join("");
    if (check) {
      const question = this.state.question;
      let body = JSON.stringify({ question });

      const res = await axios.post(
        URL + "api/complaint/sendcomplaints",
        body,
        config
      );
      this.props.setAlert(
        "Thank you for submitting your query. We will send a reply soon. Please check back again",
        "success"
      );

      const user = this.props.user._id;
      const complaint = res.data._id;
      const message = "You have one new comlaint: '" + question + "'";
      body = JSON.stringify({ complaint, message, user });
      this.state.socket.emit("new_notification", {
        body: body,
        message: message,
        user: user,
        complaint: complaint,
      });
      await axios
        .post(URL + "api/complaint/getActive", {}, config)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          let accordionData = [];
          data.forEach(() => {
            accordionData.push(false);
          });

          this.setState({
            complaints: data,
            accordion: accordionData,
            question: "",
          });
        });
    } else {
      this.props.setAlert(
        "Please type in your query before submitting",
        "danger"
      );
    }
  }

  componentDidMount() {
    if (!this.state.socket) {
      this.state.socket = socket;
    }
    axios
      .post(URL + "api/complaint/getActive", {}, config)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        let accordionData = [];
        data.forEach(() => {
          accordionData.push(false);
        });
        this.setState({ complaints: data, accordion: accordionData });
      });
  }
  render() {
    return (
      <Fragment>
        <h1>We are here to help! </h1>
        <Card className="mb-4" id="rest">
          <CardBody>
            <CardTitle>
              <IntlMessages id="input-groups.button-addons" />
            </CardTitle>

            <InputGroup className="mb-3">
              <Input
                type="text"
                name="name"
                placeholder="complaint"
                value={this.state.question}
                onChange={(e) => {
                  this.setState({ question: e.target.value });
                }}
              />
              <InputGroupAddon
                addonType="append"
                placeholder="Write your question or complaint here ... "
              >
                <Button
                  outline
                  color="secondary"
                  onClick={(e) => this.makeComplaint(e)}
                >
                  <IntlMessages id="input-groups.button" />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </CardBody>
        </Card>
        <Row>
          <Colxx xxs="12" className="mb-4">
            <Fragment>
              <h1>
                {" "}
                <IntlMessages id="input.faq" />
              </h1>
              {this.state.complaints.map((item, index) => {
                return (
                  <Card className="d-flex mb-3" key={index} id="rest">
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
                      <div
                        className="card-body accordion-content pt-0"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
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
const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};
export default connect(mapStateToProps, { setAlert })(ChatApplication);
