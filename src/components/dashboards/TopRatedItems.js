import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

import ReactSiemaCarousel from "../../components/ReactSiema/ReactSiemaCarousel";
import Rating from "../../components/Rating";
import data from "../../data/topRatedItems";

const TopRatedItem = ({ image, order, title, rate, rateCount }) => (
  <div className="pr-2 pl-2">
    <img
      src={require("../../assets/img/" + image)}
      alt={title}
      className="mb-4 d-block w-100"
    />
    <h6 className="mb-1">
      <span className="mr-2">{order}.</span>
      {title}
    </h6>
    <Rating total={5} rating={rate} interactive={false} />
    <p className="text-small text-muted mb-0 d-inline-block">({rateCount})</p>
  </div>
);

const TopRatedItems = () => {
  const sliderPerPage = {
    0: 2,
    480: 3,
    992: 2
  };

  return (
    <Card className="dashboard-top-rated">
      <CardBody>
        <CardTitle>Top Rated Courses</CardTitle>
        <ReactSiemaCarousel perPage={sliderPerPage} controls={true} loop={true}>
          {data &&
            data.map((item, index) => (
              <div key={index}>
                <TopRatedItem {...item} />
              </div>
            ))}
        </ReactSiemaCarousel>
      </CardBody>
    </Card>
  );
};

export default TopRatedItems;
