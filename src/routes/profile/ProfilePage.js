import { getCurrentProfile } from "../../redux/actions";
import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  Button,
  TabContent,
  TabPane,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Rating from "../../components/Rating";
import { Colxx } from "../../components/CustomBootstrap";
import IntlMessages from "../../util/IntlMessages";
import { injectIntl } from "react-intl";
import DropzoneExample from "../../components/DropzoneExample";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeFirstTab: "1",
      modal: false,
    };
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab,
      });
    }
  }
  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { profile } = this.props.profile;
    let profileImage = null;
    const { user } = this.props.authUser;
    if (user) {
      profileImage = user.avatar;
    }
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <TabContent activeTab={this.state.activeFirstTab}>
              <TabPane tabId="1">
                <Row>
                  <Colxx xxs="12" lg="4" className="mb-4">
                    <Card className="mb-4">
                      <div className="position-absolute card-top-buttons">
                        <Button outline className="icon-button">
                          <i
                            className="simple-icon-pencil"
                            onClick={this.toggle}
                          />
                        </Button>
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
                      </div>
                      <img
                        src={profileImage}
                        alt="Detail"
                        className="card-img-top"
                      />

                      <CardBody>
                        <h1>{user && user.name}</h1>
                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.description" />
                        </p>
                        <p className="mb-3">{profile && profile.description}</p>
                        {user && user.roll == "teacher" && (
                          <p className="text-muted text-small mb-2">
                            <IntlMessages id="pages.rating" />
                          </p>
                        )}
                        {user && user.roll == "teacher" && (
                          <div className="mb-3">
                            <Rating total={5} rating={3} interactive={false} />
                          </div>
                        )}

                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.skills" />
                        </p>
                        <div className="mb-3">
                          <p className="d-sm-inline-block mb-1">
                            {profile &&
                              profile.skills &&
                              profile.skills.map((skill) => (
                                <Badge
                                  key={skill}
                                  color="outline-secondary mb-1 mr-1"
                                  pill
                                >
                                  {skill}
                                </Badge>
                              ))}
                          </p>
                        </div>
                      </CardBody>
                    </Card>
                  </Colxx>
                </Row>
              </TabPane>

              <TabPane tabId="4"></TabPane>
            </TabContent>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const authUser = state.auth;
  const profile = state.profile;
  return { authUser, profile };
};

export default injectIntl(
  connect(mapStateToProps, { getCurrentProfile })(ProfilePage)
);
