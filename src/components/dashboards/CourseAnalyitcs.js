import React from "react";
import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";

import AreaChart from "../../components/charts/Area";

import { conversionChartData } from "../../data/charts";

const CourseAnalyitcs = () => {
  return (
    <Card className="dashboard-filled-line-chart">
      <CardBody>
        <div className="float-left float-none-xs">
          <div className="d-inline-block">
            <h5 className="d-inline">Course Analytics</h5>
            <span className="text-muted text-small d-block">Per Session</span>
          </div>
        </div>

        <div className="btn-group float-right float-none-xs mt-2">
          <UncontrolledDropdown>
            <DropdownToggle caret color="secondary" className="btn-xs" outline>
              This Week
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Last Week</DropdownItem>
              <DropdownItem>This Month</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </CardBody>

      <div className="chart card-body pt-0">
        <AreaChart shadow data={conversionChartData} />
      </div>
    </Card>
  );
};

export default CourseAnalyitcs;
