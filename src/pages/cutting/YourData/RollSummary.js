/* eslint-disable eqeqeq */
import { Button, Grid, TextField } from "@material-ui/core";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import PropTypes from "prop-types";

import moment from "moment";
import React from "react";
import FilterListIcon from "@material-ui/icons/FilterList";
import { notificationLogs } from "../../../services/cuttingApi.service";
import { weekRange } from "../../../Utility/DateRange";
import { useDispatch } from "react-redux";
import {
  openSnackbar_FROM,
  openSnackbar_TO,
} from "../../../redux/CommonReducer/CommonAction";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      container
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container item xs={12} style={{ padding: "18px" }}>
          {children}
        </Grid>
      )}
    </Grid>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function RollSummary() {
  // redux dispatch
  const Dispatch = useDispatch();

  // state
  const [data, setData] = React.useState([]);
  const [filterDateFrom, setFilterDateFrom] = React.useState();
  const [filterDateTo, setFilterDateTo] = React.useState();

  const getLogs = async () => {
    try {
      const resp = await notificationLogs();
      const summed = resp?.rollSummary.reduce((acc, curr) => {
        acc = acc + curr["no_defect"];
        return acc;
      }, 0);
      console.log(summed);
      console.log(
        resp?.rollSummary.map((item, index) => {
          let { defect_percentage, ...rest } = item;
          return {
            count: index,
            defect_percentage: summed,
            ...rest,
          };
        })
      );
      setData(
        resp?.rollSummary.map((item, index) => {
          let { defect_percentage, no_defect, ...rest } = item;
          return {
            count: index,
            no_defect: no_defect,
            defect_percentage: Math.floor((no_defect / summed) * 100),
            ...rest,
          };
        })
      );
    } catch (err) {
      // console.log(err);
    }
  };

  React.useEffect(() => {
    getLogs();
    // week range
    setFilterDateFrom(weekRange()[0]);
    setFilterDateTo(weekRange()[1]);
  }, []);
  const filterLogs = async () => {
    try {
      const resp = await notificationLogs(filterDateFrom, filterDateTo);
      setData(resp?.rollSummary);
    } catch (err) {
      // console.log(err);
    }
  };
  return (
    <Grid container>
      <Grid container item xs={12}>
        <Grid container item xs={6} md={2}>
          <TextField
            label="From"
            value={filterDateFrom}
            type="date"
            style={{ marginRight: "6px" }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={(e) => {
              e.target.value > filterDateTo
                ? Dispatch(openSnackbar_FROM())
                : setFilterDateFrom(e.target.value);
            }}
            // onChange={(e) => setFilterDateFrom(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid container item xs={6} md={2}>
          <TextField
            label="To"
            value={filterDateTo}
            type="date"
            style={{ marginRight: "6px" }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            // onChange={(e) => setFilterDateTo(e.target.value)}

            onChange={(e) => {
              e.target.value < filterDateFrom
                ? Dispatch(openSnackbar_TO())
                : setFilterDateTo(e.target.value);
            }}
            fullWidth
          />
        </Grid>
        <Grid container item xs={12} md={2}>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
            onClick={filterLogs}
          >
            <FilterListIcon />
            Filter
          </Button>
        </Grid>
      </Grid>
      <Grid xs={12} container style={{ padding: "1rem" }}>
        {/* <AppBar position="static" className="customTab">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Feed Data" {...a11yProps(0)} />
            <Tab label="Crowd Data" {...a11yProps(1)} />
            <Tab label="Worker Data" {...a11yProps(2)} />
            <Tab label="Machine Data" {...a11yProps(3)} />
          </Tabs>
        </AppBar> */}
        {/* <TabPanel value={value} index={0}> */}
        {data?.length > 0 && (
          <Grid
            container
            item
            xs={12}
            style={{ height: "700px", width: "100%" }}
          >
            <DataGrid
              components={{
                Toolbar: GridToolbar,
              }}
              // rows={data}
              rows={data?.map((row, i) => {
                const { date, machineId, ...rest } = row;

                return {
                  id: i,
                  Id: machineId,
                  DateTime: moment(new Date(date))
                    .format("DD/MM/YYYY")
                    .toString(),
                  ...rest,
                };
              })}
              columns={[
                { field: "DateTime", headerName: "Date", width: 150 },
                { field: "Id", headerName: "Machine Id", width: 210 },
                {
                  field: "FabricCategory",
                  headerName: "Roll Category",
                  width: 180,
                },
                {
                  field: "rollBarcodeNumber",
                  headerName: "Roll Barcode No.",
                  width: 240,
                },
                {
                  field: "rollBarcodeNumber",
                  headerName: "Roll Barcode No.",
                  width: 240,
                },
                {
                  field: "rollLenght",
                  headerName: "Total Meter Count (m)",
                  width: 210,
                },
                {
                  field: "wasteLength",
                  headerName: "Waste Length",
                  width: 210,
                },
                {
                  field: "waste_percentage",
                  headerName: "Waste %",
                  width: 150,
                },
                {
                  field: "defect_percentage",
                  headerName: "Defect %",
                  width: 150,
                },
                {
                  field: "no_defect",
                  headerName: "Defect Count",
                  width: 180,
                },
                {
                  field: "partName",
                  headerName: "Part Name",
                  width: 180,
                },

                {
                  field: "operatorName",
                  headerName: "Operator Name",
                  width: 180,
                },
                {
                  field: "startTime",
                  headerName: "Roll Start Time",
                  width: 210,
                },
                { field: "endTime", headerName: "Roll End Time", width: 210 },
                { field: "shift", headerName: "Shift", width: 150 },
              ]}
              style={{ width: "100%" }}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default RollSummary;
