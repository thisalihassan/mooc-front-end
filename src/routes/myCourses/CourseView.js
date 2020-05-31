import React, { Component, Fragment } from "react";
import {
  Row,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Card,
  CardHeader,
} from "reactstrap";

import classnames from "classnames";
import { Colxx } from "../../components/CustomBootstrap";
import IntlMessages from "../../util/IntlMessages";
import { NavLink } from "react-router-dom";
import Pagination from "../../components/pages/Pagination";
import ImageListView from "../../components/pages/ImageListView";
import { connect } from "react-redux";
import { GetSubscription } from "../../redux/actions";
function collect(props) {
  return { data: props.data };
}
class ThumbListPages extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    // this.mouseTrap = require("mousetrap");
    this.state = {
      activeTab: "1",
      currentPage: 1,
      totalPage: 1,
      selectedItems: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    this.props.GetSubscription();
    // this.dataListRender();
    // this.mouseTrap.bind(["ctrl+a", "command+a"], () =>
    //   this.handleChangeSelectAll(false)
    // );
    // this.mouseTrap.bind(["ctrl+d", "command+d"], () => {
    //   this.setState({
    //     selectedItems: []
    //   });
    //   return false;
    // });
  }
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  onChangePage = (page) => {
    this.setState(
      {
        currentPage: page,
      },
      () => this.dataListRender()
    );
  };

  // onContextMenuClick = (e, data, target) => {
  //   console.log(
  //     "onContextMenuClick - selected items",
  //     this.state.selectedItems
  //   );
  //   console.log("onContextMenuClick - action : ", data.action);
  // };

  // onContextMenu = (e, data) => {
  //   const clickedProductId = data.data;
  //   if (!this.state.selectedItems.includes(clickedProductId)) {
  //     this.setState({
  //       selectedItems: [clickedProductId]
  //     });
  //   }

  //   return true;
  // };

  render() {
    return (
      <Fragment>
        <Row>
          <h1>COURSES</h1>
          <Colxx lg="1"></Colxx>

          <Colxx xxs="12" lg="10">
            <Card>
              <CardHeader>
                <br></br>
                <br></br>
                <Nav tabs className="card-header-tabs " id="nav">
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeFirstTab === "1",
                        "nav-link": true,
                      })}
                      onClick={() => {
                        this.toggleTab("1");
                      }}
                      to="#"
                    >
                      <IntlMessages id="student.courses" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeFirstTab === "2",
                        "nav-link": true,
                      })}
                      onClick={() => {
                        this.toggleTab("2");
                      }}
                      to="#"
                    >
                      <IntlMessages id="Student.recommended" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeFirstTab === "3",
                        "nav-link": true,
                      })}
                      onClick={() => {
                        this.toggleTab("3");
                      }}
                      to="#"
                    >
                      <IntlMessages id="student.top" />
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      {this.props.courses &&
                        this.props.courses.map((product) => {
                          return (
                            <ImageListView
                              key={product.id}
                              user={this.props.user}
                              product={product}
                              collect={collect}
                            />
                          );
                        })}

                      {this.props.courses && (
                        <Pagination
                          currentPage={this.state.currentPage}
                          totalPage={this.props.courses.length / 12}
                          onChangePage={(i) => this.onChangePage(i)}
                        />
                      )}
                    </Row>
                  </TabPane>
                </TabContent>
              </CardHeader>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth, subscribtion }) => {
  const { user } = auth;
  const { courses } = subscribtion.subscribed;
  return {
    courses,
    user,
  };
};
export default connect(mapStateToProps, { GetSubscription })(ThumbListPages);
