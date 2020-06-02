import React, { Component, Fragment } from "react";
import IntlMessages from "../../util/IntlMessages";
import { injectIntl } from "react-intl";
import "./table.css";
import {
  Row,
  Card,
  CardBody,
  Nav,
  Input,
  Button,
  TabContent,
  TabPane,
  CardHeader,
  Table,
  NavItem,
} from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import { Colxx, Separator } from "../../components/CustomBootstrap";
import ApplicationMenu from "../../components/ApplicationMenu";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import {
  getProfiles,
  loadConversations,
  changeConversation,
  deleteConversation,
} from "../../redux/actions";
import classnames from "classnames";
import { socket } from "../../containers/TopNav";
import axios from "axios";
import { BURL, URL, config, AURL, SURL } from "../../constants/defaultValues";
import queryString from "query-string";
import NewWindow from "react-new-window";
class ChatApplication extends Component {
  constructor(props) {
    super(props);
    this.toggleAppMenu = this.toggleAppMenu.bind(this);
    this.state = {
      menuActiveTab: "members",
      messageInput: "",
      searchKey: "",
      socket: null,
      room: "",
      name: "",
      roomName: "",
      messages: "",
      participants: null,
      users: null,
      modalOpen: false,
      firstMessage: true,
      videoURL: "",
      roomCreator: "",
      firstTime: true,
      guidelines: "",
    };
  }

