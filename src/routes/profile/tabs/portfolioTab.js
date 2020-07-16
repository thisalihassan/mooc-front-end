import React from "react";
import { withRouter } from "react-router-dom";
import {
  Row,
  Card,
  CardBody,
  Badge,
  CardSubtitle,
  CardText,
  CardImg,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import moment from "moment";
import { Dropdown } from "react-bootstrap";
import IntlMessages from "../../../util/IntlMessages";
import { Colxx } from "../../../components/CustomBootstrap";
import Rating from "../../../components/Rating";
import DropzoneExample from "../../../components/DropzoneExample";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import Pagination from "../../../components/pages/Pagination";
import { URL, config } from "../../../constants/defaultValues";
class TheProfile extends React.Component {
  static propTypes = {
    skills: PropTypes.array,
    description: PropTypes.string,
    user: PropTypes.object,
    major: PropTypes.string,
    education: PropTypes.array,
    myCourses: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      upload: "api/auth/avatar",
      currentPage: 1,
      perPage: 6,
      start: 0,
      end: 6,
    };
  }
  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };
  async RemoveAvatar(e) {
    e.preventDefault();
    await axios.post(URL + "api/auth/avatar", {}, config).then((res) => {
      this.props.history.push("/");
    });
  }

  async deleteCourse(e, id) {
    e.preventDefault();
    await axios.delete(URL + "api/Courses/delete/" + id, {}, config);

    this.props.history.push("/");
  }
  onChangePage(page) {
    const start = page * (page + 1);
    const div = start / 6;
    this.setState({
      currentPage: page,
      start:
        page === 1 ? 0 : start - (start / 6 === 1 ? 0 : Math.round(div) - 1),
      end: page === 1 ? 6 : start + 7,
    });
  }
  render() {
    let profileImage;
    let imageName;
    if (this.props.user) {
      profileImage = this.props.user.avatar;
      imageName =
        "https://res.cloudinary.com/mooc/image/upload/v1590922028/profile/2020-05-31T10:47:02.070Z.jpg";
    }

    const { start, end, currentPage } = this.state;
    return (
      <Row>
        <Colxx xxs="12" lg="4" className="mb-4 col-left">
          <Card className="mb-4" id="rest">
            <Dropdown
              color={"white"}
              outline
              className="position-absolute card-top-buttons"
            >
              <Dropdown.Toggle className="icon-button simple-icon-pencil"></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={this.toggle}>
                  {imageName === profileImage ? "Add" : "Update"}
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => this.RemoveAvatar(e)}>
                  Remove
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>
                <IntlMessages id="modal.modal-title" />
              </ModalHeader>
              <ModalBody>
                <DropzoneExample />
              </ModalBody>
            </Modal>
            <img src={profileImage} alt="img here" className="card-img-top" />

            {this.props.user && this.props.user.roll === "teacher" && (
              <CardBody>
                <h6>
                  <IntlMessages id="pages.rating" />
                </h6>

                <div className="mb-3">
                  <Rating total={5} rating={3} interactive={false} />
                </div>
              </CardBody>
            )}
          </Card>
        </Colxx>

        <Colxx xxs="12" lg="8" className="mb-4 col-right">
          <Row>
            {this.props.myCourses &&
              this.props.myCourses.slice(start, end).map((course) => {
                return (
                  <Colxx
                    xxs="12"
                    lg="6"
                    xl="4"
                    className="mb-4"
                    key={course._id}
                  >
                    <Card className="course" id="course" key={course._id + "1"}>
                      <div className="position-relative">
                        {this.props.user.roll.toLowerCase() === "teacher" && (
                          <div className="position-absolute card-top-buttons">
                            <Dropdown>
                              <Dropdown.Toggle className="icon-button"></Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item
                                  href={
                                    "/app/mycourses/wizard/?id=" + course._id
                                  }
                                >
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={(e) =>
                                    this.deleteCourse(e, course._id)
                                  }
                                >
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        )}
                        <NavLink
                          to={"/app/mycourses/courseView/?id=" + course._id}
                          className="w-40 w-sm-100"
                        >
                          <CardImg
                            className=".card-img-details"
                            alt={course.name}
                            src={course.pic}
                          />
                        </NavLink>

                        {this.props.user.roll.toLowerCase() === "teacher" && (
                          <Badge
                            color={course.statusColor}
                            pill
                            className="position-absolute badge-top-left"
                          >
                            {course.Approval}
                          </Badge>
                        )}
                      </div>
                      <CardBody>
                        <NavLink
                          to={"/app/mycourses/courseView/?id=" + course._id}
                          className="w-40 w-sm-100"
                        >
                          <CardSubtitle>{course.name}</CardSubtitle>
                        </NavLink>
                        <CardText className="text-muted text-small mb-0 font-weight-light">
                          {moment(course.date).format("YYYY MMM DD")}
                        </CardText>
                      </CardBody>
                    </Card>
                  </Colxx>
                );
              })}
            {this.props.myCourses && (
              <Pagination
                currentPage={currentPage}
                totalPage={Math.ceil(this.props.myCourses.length / 6)}
                onChangePage={(i) => this.onChangePage(i)}
              />
            )}
          </Row>
        </Colxx>
      </Row>
    );
  }
}
// const mapStateToProps = state => {
//   const authUser = state.auth;
//   const profile = state.profile;
//   return { authUser, profile };
// };
export default withRouter(TheProfile);
