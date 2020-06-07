import React from "react";
import { Card } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../CustomBootstrap";
import moment from "moment";
class DataListView extends React.Component {
  constructor(props) {
    super(props);
  }
  deleteItem = e => {
    this.props.deleteClick(this.props.product._id);
  };
  editItem = e => {
    this.props.editClick(this.props.product._id);
  };
  joinRoom = e => {
    this.props.joinRoom(this.props.product._id);
  };
  render() {
    return (
      <Colxx xxs="12" className="mb-3">
        <ContextMenuTrigger id="menu_id" data={this.props.product._id}>
          <Card className="d-flex flex-row">
            <div className="pl-2 d-flex flex-grow-1 min-width-zero">
              <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                <NavLink
                  to={`/app/mycourses/courseView/?id=${this.props.product.course._id}`}
                  className="w-40 w-sm-100"
                >
                  <p className="list-item-heading mb-1 truncate">
                    {this.props.product.course.name}
                  </p>
                </NavLink>
                <p className="mb-1 text-muted text-small w-15 w-sm-100">
                  {`Created on ${moment(this.props.product.date).format(
                    "LLL"
                  )}`}
                </p>
              </div>
              {this.props.user === this.props.product.user && (
                <div className="pl-2 align-self-center pr-3">
                  <Link onClick={this.deleteItem}>Delete Room</Link>
                </div>
              )}
              {this.props.user === this.props.product.user && (
                <div className="pl-2 align-self-center pr-3">
                  <Link onClick={this.editItem}>Edit Room</Link>
                </div>
              )}
              <div className="pl-2 align-self-center pr-3">
                <Link onClick={this.joinRoom} to="/app/myrooms/rooms/">
                  Join Room
                </Link>
              </div>
            </div>
          </Card>
        </ContextMenuTrigger>
      </Colxx>
    );
  }
}

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);
