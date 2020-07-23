import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";

import LineChart from "../../components/charts/Line";

import { lineChartData } from "../../data/charts";

const SalesChartCard = () => {
  return (
    <Card>
      <div className="position-absolute card-top-buttons">
        <UncontrolledDropdown>
          <DropdownToggle color="" className="btn btn-header-light icon-button">
            <i className="simple-icon-refresh" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <h2>Sales</h2>
            </DropdownItem>
            <DropdownItem>
              <h2>Orders</h2>
            </DropdownItem>
            <DropdownItem>
              <h2>Refund</h2>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <CardBody>
        <CardTitle>Sales</CardTitle>
        <div className="dashboard-line-chart">
          <LineChart shadow data={lineChartData} />
        </div>
      </CardBody>
    </Card>
  );
};

export default SalesChartCard;
