import React, { Component, Fragment } from "react";
import {
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Label,
  Input,
  Button,
} from "reactstrap";
import Pagination from "../../components/pages/Pagination";
import DataListView from "../../components/pages/DataListView";
import { connect } from "react-redux";
import { GetSubscription, getRooms, setAlert } from "../../redux/actions";
import axios from "axios";
import { URL, config } from "../../constants/defaultValues";
import { Separator } from "../../components/CustomBootstrap";
import { Image } from "react-bootstrap";
import RoomSvg from "./room.svg";
class ThumbListPages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      totalPage: 1,
      selectedItems: [],
      isLoading: false,
      firstRun: true,
      listCourse: [],
      guidelines: "",
      modalOpen: false,
      id: "",
    };
  }
  async componentDidMount() {
    await this.props.GetSubscription();
    // this.dataListRender();
  }

  async componentDidUpdate() {
    if (this.props.user && this.state.firstRun) {
      await this.loadRoom();
    }
  }

  async loadRoom() {
    if (this.props.user.roll === "student") {
      if (this.props.courses) {
        this.makecoursesList();
        const course = this.state.listCourse;
        const roll = this.props.user.roll;
        const body = JSON.stringify({ course, roll });
        await this.props.getRooms(body);
        this.setState({ firstRun: false });
      }
    }
    if (this.props.user.roll === "teacher") {
      const roll = this.props.user.roll;
      const body = JSON.stringify({ roll });
      await this.props.getRooms(body);
      this.setState({ firstRun: false });
    }
  }
  makecoursesList() {
    for (const key of Object.keys(this.props.courses)) {
      this.state.listCourse[key] = this.props.courses[key]._id;
    }
  }
  onChangePage = (page) => {
    this.setState(
      {
        currentPage: page,
      },
      () => this.dataListRender()
    );
  };

  async deleteRoom(id) {
    await axios.post(URL + "api/room/remove/" + id, {}, config);
    await this.loadRoom();
  }
  async editRoom(id) {
    const res = await axios.post(URL + "api/room/find/" + id, {}, config);
    this.setState({ guidelines: res.data.guidelines, id: res.data._id });
    this.toggleModal();
  }

  async joinRoom(myroom) {
    const id = this.props.user._id;
    const body = JSON.stringify({ id, myroom });
    await axios
      .post(URL + "api/room/findkick", body, config)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (!data) {
          this.props.history.push("/app/myrooms/roomview/?id=" + myroom);
        } else {
          this.props.setAlert(`You cannot join the room now`, "danger");
        }
      });
  }
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };
  async editedRoom(e) {
    e.preventDefault();
    const guidelines = this.state.guidelines;
    const id = this.state.id;
    const body = JSON.stringify({ guidelines, id });
    await axios.post(URL + "api/room/update/", body, config);
    this.setState({ guidelines: "", id: "" });
    this.toggleModal();
  }
  render() {
    return (
      <Fragment>
        <Modal
          isOpen={this.state.modalOpen}
          toggle={this.toggleModal}
          backdrop="static"
        >
          <ModalHeader toggle={this.toggleModal}>Edit Room</ModalHeader>
          <ModalBody>
            <Label>Room GuideLines</Label>
            <Input
              type="text"
              name="guidelines"
              value={this.state.guidelines}
              onChange={(e) => {
                this.setState({ guidelines: e.target.value });
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="button-outline"
              onClick={(e) => this.editedRoom(e)}
            >
              Accept
            </Button>{" "}
            <Button
              color="secondary"
              className="button-outline"
              onClick={this.toggleModal}
            >
              Reject
            </Button>
          </ModalFooter>
        </Modal>
        <h1>My Rooms</h1>
        <Separator></Separator>
        <br></br>
        <br></br>
        {!this.props.loading ? (
          <div className="disable-text-selection">
            <Row>
              {this.props.rooms ? (
                this.props.rooms.length > 0 ? (
                  this.props.rooms.map((product) => {
                    return (
                      <DataListView
                        key={product._id}
                        user={this.props.user._id}
                        product={product}
                        deleteClick={(id) => {
                          this.deleteRoom(id);
                        }}
                        editClick={(id) => {
                          this.editRoom(id);
                        }}
                        joinRoom={(id) => {
                          this.joinRoom(id);
                        }}
                      />
                    );
                  })
                ) : (
                  <div class="imgNullContainer h-100 d-flex justify-content-center align-items-center">
                    <Image
                      className="mt-5"
                      style={{ width: "45%" }}
                      src={RoomSvg}
                      alt="Snow"
                    />

                    {this.props.user.roll === "student" ? (
                      <div class="img_centered_c">
                        <h3>You don't have any online Rooms</h3>
                      </div>
                    ) : (
                      <div class="img_centered_c">
                        <h3>
                          You can try making a room by going to one of your
                          courses!!
                        </h3>
                      </div>
                    )}
                  </div>
                )
              ) : (
                <div className="loading"></div>
              )}

              {this.props.courses && (
                <Pagination
                  currentPage={this.state.currentPage}
                  totalPage={this.props.courses.length / 12}
                  onChangePage={(i) => this.onChangePage(i)}
                />
              )}
              {/* <ContextMenuContainer
              onContextMenuClick={this.onContextMenuClick}
              onContextMenu={this.onContextMenu}
            /> */}
            </Row>
          </div>
        ) : (
          <div className="loading"></div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth, subscribtion, room }) => {
  const { user } = auth;
  const { courses } = subscribtion.subscribed;
  const { rooms, loading } = room;
  return {
    courses,
    user,
    rooms,
    loading,
  };
};
export default connect(mapStateToProps, {
  GetSubscription,
  setAlert,
  getRooms,
})(ThumbListPages);