  toggleAppMenu(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        menuActiveTab: tab,
      });
    }
    if (tab === "messages") {
      this.handleSearchContact("");
    }
  }
  async componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    if (values.id) {
      const res = await axios.post(
        URL + "api/room/find/" + values.id,
        {},
        config
      );

      this.setState({
        room: values.id,
        roomName: res.data.course.name,
        roomCreator: res.data.user,
        guidelines: res.data.guidelines,
      });
      this.props.loadConversations(values.id, false);
      // this.state.socket.emit("join", { name, myroom }, error => {
      //   if (error) {
      //     alert(error);
      //   }
      // });
    }
    // this.props.getConversations(currentUserId);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.socket) {
      if (this.state.users !== prevState.users) {
        this.state.socket.on("roomData", ({ users }) => {
          this.setState({ users: users });
        });
        if (this.state.users) {
          let mid = [];
          this.state.users.forEach((item) => {
            mid.push(item.id);
          });
          console.log(mid);
          const body = JSON.stringify({ mid });
          axios
            .post(URL + "api/auth/find", body, config)
            .then((res) => {
              return res.data;
            })
            .then((data) => {
              console.log(data);
              this.setState({ participants: data });
            });
        }
      }
      this.state.socket.on("userNavigate", ({ user }) => {
        if (user === this.props.user._id) {
          this.props.history.push("/app/myrooms/rooms");
        }
      });
    }

    console.log(this.state.users);
    if (this.props.chat.conversation !== prevProps.chat.conversation) {
      this.setState({ messages: this.props.chat.conversation });
    }

    if (this._scrollBarRef) {
      this._scrollBarRef._ps.element.scrollTop = this._scrollBarRef._ps.contentHeight;
    }
    if (!this.state.socket && this.props.user) {
      const values = queryString.parse(this.props.location.search);
      const myroom = values.id;
      const id = this.props.user._id;
      const body = JSON.stringify({ id, myroom });
      await axios
        .post(URL + "api/room/findkick", body, config)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          if (data) {
            this.props.history.push("/app/myrooms/rooms");
          }
        });
      this.state.socket = socket;
      // const values = queryString.parse(this.props.location.search);
      // const myroom = values.id;
      const name = this.props.user.name;
      const check = true;
      // const id = this.props.user._id;
      this.state.socket.emit("join", { name, myroom, check, id }, (error) => {
        if (error) {
          alert(error);
        }
      });
      if (this.state.firstTime) {
        this.setState({
          firstTime: false,
        });
        this.state.socket.on("roomData", ({ users }) => {
          this.setState({ users: users });
        });
        if (this.state.users) {
          let id = [];
          this.state.users.forEach((item) => {
            id.push(item.id);
          });
          console.log(id);
          const body = JSON.stringify({ id });
          await axios
            .get(URL + "api/auth/find", body, config)
            .then((res) => {
              return res.data;
            })
            .then((data) => {
              console.log(data);
              this.setState({ participants: data });
            });
        }
        let mess = this.state.messageInput;
        this.state.socket.on("message", (mess) => {
          this.setState((prevState) => ({
            messages: [...prevState.messages, mess],
          }));
        });
      }
    }

    if (this.state.messages !== prevState.messages) {
      const mess = this.state.messageInput;
      this.state.socket.on("message", (mess) => {
        // if (mess !== this.state.messages[this.state.messages.length - 1])
        this.setState((prevState) => ({
          messages: [...prevState.messages, mess],
        }));
      });

      // this.state.socket.on("roomData", ({ users }) => {
      //   this.setState({
      //     users: users
      //   });
      // });

      // return () => {
      //   this.state.socket.emit("disconnect", this.state.room, error => {
      //     if (error) {
      //       alert(error);
      //     }
      //   });
      //   this.state.socket.off();
      // };
    }
  }

  componentWillMount() {
    if (this.props.user && this.state.socket) {
      const myroom = this.state.room;
      const name = this.props.user.name;
      const id = this.props.user._id;
      const tuple = { myroom, id, name };
      this.state.socket.emit("disconnectuser", tuple, () =>
        console.log("Leave")
      );
    }
  }

  sendMessage(event) {
    event.preventDefault();
    if (this.state.messageInput !== "") {
      const myroom = this.state.room;
      const msg = this.state.messageInput;
      const check = true;
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

  async kickUser(e, id, name) {
    e.preventDefault();
    const myroom = this.state.room;
    const tuple = { myroom, id, name };
    this.state.socket.emit("kickuser", tuple, () =>
      console.log("user Removed")
    );
  }
  startVideoBroadcasting(owner, user) {
    if (owner._id === user._id) {
      const room = this.state.room;
      const name = this.state.roomName;
      const userid = this.props.user._id;
      const tuple = { room, name, userid };
      this.state.socket.emit("VideoCall", tuple, () =>
        this.setState({
          modalOpen: !this.state.modalOpen,
          videoURL:
            BURL +
            "?id=" +
            this.state.room +
            "&u=" +
            user._id +
            "&s=video&q=start",
        })
      );
    }
  }

  startScreenBroadcasting(owner, user) {
    if (owner._id === user._id) {
      const myroom = this.state.room;
      const check = true;
      const id = this.props.user._id;
      const msg = "Screen broadcasting has started";
      const tuple = { myroom, msg, check, id };
      this.state.socket.emit("sendMessage", tuple, () =>
        this.setState({
          messageInput: "",
        })
      );
      this.setState({
        modalOpen: !this.state.modalOpen,
      });
      this.setState({
        videoURL: SURL + "?id=" + this.state.room,
      });
    }
  }
  startAudioCall(owner, user) {
    if (owner._id === user._id) {
      const myroom = this.state.room;
      const check = true;
      const id = this.props.user._id;
      const msg = "Audio Call has started";
      const tuple = { myroom, msg, check, id };
      this.state.socket.emit("sendMessage", tuple, () =>
        this.setState({
          messageInput: "",
        })
      );
      this.setState({
        modalOpen: !this.state.modalOpen,
      });
      this.setState({
        videoURL: AURL + "?id=" + this.state.room + "&u=start",
      });
    }
  }
  deletConversation(e) {
    this.props.deleteConversation(this.state.room);
    window.location.reload();
  }
  leaveRoom(e) {
    const myroom = this.state.room;
    const name = this.props.user.name;
    const id = this.props.user._id;
    const tuple = { myroom, id, name };
    this.state.socket.emit("disconnectuser", tuple, () => console.log("Leave"));
    this.props.history.push("/app/myrooms/rooms");
  }
  toggleScreen = () => {
    this.setState({
      videoURL: SURL + "?id=" + this.state.room,
    });
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };
  toggleAudioCall = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
    this.setState({
      videoURL: AURL + "?id=" + this.state.room + "&u=join",
    });
  };
  toggleModal = () => {
    this.setState({
      videoURL:
        BURL +
        "?id=" +
        this.state.room +
        "&u=" +
        this.props.user._id +
        "&s=video&q=start",
    });
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };
  render() {
    const owner = this.state.roomCreator;
    const user = this.props.user;
    const { messages } = this.props.intl;
    if (owner && user)
      return (
        <Fragment>
          {this.state.modalOpen && (
            <NewWindow url={this.state.videoURL}></NewWindow>
          )}
          <Row className="app-row">
            <Colxx xxs="6" className="VideoContainer"></Colxx>
            <Colxx xxs="12" className="chat-app">
              <Table borderless>
                <tr>
                  <td>
                    <div className="d-flex"></div>
                    <div className=" d-flex min-width-zero">
                      <div>
                        <h1>{this.state.roomName}</h1>
                      </div>
                      <p className="mb-0 text-muted text-small"></p>
                    </div>
                  </td>
                  <td id="a">
                    {owner._id === user._id && (
                      <Button onClick={() => this.startAudioCall(owner, user)}>
                        <i className="simple-icon-phone" />
                      </Button>
                    )}
                    {owner && user && owner._id !== user._id && (
                      <Button onClick={this.toggleAudioCall}>
                        <i className="simple-icon-phone" />
                      </Button>
                    )}
                  </td>
                  <td id="b">
                    {owner._id === user._id && (
                      <Button
                        onClick={() => this.startVideoBroadcasting(owner, user)}
                      >
                        <i className="simple-icon-camrecorder" />
                      </Button>
                    )}
                    {owner && user && owner._id !== user._id && (
                      <Button>
                        <i className="simple-icon-camrecorder" />
                      </Button>
                    )}
                  </td>
                  <td id="c">
                    {owner && user && owner._id === user._id && (
                      <Button
                        onClick={() =>
                          this.startScreenBroadcasting(owner, user)
                        }
                      >
                        <i className="simple-icon-screen-desktop" />
                      </Button>
                    )}
                    {owner && user && owner._id !== user._id && (
                      <Button onClick={this.toggleScreen}>
                        <i className="simple-icon-screen-desktop" />
                      </Button>
                    )}
                  </td>
                </tr>
              </Table>

              <div className="separator mb-5" />

              {this.state.messages && (
                <PerfectScrollbar
                  ref={(ref) => {
                    this._scrollBarRef = ref;
                  }}
                  containerRef={(ref) => {}}
                  option={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  {this.state.messages.map((item, index) => {
                    return (
                      <Fragment key={index}>
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
                                item.user !== user.name ? "left" : "right"
                              }`}
                            >
                              <p className="mb-0 text-semi-muted">
                                {item.text}
                              </p>
                            </div>
                          </CardBody>
                        </Card>
                        <div className="clearfix" />
                      </Fragment>
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
              value={this.state.messageInput}
              onChange={(e) => this.handleChatInputChange(e)}
            />
            <div>
              <Button
                outline
                color={"primary"}
                className="icon-button large ml-1"
              >
                <i className="simple-icon-paper-clip" />
              </Button>

              <Button
                color={"primary"}
                className="icon-button large ml-1"
                onClick={(event) => this.sendMessage(event)}
                onKeyDown={(event) => this.sendMessage(event)}
              >
                <i className="simple-icon-arrow-right" />
              </Button>
            </div>
          </div>
          <ApplicationMenu>
            <CardHeader className="pl-0 pr-0">
              <Nav tabs className="card-header-tabs ml-0 mr-0">
                <NavItem className="w-50 text-center">
                  <NavLink
                    className={classnames({
                      active: this.state.menuActiveTab === "members",
                      "nav-link": true,
                    })}
                    onClick={() => {
                      this.toggleAppMenu("members");
                    }}
                    to={"/app/myrooms/roomview/?id=" + this.state.room}
                  >
                    <IntlMessages id="room.members" />
                  </NavLink>
                </NavItem>
                <NavItem className="w-50 text-center">
                  <NavLink
                    className={classnames({
                      active: this.state.menuActiveTab === "contacts",
                      "nav-link": true,
                    })}
                    onClick={() => {
                      this.toggleAppMenu("contacts");
                    }}
                    to={"/app/myrooms/roomview/?id=" + this.state.room}
                  >
                    <IntlMessages id="room.settings" />
                  </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>

            <div className="pt-4 pr-4 pl-4 pb-0">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control rounded"
                  value={this.state.searchKey}
                  onChange={(e) => this.handleSearchContact(e.target.value)}
                  placeholder="Search"
                />
              </div>
            </div>

            <TabContent
              activeTab={this.state.menuActiveTab}
              className="chat-app-tab-content"
            >
              <TabPane tabId="contacts" className="chat-app-tab-pane">
                <PerfectScrollbar
                  option={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  <div className="pt-2 pr-4 pl-4 pb-2">
                    <h3>Guidelines</h3>

                    <p>{this.state.guidelines}</p>
                    <br></br>
                    <Separator></Separator>
                    <br></br>
                    <NavLink
                      to={"/app/myrooms/roomview/?id=" + this.state.room}
                      onClick={(e) => this.leaveRoom(e)}
                    >
                      <h3> Leave Room</h3>
                    </NavLink>

                    <br></br>
                    <NavLink
                      to={"/app/myrooms/roomview/?id=" + this.state.room}
                      onClick={(e) => this.deletConversation(e)}
                    >
                      <h6> Delete Conversation</h6>
                    </NavLink>
                  </div>
                </PerfectScrollbar>
              </TabPane>
              <TabPane tabId="members" className="chat-app-tab-pane">
                <PerfectScrollbar
                  option={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  <Table borderless>
                    <tr>
                      <td>
                        <div className="pt-2 pr-4 pl-4 pb-2">
                          {this.state.participants &&
                            this.state.participants.map((item, index) => {
                              if (user) {
                                if (item._id !== user._id) {
                                  return (
                                    <div
                                      key={item._id + index}
                                      className="d-flex flex-row mb-3 border-bottom pb-3"
                                    >
                                      <NavLink className="d-flex" to="#">
                                        <img
                                          alt={item.name}
                                          src={item.avatar}
                                          className="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                                        />
                                        <div className="d-flex flex-grow-1 min-width-zero">
                                          <div className="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                            <div className="min-width-zero">
                                              <p className="mb-0 truncate">
                                                {item.name}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </NavLink>
                                      {owner._id === user._id && (
                                        <div className="d-flex flex-grow-1 min-width-zero">
                                          <div className="m-3 pl-3 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                            <div className="min-width-zero">
                                              <Link
                                                to={
                                                  "/app/myrooms/roomview/?id=" +
                                                  this.state.room
                                                }
                                                onClick={(e) =>
                                                  this.kickUser(
                                                    e,
                                                    item._id,
                                                    item.name
                                                  )
                                                }
                                                className="mb-0 truncate"
                                              >
                                                kick
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                }
                              }
                            })}
                        </div>
                      </td>
                    </tr>
                  </Table>
                </PerfectScrollbar>
              </TabPane>
            </TabContent>
          </ApplicationMenu>
          }
        </Fragment>
      );
    else {
      return <Fragment className="loading"></Fragment>;
    }
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
    changeConversation,
  })(ChatApplication)
);
