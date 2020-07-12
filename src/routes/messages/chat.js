import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, CardBody, Input, Button, CardHeader } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "../../components/CustomBootstrap";
import ApplicationMenu from "../../components/ApplicationMenu";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import moment from "moment";
import AttachmentModel from "./AttachmentModel";
import NewWindow from "react-new-window";
import {
  getProfiles,
  loadConversations,
  deleteConversation,
  GetSubscription,
} from "../../redux/actions";
import io from "socket.io-client";
import queryString from "query-string";
import { socket } from "../../containers/TopNav";
import { URL, AURL } from "./../../constants/defaultValues";
class ChatApplication extends Component {
  constructor(props) {
    super(props);
    this.toggleAppMenu = this.toggleAppMenu.bind(this);
    this.state = {
      menuActiveTab: "contacts",
      messageInput: "",
      socket: null,
      room: "",
      name: "",
      messages: [],
      users: "",
      setProfiles: false,
      profiles: [],
      loading: false,
      firstTime: true,
      firstMessage: false,
      reciever: "",
      changeUser: true,
      modalOpen: false,
    };
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
    this.props.GetSubscription();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log();
    if (
      !this.state.setProfiles &&
      this.props.followers &&
      this.props.following
    ) {
      let users = [];
      let followigs = this.props.following;
      let sizeF = followigs.length;
      let followers = this.props.followers;

      let sizeFrs = followers.length;
      let m = 0;
      for (let i = 0; i < sizeF; i += 1) {
        for (let j = 0; j < sizeFrs; j += 1) {
          if (followigs[i]._id == followers[j]._id) {
            users[m] = followigs[i];
            m += 1;
          }
        }
      }
      this.setState({
        setProfiles: true,
        profiles: users,
      });
    }
    const values = queryString.parse(this.props.location.search);
    if (this.state.profiles.length > 0)
      if (values.t && this.state.changeUser) {
        const profile = this.state.profiles.find((x) => x._id === values.t);
        const myData = [this.props.user._id, profile._id];
        this.setState({ loading: true });
        this.props.loadConversations(myData.sort());
        this.setState({ loading: false });

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
        this.setState({ loading: true });
        this.props.loadConversations(this.state.room);
        this.setState({ loading: false });

        this.joinRoom(this.state.room);
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

  joinRoom(room) {
    if (this.state.socket !== null) {
      this.state.socket.emit("disconnect", this.state.room, (error) => {
        if (error) {
          alert(error);
        }
      });
    }
    if (this.state.socket == null) {
      this.state.socket = io(URL);
    }
    const name = this.state.name;
    const myroom = room;
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
      const timeStamp = moment().format("D MMM YY HH:MM");
      const tuple = { myroom, msg, check, id, timeStamp };
      this.state.socket.emit("sendMessage", tuple, () =>
        this.setState({
          messageInput: "",
        })
      );
    }
  }
  sendMessage2(event) {
    if (event.key === "Enter") {
      if (this.state.messageInput !== "") {
        const myroom = this.state.room;
        const msg = this.state.messageInput;
        const check = false;
        const id = this.props.user._id;
        const timeStamp = moment().format("D MMM YY HH:MM");
        const tuple = { myroom, msg, check, id, timeStamp };
        this.state.socket.emit("sendMessage", tuple, () =>
          this.setState({
            messageInput: "",
          })
        );
      }
    }
  }
  handleChatInputChange(e) {
    this.setState({
      messageInput: e.target.value,
    });
  }
  reterieveURL = (e) => {
    const myroom = this.state.room;
    var msg = e.url + "*" + e.filename;
    const check = false;
    const id = this.props.user._id;
    const timeStamp = moment().format("D MMM YY HH:MM");
    const tuple = { myroom, msg, check, id, timeStamp };
    this.state.socket.emit("sendMessage", tuple, () =>
      this.setState({
        messageInput: "",
      })
    );
  };
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };
  handleContactClick(userId) {
    this.setState({ loading: true });
    this.props.loadConversations(this.state.room);
    this.setState({ loading: false });
    this.setState({
      firstMessage: true,
      reciever: this.state.profiles[userId],
      changeUser: true,
    });

    const myData = [this.props.user._id, this.state.profiles[userId]._id];
    // this.setState({ room: myData.sort() });
    this.joinRoom(myData.sort());
  }
  startAudioCall(owner, user) {
    const myData = [owner, user];
    const myroom = myData.sort();
    const name = this.props.user.name;
    const userid = owner;
    const URL = AURL + "?id=" + myroom[0] + "" + myroom[1] + "&u=join";
    const tuple = { userid, name, URL };
    socket.emit("CallRing", tuple, () =>
      this.setState({
        callModal: !this.state.callModal,
        videoURL: AURL + "?id=" + myroom[0] + "" + myroom[1] + "&u=start",
      })
    );
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
          {this.state.callModal && (
            <NewWindow url={this.state.videoURL}></NewWindow>
          )}
          <Colxx xxs="12" className="chat-app">
            {reciever && (
              <div className="d-flex flex-row chat-heading">
                <div className="d-flex">
                  <img
                    alt={reciever && reciever.name}
                    src={reciever && reciever.avatar}
                    className="img-thumbnail border-0 rounded-circle ml-0 mr-4 list-thumbnail align-self-center small"
                  />
                </div>
                <div className=" d-flex min-width-zero">
                  <div className="card-body pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                    <div className="min-width-zero">
                      <div>
                        <p className="list-item-heading mb-1 truncate ">
                          {reciever && reciever.name}
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
                </div>{" "}
                <div className="float-sm-right mb-2">
                  <Button
                    onClick={() =>
                      this.startAudioCall(reciever._id, this.props.user._id)
                    }
                  >
                    <i className="simple-icon-phone" />
                  </Button>
                </div>
              </div>
            )}
            <div className="separator mb-5" />
            {this.state.loading ? (
              <div className="loading"></div>
            ) : (
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
                            {item.text.startsWith("http") ? (
                              <a
                                href={item.text.split("*")[0]}
                                target="_blank"
                                download
                              >
                                {item.text.split("*")[1]}
                              </a>
                            ) : (
                              <p className="mb-0 text-semi-muted">
                                {item.text}
                              </p>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                      <div className="clearfix" />
                    </div>
                  );
                })}
              </PerfectScrollbar>
            )}
          </Colxx>
        </Row>

        <div className="chat-input-container d-flex justify-content-between align-items-center">
          <Input
            className="form-control flex-grow-1"
            type="text"
            placeholder={messages["chat.saysomething"]}
            onKeyPress={(event) => this.sendMessage2(event)}
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
              reterieveURL={(e) => {
                this.reterieveURL(e);
              }}
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

          <PerfectScrollbar
            option={{ suppressScrollX: true, wheelPropagation: false }}
          >
            <div className="pt-2 pr-4 pl-4 pb-2">
              {this.state.profiles !== [] &&
                this.state.profiles.map((item, index) => {
                  if (user) {
                    if (item._id !== user._id) {
                      return (
                        <div
                          key={index}
                          className="d-flex flex-row mb-3 border-bottom pb-3"
                        >
                          <NavLink
                            className="d-flex"
                            to={"/app/messages/chat/?t=" + item._id}
                            onClick={() => this.handleContactClick(index)}
                          >
                            <img
                              alt={item.name}
                              src={item.avatar}
                              className="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                            />
                            <div className="d-flex flex-grow-1 min-width-zero">
                              <div className="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                <div className="min-width-zero">
                                  <p className="mb-0 truncate">{item.name}</p>
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

const mapStateToProps = ({ auth, chat, profile, subscribtion }) => {
  const { user } = auth;
  const { followers } = subscribtion.subscribed;
  const { following } = subscribtion.subscribed;
  return { user, chat, profile, followers, following };
};
export default injectIntl(
  connect(mapStateToProps, {
    getProfiles,
    GetSubscription,
    loadConversations,
    deleteConversation,
  })(ChatApplication)
);
