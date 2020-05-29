import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import Pagination from "../../components/DatatablePagination";
import {
  Row,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Card,
  CardHeader,
  CardTitle,
  Button
} from "reactstrap";
import classnames from "classnames";
import { Colxx } from "../../components/CustomBootstrap";
import IntlMessages from "../../util/IntlMessages";
import { injectIntl } from "react-intl";

import { getReportedAccounts, AcceptProfile } from "../../redux/actions";
import { NavLink } from "react-router-dom";
class ProfilePortfolio extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);

    this.state = {
      activeTab: "1",
      columns: [
        {
          Header: "Name",
          accessor: "name",
          Cell: props => (
            <NavLink
              to={"/app/profile/userprofile/?id=" + props.original.reported._id}
              className="w-40 w-sm-100"
            >
              {props.original.reported.name}
            </NavLink>
          )
        },

        {
          Header: "Total reports",
          accessor: "category",
          Cell: props => (
            <p className="text-muted">{props.original.reporter.length}</p>
          )
        },
        {
          Header: "Action",
          accessor: "accept",
          Cell: props => (
            <div>
              <Button outline color="danger" className="icon-button">
                <i
                  className="simple-icon-check"
                  onClick={e =>
                    this.DeleteAccount(e, props.original.reported._id)
                  }
                />
              </Button>
              <Button outline className="icon-button">
                <i
                  className="simple-icon-close"
                  onClick={e =>
                    this.ApproveAccount(e, props.original.reported._id)
                  }
                />
              </Button>
            </div>
          )
        }
      ]
    };
  }
  ApproveAccount(e, id) {
    e.preventDefault();
    console.log(id);
    this.props.AcceptProfile(id);
    window.location.reload();
  }
  DeleteAccount(e, id) {
    e.preventDefault();
    console.log(id);
    // this.props.AcceptProfile(id);
    // window.location.reload();
  }
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount() {
    this.props.getReportedAccounts();
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>
              <IntlMessages id="admin.manageaccount" />
            </h1>
            <Card>
              <CardHeader>
                <Nav tabs className="card-header-tabs " id="nav">
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeFirstTab === "1",
                        "nav-link": true
                      })}
                      onClick={() => {
                        this.toggleTab("1");
                      }}
                      to="#"
                    >
                      <IntlMessages id="admin.Blockreq" />
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Colxx xl="1" lg="1" className="mb-4"></Colxx>
                      <Colxx xl="10" lg="12" className="mb-4">
                        <CardTitle>
                          <h2>
                            {" "}
                            <IntlMessages id="admin.Blockreq" />
                          </h2>
                        </CardTitle>
                        <br></br>
                        <ReactTable
                          defaultPageSize={6}
                          data={this.props.reportedAccounts}
                          columns={this.state.columns}
                          minRows={0}
                          showPageJump={false}
                          showPageSizeOptions={false}
                          PaginationComponent={Pagination}
                        />
                      </Colxx>
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
const mapStateToProps = state => {
  const { reportedAccounts } = state.profile;
  return { reportedAccounts };
};

export default injectIntl(
  connect(mapStateToProps, { getReportedAccounts, AcceptProfile })(
    ProfilePortfolio
  )
);
