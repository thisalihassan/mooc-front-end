import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, CardBody, Input, Button, CardHeader } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "../../components/CustomBootstrap";
import ApplicationMenu from "../../components/ApplicationMenu";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import AttachmentModel from "./AttachmentModel";
import {
  getProfiles,
  loadConversations,
  deleteConversation,
} from "../../redux/actions";
import io from "socket.io-client";
import queryString from "query-string";
class ChatApplication extends Component {
  constructor(props) {
    super(props);
    this.toggleAppMenu = this.toggleAppMenu.bind(this);
    this.state = {
      menuActiveTab: "contacts",
      messageInput: "",
      searchKey: "",
      socket: null,
      room: "",
      name: "",
      messages: [],
      users: "",
      firstTime: true,
      firstMessage: false,
      reciever: "",
      changeUser: true,
      modalOpen: false,
    };
  }
  sortSetRoom(userId) {
    this.setState({
      room: "",
    });
    const myData = [
      this.props.user._id,
      this.props.profile.profiles[userId].user._id,
    ];
    this.setState({ room: myData.sort() });
  }
  toggleAppMenu(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        menuActiveTab: tab,
      });
    }
    if (tab === "messages") {
      this.toggleAppMenu("");
    }
  }
  async componentDidMount() {
    await this.props.getProfiles();
  }
  componentDidUpdate(prevProps, prevState) {
    const values = queryString.parse(this.props.location.search);
    if (this.props.profile.profiles.length > 0)
      if (values.t && this.state.changeUser) {
        const profile = this.props.profile.profiles.find(
          (x) => x.user._id === values.t
        );
        const myData = [this.props.user._id, profile.user._id];
        // const myroom = myData.sort();
        this.props.loadConversations(myData.sort());

        this.setState({
          reciever: profile,
          changeUser: false,
          room: myData.sort(),
          firstMessage: true,
        });
      }
    if (this.props.chat.conversation !== prevProps.chat.conversation) {
      this.setState({
        messages: this.props.chat.conversation,
        firstMessage: false,
      });
    }
    if (this._scrollBarRef) {
      this._scrollBarRef._ps.element.scrollTop = this._scrollBarRef._ps.contentHeight;
    }
    if (this.props.user) {
      if (this.state.name == "") {
        this.setState({ name: this.props.user.name });
      }
    }

    if (this.state.name !== "" && this.state.room != "") {
      if (this.state.socket == null) {
        this.props.loadConversations(this.state.room);

        this.joinRoom();
      }
      if (this.state.firstTime) {
        this.setState({
          firstTime: false,
          firstMessage: true,
        });

        let mess = this.state.messageInput;
        this.state.socket.on("message", (mess) => {
          this.setState((prevState) => ({
            messages: [...prevState.messages, mess],
          }));
        });

        this.state.socket.on("roomData", ({ users }) => {
          this.setState({ users: users });
        });

        return () => {
          this.state.socket.emit("disconnect", this.state.room, (error) => {
            if (error) {
              alert(error);
            }
          });

          this.state.socket.off();
        };
      }
      if (this.state.messages !== prevState.messages) {
        const mess = this.state.messageInput;
        this.state.socket.on("message", (mess) => {
          if (mess !== this.state.messages[this.state.messages.length - 1])
            this.setState((prevState) => ({
              messages: [...prevState.messages, mess],
            }));
        });

        this.state.socket.on("roomData", ({ users }) => {
          this.setState({
            users: users,
          });
        });

        return () => {
          this.state.socket.emit("disconnect", this.state.room, (error) => {
            if (error) {
              alert(error);
            }
          });
          this.state.socket.off();
        };
      }
    }
  }

  joinRoom() {
    if (this.state.socket !== null) {
      this.state.socket.emit("disconnect", this.state.room, (error) => {
        if (error) {
          alert(error);
        }
      });
    }
    if (this.state.socket == null) {
      this.state.socket = io(":5000");
    }
    const name = this.state.name;
    const myroom = this.state.room;
    const check = false;
    const id = this.props.user._id;
    this.state.socket.emit("join", { name, myroom, check, id }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }
  sendMessage(event) {
    event.preventDefault();
    if (this.state.messageInput !== "") {
      const myroom = this.state.room;
      const msg = this.state.messageInput;
      const check = false;
      const id = this.props.user._id;
      const tuple = { myroom, msg, check, id };
      this.state.socket.emit("sendMessage", tuple, () =>
        this.setState({
          messageInput: "",
        })
      );
    }
  }
  handleSearchContact(keyword) {
    this.setState({
      searchKey: keyword,
    });
  }

  handleChatInputChange(e) {
    this.setState({
      messageInput: e.target.value,
    });
  }
  reloadModel = (e) => {
    this.props.reloadModel();
  };
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };
  handleContactClick(userId) {
    this.props.loadConversations(this.state.room);
    this.setState({
      firstMessage: true,
      reciever: this.props.profile.profiles[userId],
      changeUser: true,
    });

    this.sortSetRoom(userId);
    this.joinRoom();
  }

  deletConversation() {
    this.props.deleteConversation(this.state.room);
    window.location.reload();
  }
  render() {
    const reciever = this.state.reciever;
    const user = this.props.user;
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Row className="app-row">
          <Colxx xxs="12" className="chat-app">
            {reciever && (
              <div className="d-flex flex-row chat-heading">
                <div className="d-flex">
                  <img
                    alt={reciever && reciever.user.name}
                    src={reciever && reciever.user.avatar}
                    className="img-thumbnail border-0 rounded-circle ml-0 mr-4 list-thumbnail align-self-center small"
                  />
                </div>
                <div className=" d-flex min-width-zero">
                  <div className="card-body pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                    <div className="min-width-zero">
                      <div>
                        <p className="list-item-heading mb-1 truncate ">
                          {reciever && reciever.user.name}
                        </p>
                      </div>
                      <p className="mb-0 text-muted text-small">
                        {/* {selectedUser.lastSeenDate} */}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="float-sm-right mb-2">
                  <Button
                    outline
                    className="top-right-button top-right-button-single flex-grow-1"
                    size="lg"
                    onClick={() => this.deletConversation()}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
            <div className="separator mb-5" />

            <PerfectScrollbar
              ref={(ref) => {
                this._scrollBarRef = ref;
              }}
              containerRef={(ref) => {}}
              option={{ suppressScrollX: true, wheelPropagation: false }}
            >
              {this.state.messages.map((item, index) => {
                return (
                  <div key={index}>
                    <Card
                      className={`d-inline-block mb-3 float-${
                        item.user !== user.name ? "left" : "right"
                      }`}
                    >
                      <div className="position-absolute  pt-1 pr-2 r-0">
                        <span className="text-extra-small text-muted">
                          {item.timeStamp}
                        </span>
                      </div>
                      <CardBody>
                        <div className="d-flex flex-row pb-1">
                          <div className=" d-flex flex-grow-1 min-width-zero">
                            <div className="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                              <div className="min-width-zero">
                                <p className="mb-0 truncate list-item-heading">
                                  {item.user}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`chat-text-${
                            item.user === user.name ? "left" : "right"
                          }`}
                        >
                          <p className="mb-0 text-semi-muted">{item.text}</p>
                        </div>
                      </CardBody>
                    </Card>
                    <div className="clearfix" />
                  </div>
                );
              })}
            </PerfectScrollbar>
          </Colxx>
        </Row>

        <div className="chat-input-container d-flex justify-content-between align-items-center">
          <Input
            className="form-control flex-grow-1"
            type="text"
            placeholder={messages["chat.saysomething"]}
            value={this.state.messageInput}
            onChange={(e) => this.handleChatInputChange(e)}
          />
          <div>
            <Button
              outline
              onClick={this.toggleModal}
              color={"primary"}
              className="icon-button large ml-1"
            >
              <i className="simple-icon-paper-clip" />
            </Button>
            <AttachmentModel
              reloadModel={(e) => this.reloadModel(e)}
              toggleModal={this.toggleModal}
              modalOpen={this.state.modalOpen}
            />
            <Button
              color={"primary"}
              className="icon-button large ml-1"
              onClick={(event) => this.sendMessage(event)}
            >
              <i className="simple-icon-arrow-right" />
            </Button>
          </div>
        </div>

        <ApplicationMenu>
          <CardHeader className="pl-0 pr-0"></CardHeader>

          <div className="pt-4 pr-4 pl-4 pb-0">
            <div className="form-group">
              <input
                type="text"
                className="form-control rounded"
                value={this.state.searchKey}
                onChange={(e) => this.handleSearchContact(e.target.value)}
              />
            </div>
          </div>

          <PerfectScrollbar
            option={{ suppressScrollX: true, wheelPropagation: false }}
          >
            <div className="pt-2 pr-4 pl-4 pb-2">
              {this.props.profile.profiles !== [] &&
                this.props.profile.profiles.map((item, index) => {
                  if (user) {
                    if (item.user._id !== user._id) {
                      return (
                        <div
                          key={index}
                          className="d-flex flex-row mb-3 border-bottom pb-3"
                        >
                          <NavLink
                            className="d-flex"
                            to={"/app/messages/chat/?t=" + item.user._id}
                            onClick={() => this.handleContactClick(index)}
                          >
                            <img
                              alt={item.user.name}
                              src={item.user.avatar}
                              className="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                            />
                            <div className="d-flex flex-grow-1 min-width-zero">
                              <div className="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                <div className="min-width-zero">
                                  <p className="mb-0 truncate">
                                    {item.user.name}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </div>
                      );
                    }
                  }
                })}
            </div>
          </PerfectScrollbar>
        </ApplicationMenu>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth, chat, profile }) => {
  const { user } = auth;
  return { user, chat, profile };
};
export default injectIntl(
  connect(mapStateToProps, {
    getProfiles,
    loadConversations,
    deleteConversation,
  })(ChatApplication)
);
