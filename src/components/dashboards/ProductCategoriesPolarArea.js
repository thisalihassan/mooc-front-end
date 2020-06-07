import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

import PolarAreaChart from "../../components/charts/PolarArea";

import { polarAreaChartData } from "../../data/charts";

const ProductCategoriesPolarArea = ({ chartClass = "chart-container" }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <h2>Categories</h2>
        </CardTitle>
        <div className={chartClass}>
          <PolarAreaChart shadow data={polarAreaChartData} />
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCategoriesPolarArea;
