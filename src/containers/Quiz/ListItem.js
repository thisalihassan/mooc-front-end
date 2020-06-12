import React from "react";
import { Card, CardBody, Badge } from "reactstrap";
import { Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { Colxx } from "../../components/CustomBootstrap";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  deleteItem = e => {
    this.props.deleteClick(this.props.item._id);
  };
  render() {
    return (
      <Colxx xxs="12">
        <Card className="card d-flex flex-row mb-3" id="rest">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
              <NavLink
                to={`/app/myportal/openquiz/?id=${this.props.item._id}&cid=${this.props.item.course._id}`}
                className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
              >
                <i className="" />
                <span className="align-middle d-inline-block">
                  {this.props.item.title}
                </span>
              </NavLink>
              <p className="mb-1 text-muted text-small w-15 w-xs-100">
                {this.props.item.course.name}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-xs-100">
                {moment(this.props.item.date).format("DD/MM/YYYY")}
              </p>
            </CardBody>
            {this.props.roll.toLowerCase() === "teacher" && (
              <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                <Dropdown>
                  <Dropdown.Toggle className="icon-button"></Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      href={`/app/myportal/quiz/?id=${this.props.item._id}`}
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
