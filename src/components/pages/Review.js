import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { injectIntl } from "react-intl";
import Rating from "../Rating";
import { Separator, Colxx } from "../../components/CustomBootstrap";
class Review extends Component {
  render() {
    let thumb = this.props.data.student.avatar;

    return (
      <div
        className={"d-flex flex-row mb-3 border-bottom justify-content-between"}
      >
        <Colxx md="10">
          <NavLink
            to={`/app/profile/userprofile/?profile=${this.props.data.student._id}`}
          >
            <img
              src={thumb}
              alt={this.props.data.name}
              className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
            />
          </NavLink>
          <div className="pl-3 flex-grow-1">
            <NavLink
              to={`/app/profile/userprofile/?profile=${this.props.data.student._id}`}
            >
              <p className="font-weight-medium mb-0">
                {this.props.data.student.name}
              </p>
            </NavLink>
            <div
              className="mt-3"
              dangerouslySetInnerHTML={{
                __html: this.props.data.review,
              }}
            ></div>
          </div>
        </Colxx>
        <Colxx md="2">
          <span>
            <Rating
              total={5}
              rating={this.props.data.rating}
              interactive={false}
            />
          </span>
        </Colxx>
      </div>
    );
  }
}

export default injectIntl(Review);
