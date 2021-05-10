import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "../donutChart/DonutChart.scss";
import { makeStyles } from "@material-ui/core/styles";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { StitchingContext } from "../../context/StitchingContext";
const useStyles = makeStyles((theme) => ({
  // formControl: {
  //   margin: theme.spacing(1),
  //   minWidth: 120,
  //   fontSize: "12px",
  // },
  selectEmpty: {
    //   marginTop: theme.spacing(2),
  },
}));

function DonutChartSimple({ data, payload_data, link }) {
  const { dispatch } = React.useContext(StitchingContext);

  const classes = useStyles();

  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  const [series, setSeries] = useState([]);

  const [options, setOptions] = useState({
    chart: {
      type: "donut",
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ",",
            headerCategory: "category",
            headerValue: "value",
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
        },
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#094573", "#ffce38", "#ffa643"],
    labels: ["Machine OnTime", "Machine OffTime", "Machine Breakdown Time"],

    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
            name: {
              show: true,
              color: "#333",
              fontSize: "14px",
            },
            value: {
              show: true,
              color: "#333",
              fontSize: "14px",
            },
          },
        },
      },
    },

    legend: {
      show: false,
      labels: {
        colors: ["#094573", "#ffce38", "#ffa643"],
        useSeriesColors: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });
  const [week, setWeek] = useState();

  useEffect(() => {
    var d = new Date();
    var d1 = new Date();
    var dateIndex = d.getDay();
    d.setDate(d.getDate() - dateIndex + 1);
    // d1.setDate(d1.getDate()+(7-dateIndex))
    var st = d.toLocaleString().split("/");
    var st1 = d1.toLocaleString().split("/");

    var startDate = (st[1] + "/" + st[0] + "/" + st[2]).split(",");
    var endDate = (st1[1] + "/" + st1[0] + "/" + st1[2]).split(",");

    setWeek(startDate[0] + "-" + endDate[0]);
    // console.log(props);
  }, []);

  return (
    <>
      <div className="top" style={{ display: "flex" }}>
        <Typography
          variant="h6"
          style={{
            margin: "auto",
            textAlign: "center",
            backgroundColor: "#f68f1d",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            textDecoration: "none",
          }}
          component={Link}
          to={link}
          onClick={() =>
            dispatch({ type: "VIOLATION_TAB", payload: payload_data })
          }
        >
          Machine Utilization
        </Typography>
      </div>
      <div className="donutCard">
        <div className="leftTile">
          <div className="chart">
            <Chart
              options={options}
              series={[
                // Boolean(data[0].utilizationPercentage)
                //   ? data[0].utilizationPercentage
                //   : 0,
                Boolean(data[0].machineOnTime) ? data[0].machineOnTime : 0,
                Boolean(data[0].machineOffTime) ? data[0].machineOffTime : 0,
                Boolean(data[0].machineOnTime)
                  ? Math.round(
                      data[0].machineOnTime - data[0].machineOffTime,
                      2
                    )
                  : 0,
              ]}
              type="donut"
            />
          </div>
        </div>
        <div className="rightTile">
          <div class="center-text">
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                className="dots dotBlue"
                style={{
                  display: "block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "4px",
                }}
              ></span>
              <p> Machine On Time </p>
            </div>
            <div
              style={{
                backgroundColor: "#E6ECF1",
                width: "auto",
                padding: "8px 0px",
                borderRadius: "8px",
              }}
            >
              <h6
                style={{
                  color: "#406E92",
                  textAlign: "center",
                }}
              >
                {Boolean(data[0].machineOnTime) ? data[0].machineOnTime : 0}
              </h6>
            </div>
          </div>
          <div class="center-text">
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                className="dots dotYellow"
                style={{
                  display: "block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "4px",
                }}
              ></span>
              <p> Machine Off Time </p>
            </div>
            <div
              style={{
                backgroundColor: "#FFFAEB",
                width: "auto",
                padding: "8px 0px",
                borderRadius: "8px",
              }}
            >
              <h6
                style={{
                  color: "rgb(169 127 0)",
                  textAlign: "center",
                }}
              >
                {Boolean(data[0].machineOffTime) ? data[0].machineOffTime : 0}
              </h6>
            </div>
          </div>
          <div class="center-text">
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                className="dots dotOrange"
                style={{
                  display: "block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "4px",
                }}
              ></span>
              <p>Machine Breakdown Time</p>
            </div>
            <div
              style={{
                backgroundColor: "#FEF4E8",
                width: "auto",
                padding: "8px 0px",
                borderRadius: "8px",
              }}
            >
              <h6
                style={{
                  color: "#F9B263",
                  textAlign: "center",
                }}
              >
                {Boolean(data[0].machineOnTime)
                  ? (data[0].machineOnTime - data[0].machineOffTime).toFixed(2)
                  : 0}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Typography
          variant="h6"
          style={{
            margin: "auto",
            position: "relative",
            left: "25%",
            color: "#f68f1d",
          }}
        >
          Total Scheduled Hours{" "}
          <span style={{ fontWeight: "bold", color: "#0e4a7b" }}>
            {Boolean(data[0].scheduleHours) ? data[0].scheduleHours : 0}
          </span>
        </Typography>

        <Typography
          variant="h6"
          style={{
            margin: "auto",
            position: "relative",
            left: "25%",
            color: "#f68f1d",
          }}
        >
          % Utilization{" "}
          <span style={{ fontWeight: "bold", color: "#0e4a7b" }}>
            {Boolean(data[0].utilizationPercentage)
              ? data[0].utilizationPercentage + "%"
              : 0}
          </span>
        </Typography>
      </div>
    </>
  );
}

export default DonutChartSimple;
