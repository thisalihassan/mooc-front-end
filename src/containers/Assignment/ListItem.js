import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import SubmitAssignment from "./SubmitAssingment";
import { Colxx } from "../../components/CustomBootstrap";
import IntlMessages from "../../util/IntlMessages";
import moment from "moment";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }
  deleteItem = (e) => {
    this.props.deleteClick(this.props.item._id);
  };
  editAssignment = (e) => {
    this.props.editAssignment(this.props.item._id);
  };
  reloadModel = (e) => {
    this.props.reloadModel();
  };
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };
  render() {
    const { modalOpen } = this.state;
    return (
      <Colxx xxs="12">
        <Card className="card d-flex flex-row mb-3" id="rest">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
              {this.props.roll === "teacher" ? (
                <Link
                  to={`/app/myportal/viewassignment/${this.props.item._id}`}
                  className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
                >
                  <span className="align-middle d-inline-block">
                    {this.props.item.title}
                  </span>
                </Link>
              ) : (
                <Link
                  to="#"
                  className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
                >
                  <span className="align-middle d-inline-block">
                    {this.props.item.title}
                  </span>
                </Link>
              )}
              <p className="mb-1 text-muted text-small w-15 w-xs-100">
                {this.props.name}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-xs-100">
                {moment(this.props.item.duedate).format("LL")}
              </p>
              <a
                href={this.props.item.file}
                target="_blank"
                download
                className="mb-1 text-small w-15 w-xs-100"
              >
                Download
              </a>
            </CardBody>
            {this.props.roll === "teacher" ? (
              <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                <Dropdown>
                  <Dropdown.Toggle className="icon-button"></Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={this.editAssignment}>
                      Edit
                    </Dropdown.Item>

                    <Dropdown.Item onClick={this.deleteItem}>
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <div className="float-sm-right">
                <Button
                  outline
                  color="primary"
                  className="mt-3 float-right"
                  onClick={this.toggleModal}
                >
                  <IntlMessages id="assignment.submit" />
                </Button>
                <SubmitAssignment
                  id={this.props.item._id}
                  reloadModel={(e) => this.reloadModel(e)}
                  toggleModal={this.toggleModal}
                  modalOpen={modalOpen}
                />
              </div>
            )}
          </div>
        </Card>
      </Colxx>
    );
  }
}

export default React.memo(ListItem);
