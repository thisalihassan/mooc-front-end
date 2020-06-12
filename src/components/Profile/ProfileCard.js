import React, { Fragment } from "react";
import { Table } from "reactstrap";
import PropTypes from "prop-types";
import Rating from "../../components/Rating";
class OtherViewCard extends React.Component {
  static propTypes = {
    theCourses: PropTypes.number,
    major: PropTypes.string,
    follower: PropTypes.string
  };

  render() {
    return (
      <Fragment>
        <div className="text-center">
          <br></br>
          <br></br>
          <h2>D E T A I L S</h2>
          <br></br>
          <Table borderless>
            <tbody>
              <tr>
                <th scope="row">Major</th>
                <td>{this.props.major}</td>
              </tr>
              <tr>
                <th scope="row">Ratings</th>
                <td>
                  <Rating
                    total={5}
                    rating={this.props.rating}
                    interactive={false}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Reviews</th>
                <td>{this.props.review}</td>
              </tr>
              <tr>
                <th scope="row">Subscribers</th>
                <td colSpan="2">{this.props.follower}</td>
              </tr>
              <tr>
                <th scope="row">Courses</th>
                <td colSpan="2">{this.props.theCourses}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Fragment>
    );
  }
}

export default OtherViewCard;
