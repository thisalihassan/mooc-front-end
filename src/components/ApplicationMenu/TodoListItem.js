import React from "react";
import { Card, CardBody } from "reactstrap";
import { Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { Colxx } from "../CustomBootstrap";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  deleteItem = e => {
    this.props.deleteClick(this.props.item._id);
  };
  render() {
    const item = this.props.item;
    return (
      <Colxx xxs="12">
        <Card className="card d-flex mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
              <NavLink
                to="#"
                id={`toggler${item._id}`}
                className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
              >
                <span className="align-middle d-inline-block">
                  {this.props.name}
                </span>
              </NavLink>
              <p className="mb-1 text-muted text-small w-15 w-xs-100">
                {moment(item.date).format("LLL")}
              </p>
              <div className="card-body pt-1">
                <p className="mb-0">{item.description}</p>
              </div>
            </CardBody>
            {this.props.roll.toLowerCase() === "teacher" && (
              <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                <Dropdown>
                  <Dropdown.Toggle className="icon-button"></Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      href={`/app/myportal/anouncements/?id=${this.props.item._id}`}
                    >
                      Edit
                    </Dropdown.Item>

                    <Dropdown.Item onClick={this.deleteItem}>
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </div>
        </Card>
      </Colxx>
    );
  }
}

export default React.memo(ListItem);
