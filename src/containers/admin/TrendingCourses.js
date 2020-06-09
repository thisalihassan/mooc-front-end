import React, { Component, Fragment } from "react";
import { Row, Card, CardHeader } from "reactstrap";

import { Colxx } from "../../components/CustomBootstrap";
import Pagination from "../../components/pages/Pagination";
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
      currentPage: 1,
      totalPage: 1,
      perPage: 6,
      start: 0,
      end: 6,
    };
  }
  componentDidMount() {
    this.props.GetTopCourses();
  }
  onChangePage(page) {
    const start = page * (page + 1);
    const div = start / 6;
    this.setState({
      currentPage: page,
      start: page == 1 ? 0 : start - (start / 6 == 1 ? 0 : Math.round(div) - 1),
      end: page == 1 ? 6 : start + 7,
    });
  }
  render() {
    const { start, end, currentPage } = this.state;
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
                    this.props.topcourses.slice(start, end).map((product) => {
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
                  )}{" "}
                  {this.props.topcourses && (
                    <Pagination
                      currentPage={currentPage}
                      totalPage={this.props.topcourses.length / 6}
                      onChangePage={(i) => this.onChangePage(i)}
                    />
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
