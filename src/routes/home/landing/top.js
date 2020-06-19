import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Pagination,
  PaginationItem,
  PaginationLink,
  Breadcrumb,
  BreadcrumbItem, 
  Button
} from "reactstrap";
import Logo from "./logo.png";
import { Image } from "react-bootstrap";
import IntlMessages from "../../../util/IntlMessages";
import { Colxx, Separator } from "../../../components/CustomBootstrap";


export default class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };

  render() {
    return (
      <Fragment>
    

   

         <Row>
          <Colxx xxs="12">
            <Card >
              <CardBody id="land">
               

                <Nav pills>
                <NavItem>
                <a className="navbar-logo" href="/">
            <Image width="50%" heaight="50%" src={Logo} id="img"></Image>
            
          </a>
                  </NavItem>
                

                  <UncontrolledDropdown nav id="cate">
                    <DropdownToggle className="nav-link" caret color="empty">
                     CATEGORY
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>
                        <IntlMessages id="nav.header" />
                      </DropdownItem>
                      <DropdownItem disabled>
                        <IntlMessages id="nav.action" />
                      </DropdownItem>
                      <DropdownItem>
                        <IntlMessages id="nav.another-action" />
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        <IntlMessages id="nav.another-action" />
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>

                  <NavItem>
                    <NavLink href="#">
                      <IntlMessages id="nav.link" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                  <Button id="spb">
                    LOGIN
                    </Button>
                  </NavItem>
                  <NavItem>
                  <Button id="spb">
                    JOIN US
                    </Button>
                  </NavItem>
                </Nav>
              </CardBody>
            </Card>
          </Colxx>
        </Row>

       
      </Fragment>
    );
  }
}
