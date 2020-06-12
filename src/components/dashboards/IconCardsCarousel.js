import React from "react";

import ReactSiemaCarousel from "../ReactSiema/ReactSiemaCarousel";
import IconCard from "../IconCard";

import data from "../../data/iconCards";

const IconCardsCarousel = ({ className = "icon-cards-row" }) => {
  const sliderPerPage = {
    0: 1,
    320: 2,
    576: 3,
    1800: 4
  };

  return (
    <div className={className}>
      <ReactSiemaCarousel perPage={sliderPerPage} controls={false} loop={false}>
        {data.map((item, index) => {
          return (
            <div key={`icon_card_${index}`}>
              <IconCard {...item} className="mb-4" />
            </div>
          );
        })}
      </ReactSiemaCarousel>
    </div>
  );
};
export default IconCardsCarousel;
