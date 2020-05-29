import React, { Component } from "react";
import ReactDOM from "react-dom";
import IntlMessages from "../../util/IntlMessages";
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  setContainerClassnames,
  addContainerClassname,
  changeDefaultClassnames
} from "../../redux/actions";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.addEvents = this.addEvents.bind(this);
    this.removeEvents = this.removeEvents.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleProps = this.handleProps.bind(this);
    this.getContainer = this.getContainer.bind(this);
    this.getMenuClassesForResize = this.getMenuClassesForResize.bind(this);
    this.setSelectedLiActive = this.setSelectedLiActive.bind(this);

    this.state = {
      selectedParentMenu: "",
      viewingParentMenu: ""
    };
  }

  handleWindowResize(event) {
    if (event && !event.isTrusted) {
      return;
    }
    const { containerClassnames } = this.props;
    let nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.props.setContainerClassnames(0, nextClasses.join(" "));
  }

  handleDocumentClick(e) {
    const container = this.getContainer();
    let isMenuClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains("menu-button") ||
        e.target.classList.contains("menu-button-mobile"))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      (e.target.parentElement.classList.contains("menu-button") ||
        e.target.parentElement.classList.contains("menu-button-mobile"))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement &&
      e.target.parentElement.parentElement.classList &&
      (e.target.parentElement.parentElement.classList.contains("menu-button") ||
        e.target.parentElement.parentElement.classList.contains(
          "menu-button-mobile"
        ))
    ) {
      isMenuClick = true;
    }
    if (container.contains(e.target) || container === e.target || isMenuClick) {
      return;
    }
    this.toggle(e);
    this.setState({
      viewingParentMenu: ""
    });
  }

  getMenuClassesForResize(classes) {
    const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props;
    let nextClasses = classes.split(" ").filter(x => x !== "");
    const windowWidth = window.innerWidth;
    if (windowWidth < menuHiddenBreakpoint) {
      nextClasses.push("menu-mobile");
    } else if (windowWidth < subHiddenBreakpoint) {
      nextClasses = nextClasses.filter(x => x !== "menu-mobile");
      if (
        nextClasses.includes("menu-default") &&
        !nextClasses.includes("menu-sub-hidden")
      ) {
        nextClasses.push("menu-sub-hidden");
      }
    } else {
      nextClasses = nextClasses.filter(x => x !== "menu-mobile");
      if (
        nextClasses.includes("menu-default") &&
        nextClasses.includes("menu-sub-hidden")
      ) {
        nextClasses = nextClasses.filter(x => x !== "menu-sub-hidden");
      }
    }
    return nextClasses;
  }

  getContainer() {
    return ReactDOM.findDOMNode(this);
  }

  toggle() {
    const { containerClassnames, menuClickCount } = this.props;
    const currentClasses = containerClassnames
      ? containerClassnames.split(" ").filter(x => x !== "")
      : "";

    if (currentClasses.includes("menu-sub-hidden") && menuClickCount === 3) {
      this.props.setContainerClassnames(2, containerClassnames);
    } else if (
      currentClasses.includes("menu-hidden") ||
      currentClasses.includes("menu-mobile")
    ) {
      this.props.setContainerClassnames(0, containerClassnames);
    }
  }

  handleProps() {
    this.addEvents();
  }

  addEvents() {
    ["click", "touchstart"].forEach(event =>
      document.addEventListener(event, this.handleDocumentClick, true)
    );
  }
  removeEvents() {
    ["click", "touchstart"].forEach(event =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    );
  }
  setSelectedLiActive() {
    const oldli = document.querySelector(".sub-menu  li.active");
    if (oldli != null) {
      oldli.classList.remove("active");
    }

    /* set selected parent menu */
    const selectedlink = document.querySelector(".sub-menu  a.active");
    if (selectedlink != null) {
      selectedlink.parentElement.classList.add("active");
      this.setState({
        selectedParentMenu: selectedlink.parentElement.parentElement.getAttribute(
          "data-parent"
        )
      });
    } else {
      var selectedParentNoSubItem = document.querySelector(
        ".main-menu  li a.active"
      );
      if (selectedParentNoSubItem != null) {
        this.setState({
          selectedParentMenu: selectedParentNoSubItem.getAttribute("data-flag")
        });
      } else if (this.state.selectedParentMenu === "") {
        this.setState({
          selectedParentMenu: "app"
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setSelectedLiActive();
      this.toggle();
      window.scrollTo(0, 0);
    }
    this.handleProps();
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
    this.handleProps();
    this.setSelectedLiActive();
  }

  componentWillUnmount() {
    this.removeEvents();
    window.removeEventListener("resize", this.handleWindowResize);
  }

  changeDefaultMenuType(e, containerClassnames) {
    e.preventDefault();
    let nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.props.setContainerClassnames(0, nextClasses.join(" "));
  }

  openSubMenu(e, selectedParent) {
    e.preventDefault();
    const { containerClassnames, menuClickCount } = this.props;
    const currentClasses = containerClassnames
      ? containerClassnames.split(" ").filter(x => x !== "")
      : "";

    if (!currentClasses.includes("menu-mobile")) {
      if (
        currentClasses.includes("menu-sub-hidden") &&
        (menuClickCount === 2 || menuClickCount === 0)
      ) {
        this.props.setContainerClassnames(3, containerClassnames);
      } else if (
        currentClasses.includes("menu-hidden") &&
        (menuClickCount === 1 || menuClickCount === 3)
      ) {
        this.props.setContainerClassnames(2, containerClassnames);
      } else if (
        currentClasses.includes("menu-default") &&
        !currentClasses.includes("menu-sub-hidden") &&
        (menuClickCount === 1 || menuClickCount === 3)
      ) {
        this.props.setContainerClassnames(0, containerClassnames);
      }
    } else {
      this.props.addContainerClassname(
        "sub-show-temporary",
        containerClassnames
      );
    }
    this.setState({
      viewingParentMenu: selectedParent
    });
  }
  changeViewingParentMenu(menu) {
    this.toggle();

    this.setState({
      viewingParentMenu: menu
    });
  }
  RollView(roll) {
    const { user } = this.props;
    let profileImage = require("../../assets/images/" + user.avatar);
    return (
      <Nav vertical className="list-unstyled">
        {roll !== "admin" && (
          <NavItem
            className={classnames({
              "active d-block ":
                (this.state.selectedParentMenu === "profile" &&
                  this.state.viewingParentMenu === "") ||
                this.state.viewingParentMenu === "profile"
            })}
          >
            <NavLink to="/app/profile/profile">
              <img
                width="50"
                height="50"
                className="rounded-circle"
                src={profileImage}
              />
              <p>{user != null && user.name}</p>
            </NavLink>
          </NavItem>
        )}
        {roll !== "admin" && (
          <NavItem
            className={classnames({
              active:
                (this.state.selectedParentMenu === "portal" &&
                  this.state.viewingParentMenu === "") ||
                this.state.viewingParentMenu === "portal"
            })}
          >
            <NavLink
              to="/app/myportal"
              onClick={e => this.openSubMenu(e, "portal")}
            >
              <i className="iconsmind-Digital-Drawing" />{" "}
              <IntlMessages id="menu.portal" />
            </NavLink>
          </NavItem>
        )}
        {roll == "student" && (
          <NavItem
            className={classnames({
              active:
                (this.state.selectedParentMenu === "courses" &&
                  this.state.viewingParentMenu === "") ||
                this.state.viewingParentMenu === "courses"
            })}
          >
            <NavLink to="/app/myCourses/Courses">
              <i className="iconsmind-Air-Balloon" />{" "}
              <IntlMessages id="menu.courses" />
            </NavLink>
          </NavItem>
        )}
        {roll !== "admin" && (
          <NavItem
            className={classnames({
              active:
                (this.state.selectedParentMenu === "rooms" &&
                  this.state.viewingParentMenu === "") ||
                this.state.viewingParentMenu === "rooms"
            })}
          >
            <NavLink to="/app/myrooms/rooms">
              <i className="iconsmind-Pantone" />{" "}
              <IntlMessages id="menu.rooms" />
            </NavLink>
          </NavItem>
        )}
        {roll === "admin" && (
          <NavItem
            className={classnames({
              active:
                (this.state.selectedParentMenu === "visitors" &&
                  this.state.viewingParentMenu === "") ||
                this.state.viewingParentMenu === "visitors"
            })}
          >
            <NavLink to="/app/admin/visitors">
              <i className="iconsmind-Line-Chart" />{" "}
              <IntlMessages id="menu.visitors" />
            </NavLink>
          </NavItem>
        )}

        {roll === "admin" && (
          <NavItem
            className={classnames({
              active:
                (this.state.selectedParentMenu === "courserequest" &&
                  this.state.viewingParentMenu === "") ||
                this.state.viewingParentMenu === "courserequest"
            })}
          >
            <NavLink to="/app/admin/courserequest">
              <i className="iconsmind-Books" />{" "}
              <IntlMessages id="admin.courserequest" />
            </NavLink>
          </NavItem>
        )}

        {roll === "admin" && (
          <NavItem
            className={classnames({
              active:
                (this.state.selectedParentMenu === "manageaccount" &&
                  this.state.viewingParentMenu === "") ||
                this.state.viewingParentMenu === "manageaccount"
            })}
          >
            <NavLink to="/app/admin/manageaccount">
              <i className="iconsmind-Male-2" />{" "}
              <IntlMessages id="admin.manageaccounts" />
            </NavLink>
          </NavItem>
        )}
        {roll === "admin" && (
          <NavItem
            className={classnames({
              active:
                (this.state.selectedParentMenu === "complaints" &&
                  this.state.viewingParentMenu === "") ||
                this.state.viewingParentMenu === "complaints"
            })}
          >
            <NavLink to="/app/admin">
              <i className="iconsmind-Information" />{" "}
              <IntlMessages id="menu.complaints" />
            </NavLink>
          </NavItem>
        )}
        {roll !== "admin" && (
          <NavItem
            className={classnames({
              active:
                (this.state.selectedParentMenu === "messages" &&
                  this.state.viewingParentMenu === "") ||
                this.state.viewingParentMenu === "messages"
            })}
          >
            <NavLink to="/app/messages/chat">
              <i className="simple-icon-bubbles" />{" "}
              <IntlMessages id="menu.messages" />
            </NavLink>
          </NavItem>
        )}
        {roll !== "admin" && (
          <NavItem
            className={classnames({
              active:
                (this.state.selectedParentMenu === "help" &&
                  this.state.viewingParentMenu === "") ||
                this.state.viewingParentMenu === "help"
            })}
          >
            <NavLink to="/app/help">
              <i className="iconsmind-Pantone" />{" "}
              <IntlMessages id="menu.help" />
            </NavLink>
          </NavItem>
        )}
      </Nav>
    );
  }
  render() {
    let roll;
    if (this.props.user) {
      roll = this.props.user.roll.toLowerCase();

      return (
        <div className="sidebar">
          <div className="main-menu">
            <div className="scroll">
              <PerfectScrollbar
                options={{ suppressScrollX: true, wheelPropagation: false }}
              >
                {this.RollView(roll)}
              </PerfectScrollbar>
            </div>
          </div>

          <div className="sub-menu">
            <div className="scroll">
              <PerfectScrollbar
                options={{ suppressScrollX: true, wheelPropagation: false }}
              >
                <Nav
                  className={classnames({
                    "d-block":
                      (this.state.selectedParentMenu === "portal" &&
                        this.state.viewingParentMenu === "") ||
                      this.state.viewingParentMenu === "portal"
                  })}
                  data-parent="portal"
                >
                  {roll === "admin" && (
                    <NavItem>
                      <NavLink to="/app/admin">
                        <i className="simple-icon-credit-card" />{" "}
                        <IntlMessages id="Portal" />
                      </NavLink>
                    </NavItem>
                  )}

                  <NavItem>
                    <NavLink to="/app/myportal/anouncements">
                      <i className="simple-icon-credit-card" />{" "}
                      <IntlMessages id="menu.Anouncements" />
                    </NavLink>
                  </NavItem>

                  {roll !== "admin" && (
                    <NavItem>
                      <NavLink to="/app/myportal/quiz">
                        <i className="simple-icon-list" />{" "}
                        <IntlMessages id="menu.quizes" />
                      </NavLink>
                    </NavItem>
                  )}
                  {roll === "teacher" && (
                    <NavItem>
                      <NavLink to="/app/mycourses/wizard">
                        <i className="simple-icon-list" />{" "}
                        <IntlMessages id="menu.addCourse" />
                      </NavLink>
                    </NavItem>
                  )}
                  {roll !== "admin" && (
                    <NavItem>
                      <NavLink to="/app/myportal/assignment">
                        <i className="simple-icon-grid" />{" "}
                        <IntlMessages id="menu.assignments" />
                      </NavLink>
                    </NavItem>
                  )}
                  {roll === "admin" && (
                    <NavItem>
                      <NavLink to="/app/myportal/image-list">
                        <i className="simple-icon-grid" />
                        <IntlMessages id="menu.blockedAccounts" />
                      </NavLink>
                    </NavItem>
                  )}
                  {roll === "admin" && (
                    <NavItem>
                      <NavLink to="/app/myportal/image-list">
                        <i className="simple-icon-grid" />
                        <IntlMessages id="menu.pendingCourses" />
                      </NavLink>
                    </NavItem>
                  )}
                </Nav>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      );
    } else {
      return <div className="loading"></div>;
    }
  }
}
const mapStateToProps = ({ menu, auth }) => {
  const {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount
  } = menu;
  const { user } = auth;
  return {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount,
    user
  };
};
export default withRouter(
  connect(mapStateToProps, {
    setContainerClassnames,
    addContainerClassname,
    changeDefaultClassnames
  })(Sidebar)
);
