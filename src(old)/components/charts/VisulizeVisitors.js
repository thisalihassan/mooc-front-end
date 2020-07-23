import React, { Component } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { ThemeColors } from "../../util/ThemeColors";
import { chartTooltip } from "./util";
import IntlMessages from "../../util/IntlMessages";
import { LineChart } from "../../components/charts/";
import axios from "axios";
import { URL } from "../../constants/defaultValues";
const colors = ThemeColors();
class VisulizeVisitors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lineChartData: null,
      lineChartOptions: {
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: chartTooltip,
        plugins: {
          datalabels: {
            display: false,
          },
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                lineWidth: 1,
                color: "rgba(0,0,0,0.1)",
                drawBorder: false,
              },
              ticks: {
                beginAtZero: true,
                stepSize: 5,
                min: 50,
                max: 70,
                padding: 20,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    };
  }
  async componentDidMount() {
    axios.get(URL + "api/graph/").then((res) => {
      const values = res.data.values;
      this.state.lineChartOptions.scales.yAxes[0].ticks.min = Math.min(
        ...values
      );
      this.state.lineChartOptions.scales.yAxes[0].ticks.max =
        Math.max(...values) + 10;
      this.setState({
        lineChartData: {
          labels: res.data.days,
          datasets: [
            {
              label: "",
              data: values,
              borderColor: "#e43f5a",
              pointBackgroundColor: colors.foregroundColor,
              pointBorderColor: colors.themeColor1,
              pointHoverBackgroundColor: colors.themeColor1,
              pointHoverBorderColor: colors.foregroundColor,
              pointRadius: 6,
              pointBorderWidth: 2,
              pointHoverRadius: 8,
              fill: false,
            },
          ],
        },
      });
    });
  }
  render() {
    return (
      <Card id="rest">
        <CardBody>
          <CardTitle>
            <IntlMessages id="dashboards.sales" />
          </CardTitle>
          <div className="dashboard-line-chart">
            {this.state.lineChartData ? (
              <LineChart
                lineChartOptions={this.state.lineChartOptions}
                shadow
                data={this.state.lineChartData}
              />
            ) : (
              <div className="loading"></div>
            )}
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default VisulizeVisitors;
