import React from "react";
import { withRouter } from "react-router-dom";
import {
  Row,
  Card,
  CardBody,
  Button,
  Badge,
  CardSubtitle,
  CardText,
  CardImg,
  Modal,
  ModalHeader,
  ModalFooter,
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

  render() {
    let profileImage;
    let imageName;
    if (this.props.user) {
      profileImage = this.props.user.avatar;
      imageName =
        "https://res.cloudinary.com/mooc/image/upload/v1590922028/profile/2020-05-31T10:47:02.070Z.jpg";
    }

    return (
      <Row>
        <Colxx xxs="12" lg="4" className="mb-4 col-left">
          <Card className="mb-4">
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
              <ModalFooter>
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
            <img
              src={profileImage}
              alt="display picture"
              className="card-img-top"
            />

            <CardBody>
              {/* <p className="text-muted text-small mb-2">
                <IntlMessages id="pages.AboutMe" />
              </p>
              <p className="mb-3">{this.props.description}</p>
              <p className="text-muted text-small mb-2">
                <IntlMessages id="pages.status" />
              </p>
              <p className="mb-3">{this.props.major}</p> */}

              <h6>
                <IntlMessages id="pages.rating" />
              </h6>

              <div className="mb-3">
                <Rating total={5} rating={3} interactive={false} />
              </div>

              {/* <p className="text-muted text-small mb-2">
                <IntlMessages id="pages.skills" />
              </p>
              <p className="mb-3">
                <p className="d-sm-inline-block mb-1">
                  {this.props.skills &&
                    this.props.skills.map(skill => (
                      <Badge
                        key={skill}
                        color="outline-secondary mb-1 mr-1"
                        pill
                      >
                        {skill}
                      </Badge>
                    ))}
                </p>
              </p> */}
              {/* <p className="mb-3">
                <Table>
                  <thead>
                    <tr>
                      <th className="text-muted text-small mb-2">
                        Field of Study
                      </th>
                      <th className="text-muted text-small mb-2">
                        Current Education
                      </th>
                      <th className="text-muted text-small mb-2">From</th>
                      <th className="text-muted text-small mb-2">To</th>
                    </tr>
                  </thead>{" "}
                  <tbody>
                    {this.props.education &&
                      this.props.education.map(edu => (
                        <tr key={edu._id}>
                          <td className="text-muted text-small mb-2">
                            {edu.fieldofstudy}
                          </td>
                          <td className="text-muted text-small mb-2">
                            {edu.current}
                          </td>
                          <td className="text-muted text-small mb-1">
                            {moment(edu.from).format("YYYY-MM-DD")}
                          </td>
                          <td className="text-muted text-small mb-1">
                            {moment(edu.to).format("YYYY-MM-DD")}
                          </td>{" "}
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </p> */}
              {/* <h6>
                <IntlMessages id="pages.contact" />
              </h6>
              <div className="social-icons">
                <ul className="list-unstyled list-inline">
                  <li className="list-inline-item">
                    <NavLink to="#">
                      <i className="simple-icon-social-facebook"></i>
                    </NavLink>
                  </li>
                  <li className="list-inline-item">
                    <NavLink to="#">
                      <i className="simple-icon-social-twitter"></i>
                    </NavLink>
                  </li>
                  <li className="list-inline-item">
                    <NavLink to="#">
                      <i className="simple-icon-social-instagram"></i>
                    </NavLink>
                  </li>
                </ul>
              </div> */}
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" lg="8" className="mb-4 col-right">
          <Row>
            {this.props.myCourses ? (
              this.props.myCourses.map((course) => {
                return (
                  <Colxx
                    xxs="12"
                    lg="6"
                    xl="4"
                    className="mb-4"
                    key={course._id}
                  >
                    <Card className="course" id="course">
                      <div className="position-relative">
                        <div className="position-absolute card-top-buttons">
                          <Dropdown>
                            <Dropdown.Toggle className="icon-button" ></Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                href={"/app/mycourses/wizard/?id=" + course._id}
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

                        <Badge
                          color={course.statusColor}
                          pill
                          className="position-absolute badge-top-left"
                        >
                          {course.Approval}
                        </Badge>
                      </div>
                      <CardBody>
                        <NavLink
                          to={"/app/mycourses/courseView/?id=" + course._id}
                          className="w-40 w-sm-100"
                        >
                          <CardSubtitle>{course.name}</CardSubtitle>
                        </NavLink>
                        <CardText className="text-muted text-small mb-0 font-weight-light">
                          {moment(course.date).format("'YYYY MM DD")}
                        </CardText>
                      </CardBody>
                    </Card>
                  </Colxx>
                );
              })
            ) : (
              <div className="loading"></div>
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
