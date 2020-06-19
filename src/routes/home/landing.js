import React, { Component, Fragment } from "react";
import "./landing.css"
import {
  Row,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Card,
  CardHeader,
} from "reactstrap";
import Pagination from "../../components/pages/Pagination";
import classnames from "classnames";
import { Colxx } from "../../components/CustomBootstrap";
import IntlMessages from "../../util/IntlMessages";
import { NavLink } from "react-router-dom";
import ImageListView from "../../components/pages/ImageListView";
import { connect } from "react-redux";
import ReactGA from "react-ga";
import uuid from "uuid";
import Why from "./landing/why";
import Easy from "./landing/easy";
import Top from "./landing/top";
import Slides from "./landing/slides";

import {
  GetSubscription,
  GetTopCourses,
  GetRecommendation,
} from "../../redux/actions";
function collect(props) {
  return { data: props.data };
}
class mainLanding extends Component {
    // UncontrolledCarousel.propTypes = {
    //     items: PropTypes.array.isRequired,
    //     indicators: PropTypes.bool, // default: true
    //     controls: PropTypes.bool, // default: true
    //     autoPlay: PropTypes.bool, // default: true
    //   };
  render() {
   
    return (
      <Fragment>
   <Top />
        <Slides />
        
        <Why />
        <Easy />
        </Fragment>
     
    );
  }
}


export default mainLanding;
