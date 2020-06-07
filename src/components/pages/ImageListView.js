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

const ImageListView = ({ product, collect }) => {
  return (
    <Colxx sm="6" lg="4" xl="3" className="mb-3" key={product.id}>
      <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
        <Card className="course" id="course">
          <div className="position-relative">
            <NavLink
              to={`/app/mycourses/courseView/?id=${product._id}`}
              className="w-40 w-sm-100"
            >
              <CardImg className=".card-img-details" top alt={product.title} src={product.pic} />
            </NavLink>
          </div>
          <CardBody>
            <Row>
              <Colxx xxs="10" className="mb-3">
                <CardSubtitle>{product.name}</CardSubtitle>
                <CardText className="text-muted text-small mb-0 font-weight-light">
                  {product.date}
                </CardText>
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

export default React.memo(ImageListView);
