import React, { Component } from "react";
import {
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import Logo from "./logo.png";
import { Image } from "react-bootstrap";
import { menuHiddenBreakpoint } from "../../../constants/defaultValues";
import { Link } from "react-router-dom";
const options = [
  "Business",
  "IT and Software",
  "Artificial Intelligence",
  "Programming and Development",
  "Accounting",
  "Photography",
  "Data Science",
  "Design",
  "Music",
];
export default class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
  }
  handleSearchIconClick = (e) => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains("search")) {
        if (e.target.parentElement.classList.contains("search")) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains("search")
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains("mobile-view")) {
        this.search();
        elem.classList.remove("mobile-view");
        this.removeEventsSearch();
      } else {
        elem.classList.add("mobile-view");
        this.addEventsSearch();
      }
    } else {
      this.search();
    }
  };
  handleSearchInputChange(e) {
    this.setState({
      searchKeyword: e.target.value,
    });
  }
  handleSearchChange = (selection) => {
    this.props.history.push("/mooc/category/?category=" + selection);
  };
  handleSearchInputKeyPress(e) {
    if (e.key === "Enter") {
      this.props.history.push(
        "/mooc/search/?search=" + this.state.searchKeyword + "&r=" + true
      );
    }
  }
  render() {
    return (
      <nav className="navbar">
        <a href="/">
          <Image width="35%" heaight="35%" src={Logo} id="img"></Image>
        </a>
        <div className="d-inline-block">
          <UncontrolledDropdown className="ml-2">
            <DropdownToggle
              caret
              color="light"
              size="sm"
              className="language-button"
            >
              CATEGORY
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              {options.map((item, index) => {
                return (
                  <DropdownItem
                    onClick={() => this.handleSearchChange(item)}
                    key={index}
                  >
                    {item}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <div className="search" data-search-path="/app/layouts/search">
          <Input
            name="searchKeyword"
            id="searchKeyword"
            placeholder="search"
            value={this.state.searchKeyword}
            onChange={(e) => this.handleSearchInputChange(e)}
            onKeyPress={(e) => this.handleSearchInputKeyPress(e)}
          />
          <span
            className="search-icon"
            onClick={(e) => this.handleSearchIconClick(e)}
          >
            <i className="simple-icon-magnifier" />
          </span>
        </div>
        <Link to="/login">
          <button
            className="btn btn-empty d-none d-sm-inline-block"
            type="button"
          >
            LOGIN
          </button>
        </Link>
        <Link to="/register">
          <button
            className="btn btn-empty d-none d-sm-inline-block"
            type="button"
          >
            JOIN US
          </button>
        </Link>
      </nav>
    );
  }
}
