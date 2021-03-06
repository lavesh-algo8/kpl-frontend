import React from "react";
import Chart from "react-apexcharts";

import { Typography } from "@material-ui/core";
import { CheckingContext } from "../../context/CheckingContext";
import { Link } from "react-router-dom";

function DefectChart({ data, link, payload_data }) {
  // DISPATCH
  const { dispatch } = React.useContext(CheckingContext);

  const DATA = {
    series: [
      {
        name: "Defects",
        data: data?.data?.map((item) => item.defectPercentage),
      },
    ],
    options: {
      chart: {
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top",
            formatter: function(val, opt) {
              return `${val}%`;
            },
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function(val, opt) {
          return val + "%";
        },
      },
      colors: ["#f68f1d"],
      tooltip: {
        x: {
          formatter: undefined,
          title: {
            formatter: (value) => `${value} %`,
          },
        },
        y: {
          formatter: undefined,
          title: {
            formatter: (seriesName) => `${seriesName} %`,
          },
        },
      },

      xaxis: {
        categories: data?.data?.map((item) => item.defectName),
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        title: {
          text: "Top 5 Defects",
          style: {
            color: "#0e4a7b",
            fontSize: "12px",
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        title: {
          text: "Percentage",
          style: {
            color: "#0e4a7b",
            fontSize: "12px",
            fontWeight: 400,
          },
        },
      },
    },
  };

  return (
    <>
      <div className="top" style={{ display: "flex", marginBottom: "12px" }}>
        <Typography
          style={{
            margin: "auto",
            textAlign: "center",
            backgroundColor: "#f68f1d",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            textDecoration: "none",
            fontSize: "20px",
            fontWeight: "500",
          }}
          component={Link}
          to={link}
          onClick={() =>
            dispatch({ type: "VIOLATION_TAB", payload: payload_data })
          }
        >
          Top 5 Defects
        </Typography>
      </div>

      <div style={{ width: "100%" }}>
        <div className="chart">
          <Chart
            options={DATA.options}
            series={DATA.series}
            type="bar"
            height={200}
          />
        </div>
      </div>

      <Typography
        variant="h6"
        style={{
          margin: "auto",
          textAlign: "center",
          color: "#f68f1d",
        }}
      >
        Total Defects{" "}
        <span style={{ fontWeight: "bold", color: "#0e4a7b" }}>
          {data?.defectCount}
        </span>
      </Typography>
    </>
  );
}

export default DefectChart;
