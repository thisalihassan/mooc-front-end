import React, { Component, Fragment } from "react";
import { Row, Card, CardHeader } from "reactstrap";

import { Colxx } from "../../components/CustomBootstrap";

import ImageListView from "../../components/pages/ImageListView";
import { connect } from "react-redux";
import { GetTopCourses } from "../../redux/actions";
function collect(props) {
  return { data: props.data };
}
class TredingCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
    };
  }
  componentDidMount() {
    this.props.GetTopCourses();
  }

  render() {
    return (
      <Fragment>
        <Row>
          <h1>TRENDING COURSES</h1>
          <Colxx lg="1"></Colxx>

          <Colxx xxs="12" lg="10">
            <Card className="big" id="big">
              <CardHeader>
                <br></br>
                <br></br>

                <Row>
                  {!this.props.toploading ? (
                    this.props.topcourses &&
                    this.props.topcourses.map((product) => {
                      return (
                        <ImageListView
                          key={product.id}
                          user={this.props.user}
                          product={product}
                          collect={collect}
                        />
                      );
                    })
                  ) : (
                    <div className="loading"></div>
                  )}
                </Row>
              </CardHeader>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth, subscribtion }) => {
  const { topcourses, toploading } = subscribtion;
  return {
    topcourses,
    toploading,
  };
};
export default connect(mapStateToProps, {
  GetTopCourses,
})(TredingCourses);
