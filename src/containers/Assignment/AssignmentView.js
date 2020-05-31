import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { Colxx } from "../../components/CustomBootstrap";
// import IntlMessages from "../../util/IntlMessages";
import ThumbnailImage from "../../components/cards/ThumbnailImage";
class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Colxx xxs="12">
        <Card className="card d-flex flex-row mb-3">
          <div className="d-flex flex-grow-1 min-width-zero">
            <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
              <Link
                to="#"
                className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
              >
                <ThumbnailImage
                  rounded
                  small
                  src={this.props.item.user.avatar}
                  alt="profile"
                  className="m-4"
                />
                <i className="" />
                <span className="align-middle d-inline-block">
                  {this.props.item.user.name}
                </span>
              </Link>
              <a
                href={this.props.item.file}
                target="_blank"
                download
                className="mb-1 text-small w-15 w-xs-100"
              >
                Download
              </a>
            </CardBody>
          </div>
        </Card>
      </Colxx>
    );
  }
}

export default React.memo(ListItem);
