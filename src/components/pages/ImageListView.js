import React from "react";
import {
  Row,
  Card,
  CardBody,
  CardSubtitle,
  CardImg,
  CardText,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../CustomBootstrap";
import moment from "moment";
const ImageListView = ({ product, collect }) => {
  return (
    <Colxx xxs="12" lg="6" xl="4" className="mb-4" key={product.id}>
      <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
        <Card className="course" id="course">
          <div className="position-relative">
            <NavLink
              to={`/app/mycourses/courseView/?id=${product._id}`}
              className="w-40 w-sm-100"
            >
              <CardImg
                className=".card-img-details"
                alt={product.name}
                src={product.pic}
              />
            </NavLink>
          </div>
          <CardBody>
            <Row>
              <CardSubtitle>{product.name}</CardSubtitle>
            </Row>
            <Row>
              <CardText className="text-muted text-small mb-0 font-weight-light">
                {moment(product.date).format("YYYY MMM DD")}
              </CardText>
            </Row>
          </CardBody>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

export default React.memo(ImageListView);
