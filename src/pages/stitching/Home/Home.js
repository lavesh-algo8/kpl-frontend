/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import {
  ClpCtrData,
  crowdingInstanceData,
  ctr_machineID,
  feedInstanceData,
  // homepageData,
  machineBreakdownData,
  machineData,
  summaryByViolationData,
  summaryByWorkerData,
  workerUtilizationData,
} from "../../../services/api.service";
// import GraphData from "./GraphData";
import TableData from "./TableData";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import Loader from "../../../components/loader/Loader";
import DonutChartSimple from "../../../components/donutChartSimple/DonutChartSimple";
import DonutChart from "../../../components/donutChart/DonutChart";
import AreaChart from "../../../components/areaChart/AreaChart";
import { StitchingContext } from "../../../context/StitchingContext";
import FeedDonut from "../../../components/donutChart/FeedDonut";
import { useDispatch, useSelector } from "react-redux";
import {
  openSnackbar_FROM,
  openSnackbar_TO,
} from "../../../redux/CommonReducer/CommonAction";
import { weekRange } from "../../../Utility/DateRange";

function Home() {
  // context
  const { state, dispatch } = React.useContext(StitchingContext);

  // use selector
  const filterEnable = useSelector((state) => state?.Stitch?.homeFilterEnable);

  // reducDispatch
  const Dispatch = useDispatch();

  // State
  // const [WEEK, setWEEK] = useState([]);

  const [clpCtr, setClpCtr] = useState([]);
  const [machineID, setMachineID] = useState([]);
  const [inputCTR, setInputCTR] = useState([]);
  const [inputMACHINEid, setInputMACHINEid] = useState([]);
  const [inputSHIFT, setInputSHIFT] = useState([]);
  const [typeOfRange, setTypeOfRange] = useState("weekly");

  // Functions

  // handle date range
  const handleDateRange = (value) => {
    var myDate = new Date();
    setTypeOfRange(value);
    switch (value) {
      case "weekly":
        var newDateWeekBack = new Date(
          myDate.getTime() - 60 * 60 * 24 * 7 * 1000
        );
        dispatch({
          type: "FROM",
          payload: newDateWeekBack.toISOString().slice(0, 10),
        });
        dispatch({ type: "TO", payload: myDate.toISOString().slice(0, 10) });
        break;
      case "monthly":
        var newDateMonthBack = new Date(
          myDate.getTime() - 60 * 60 * 24 * 30 * 1000
        );
        dispatch({
          type: "FROM",
          payload: newDateMonthBack.toISOString().slice(0, 10),
        });
        dispatch({ type: "TO", payload: myDate.toISOString().slice(0, 10) });
        break;
      case "custom":
        dispatch({
          type: "FROM",
          payload: weekRange()[0],
        });
        dispatch({
          type: "TO",
          payload: weekRange()[1],
        });
        break;
      default:
        return null;
    }
  };

  // refresh data
  const refreshData = async () => {
    try {
      const x = await machineBreakdownData();
      dispatch({
        type: "MACHINE_UTILIZATION",
        payload: { data: x.machineBreakdownData, loading: false },
      });

      const feedUtil = await feedInstanceData();
      dispatch({
        type: "FEED_UTILIZATION",
        payload: { data: feedUtil.feedUtilization, loading: false },
      });

      const y = await workerUtilizationData();
      dispatch({
        type: "WORKER_UTILIZATION",
        payload: { data: y.workerUtilization, loading: false },
      });

      const z = await crowdingInstanceData();
      dispatch({
        type: "CROWDING_INSTANCE",
        payload: { data: z.crowdingInstancesData, loading: false },
      });

      const homeWorkerTable = await summaryByWorkerData();
      dispatch({
        type: "HOME_WORKER_TABLE",
        payload: {
          data: homeWorkerTable.detailedSummaryByWorker,
          loading: false,
        },
      });

      const homeDateTable = await summaryByViolationData();
      dispatch({
        type: "HOME_DATE_TABLE",
        payload: {
          data: homeDateTable.detailedSummaryByViolation.violationSummary,
          loading: false,
        },
      });

      const homeMachineTable = await machineData();
      dispatch({
        type: "HOME_MACHINE_TABLE",
        payload: {
          data:
            homeMachineTable.detailedSummaryByMachineId
              .violationSummaryByMachineId,
          loading: false,
        },
      });

      const homeCTRTable = await ClpCtrData();
      dispatch({
        type: "HOME_CTR_TABLE",
        payload: {
          data: homeCTRTable,
          loading: false,
        },
      });
    } catch (e) {
      // console.log(e.message);
    }
  };

  // load ctr filter dropdown data
  const load_ctr_machine = async () => {
    try {
      const ctr = await ctr_machineID();
      setClpCtr(ctr.clpctr);
      setMachineID(ctr.machineID);
      dispatch({
        type: "MACHINE_ID",
        payload: ctr.machineID,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  // load initial table data
  const loadData = async () => {
    try {
      if (state.machineUtilization.loading) {
        const x = await machineBreakdownData();
        // console.log(x);
        dispatch({
          type: "MACHINE_UTILIZATION",
          payload: { data: x.machineBreakdownData, loading: false },
        });
      }

      if (state.workerUtilization.loading) {
        const y = await workerUtilizationData();
        dispatch({
          type: "WORKER_UTILIZATION",
          payload: { data: y.workerUtilization, loading: false },
        });
      }

      if (state.crowdingInstance.loading) {
        const z = await crowdingInstanceData();
        dispatch({
          type: "CROWDING_INSTANCE",
          payload: { data: z.crowdingInstancesData, loading: false },
        });
      }

      if (state.feedUtilization.loading) {
        const x = await feedInstanceData();

        dispatch({
          type: "FEED_UTILIZATION",
          payload: { data: x.feedUtilization, loading: false },
        });
      }
      if (state.homeWorkerTable.loading) {
        const homeWorkerTable = await summaryByWorkerData();
        dispatch({
          type: "HOME_WORKER_TABLE",
          payload: {
            data: homeWorkerTable.detailedSummaryByWorker,
            loading: false,
          },
        });
      }

      if (state.homeDateTable.loading) {
        const homeDateTable = await summaryByViolationData();
        dispatch({
          type: "HOME_DATE_TABLE",
          payload: {
            data: homeDateTable.detailedSummaryByViolation.violationSummary,
            loading: false,
          },
        });
      }
      if (state.homeMachineTable.loading) {
        const homeMachineTable = await machineData();
        dispatch({
          type: "HOME_MACHINE_TABLE",
          payload: {
            data:
              homeMachineTable.detailedSummaryByMachineId
                .violationSummaryByMachineId,
            loading: false,
          },
        });
      }

      if (state.homeCTRTable.loading) {
        const homeCTRTable = await ClpCtrData();
        // console.log(homeCTRTable);
        dispatch({
          type: "HOME_CTR_TABLE",
          payload: {
            data: homeCTRTable,
            loading: false,
          },
        });
      }
    } catch (err) {
      // console.log(err.message);
    }
  };
  // load filtered data
  const dateFilter = async () => {
    if (!state.from) alert("From Date not Selected!");
    else if (!state.to) alert("To Date not Selected!");
    else {
      try {
        const x = await workerUtilizationData(
          state.from,
          state.to,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.machineID),
          inputSHIFT
        );
        // console.log(x);
        dispatch({
          type: "WORKER_UTILIZATION",
          payload: { data: x.workerUtilization, loading: false },
        });

        const y = await crowdingInstanceData(state.from, state.to, inputSHIFT);
        // console.log(`y ${y}`);

        dispatch({
          type: "CROWDING_INSTANCE",
          payload: { data: y.crowdingInstancesData, loading: false },
        });

        // if (state.feedUtilization.loading) {
        const feed = await feedInstanceData(
          state.from,
          state.to,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.machineID),
          inputSHIFT
        );

        dispatch({
          type: "FEED_UTILIZATION",
          payload: { data: feed.feedUtilization, loading: false },
        });
        // }

        const z = await machineBreakdownData(
          state.from,
          state.to,
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.machineID),
          inputSHIFT
        );

        dispatch({
          type: "MACHINE_UTILIZATION",
          payload: { data: z.machineBreakdownData, loading: false },
        });

        const homeWorkerTable = await summaryByWorkerData(
          state.from,
          state.to,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.machineID),
          inputSHIFT
        );
        if (homeWorkerTable.detailedSummaryByWorker !== "no data") {
          dispatch({
            type: "HOME_WORKER_TABLE",
            payload: {
              data: homeWorkerTable.detailedSummaryByWorker,
              loading: false,
            },
          });
        }

        const homeDateTable = await summaryByViolationData(
          state.from,
          state.to,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.machineID),
          inputSHIFT
        );
        if (
          homeDateTable.detailedSummaryByViolation.violationSummary !==
          "no data"
        ) {
          dispatch({
            type: "HOME_DATE_TABLE",
            payload: {
              data: homeDateTable.detailedSummaryByViolation.violationSummary,
              loading: false,
            },
          });
        }

        const homeMachineTable = await machineData(
          state.from,
          state.to,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.machineID),
          inputSHIFT
        );
        if (
          homeMachineTable.detailedSummaryByMachineId
            .violationSummaryByMachineId !== "no data"
        ) {
          dispatch({
            type: "HOME_MACHINE_TABLE",
            payload: {
              data:
                homeMachineTable.detailedSummaryByMachineId
                  .violationSummaryByMachineId,
              loading: false,
            },
          });
        }

        const homeCTRTable = await ClpCtrData(
          state.from,
          state.to,
          inputCTR.length > 0 ? inputCTR : clpCtr.map((item) => item.ctrs),
          inputMACHINEid.length > 0
            ? inputMACHINEid
            : machineID.map((item) => item.machineID),
          inputSHIFT
        );
        if (
          homeCTRTable.detailedSummaryByClpCtr.detailedSummaryByClpCtr !==
          "no data"
        ) {
          dispatch({
            type: "HOME_CTR_TABLE",
            payload: {
              data: homeCTRTable,
              loading: false,
            },
          });
        }
      } catch (err) {
        // console.log(err.message);
      }
    }
  };

  // Use Effects
  useEffect(() => {
    loadData();
    dispatch({
      type: "FROM",
      payload: weekRange()[0],
    });

    dispatch({ type: "TO", payload: weekRange()[1] });
    load_ctr_machine();
  }, []);

  useEffect(() => {
    function callAPI() {
      console.log("API Calling...");
      loadData();
    }
    function getAlerts() {
      !filterEnable && callAPI();
    }
    getAlerts();
    const interval = setInterval(() => getAlerts(), 12000);
    return () => {
      clearInterval(interval);
    };
  }, [filterEnable]);

  return (
    <Grid
      sm={12}
      container
      alignItems="center"
      style={{ padding: "18px 6px 4px 6px" }}
    >
      <Grid
        container
        item
        xs={6}
        sm={4}
        lg={typeOfRange === "custom" ? 1 : 2}
        style={{ justifyContent: "center", marginBottom: "8px" }}
      >
        <FormControl
          variant="outlined"
          fullWidth
          style={{ marginRight: "6px" }}
        >
          <InputLabel keyid="demo-simple-select-outlined-label">CTR</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            multiple
            value={inputCTR}
            onChange={(e) => setInputCTR(e.target.value)}
            label="CTR"
            // multiple
          >
            {clpCtr &&
              clpCtr.map((item, index) => (
                <MenuItem value={item.ctrs} key={index}>
                  {item.ctrs}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid
        container
        item
        xs={6}
        sm={4}
        lg={typeOfRange === "custom" ? 1 : 2}
        style={{ justifyContent: "center", marginBottom: "8px" }}
      >
        <FormControl
          variant="outlined"
          fullWidth
          style={{ marginRight: "6px" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Machine ID
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            multiple
            value={inputMACHINEid}
            onChange={(e) => setInputMACHINEid(e.target.value)}
            label="Machine ID"
            // multiple
          >
            {machineID &&
              machineID
                .sort((a, b) =>
                  a.machineID?.split("/")[2][0] > b.machineID?.split("/")[2][0]
                    ? 1
                    : -1
                )
                .map((item, index) => (
                  <MenuItem value={item.machineID} key={index}>
                    {item.machineID}
                  </MenuItem>
                ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid
        container
        item
        xs={6}
        sm={4}
        lg={2}
        style={{ justifyContent: "center", marginBottom: "8px" }}
      >
        <FormControl
          variant="outlined"
          fullWidth
          style={{ marginRight: "6px" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Date Range
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={typeOfRange}
            onChange={(e) => handleDateRange(e.target.value)}
            label="Machine ID"
            // multiple
          >
            <MenuItem value={"weekly"}>Weekly</MenuItem>
            <MenuItem value={"monthly"}>Monthly</MenuItem>
            <MenuItem value={"custom"}>Custom</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {typeOfRange === "custom" && (
        <>
          <Grid
            container
            item
            xs={6}
            sm={4}
            lg={2}
            style={{ justifyContent: "center", marginBottom: "8px" }}
          >
            <TextField
              key="from"
              id="fromDate"
              label="From"
              value={state.from}
              type="date"
              style={{ marginRight: "6px" }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => {
                e.target.value > state.to
                  ? Dispatch(openSnackbar_FROM())
                  : dispatch({
                      type: "FROM",
                      payload: e.target.value,
                    });
              }}
              fullWidth
            />
          </Grid>

          <Grid
            container
            item
            xs={6}
            sm={4}
            lg={2}
            style={{ justifyContent: "center", marginBottom: "8px" }}
          >
            <TextField
              key="to"
              id="toDate"
              label="To"
              type="date"
              value={state.to}
              style={{ marginRight: "6px" }}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                e.target.value < state.from
                  ? Dispatch(openSnackbar_TO())
                  : dispatch({ type: "TO", payload: e.target.value });
              }}
              fullWidth
            />
          </Grid>
        </>
      )}

      <Grid
        container
        item
        xs={4}
        sm={4}
        lg={2}
        style={{ justifyContent: "center", marginBottom: "8px" }}
      >
        <FormControl
          variant="outlined"
          fullWidth
          style={{ marginRight: "6px" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">Shift</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            multiple
            value={inputSHIFT}
            onChange={(e) => setInputSHIFT(e.target.value)}
            label="Shift"
            // multiple
          >
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid
        container
        item
        // sm={12}
        xs={4}
        sm={4}
        lg={typeOfRange === "custom" ? 1 : 2}
        style={{ justifyContent: "center", marginBottom: "8px" }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "10px" }}
          onClick={() => {
            Dispatch({
              type: "ENABLE_HOME_FILTER",
            });
            dateFilter();
          }}
        >
          <FilterListIcon />
          Filter
        </Button>
      </Grid>
      <Grid
        container
        item
        // sm={12}
        xs={4}
        sm={4}
        lg={typeOfRange === "custom" ? 1 : 2}
        style={{ justifyContent: "center", marginBottom: "8px" }}
      >
        <Button
          variant="contained"
          color="primary"
          // style={{ margin: "10px" }}
          // onClick={dateFilter}
          onClick={() => {
            Dispatch({
              type: "DISABLE_HOME_FILTER",
            });
            refreshData();
            setInputCTR([]);
            setInputMACHINEid([]);
            setInputSHIFT([]);
          }}
        >
          <RefreshIcon />
          Refresh
        </Button>
      </Grid>
      {/* <GraphData
        workerUtilization={workerUtilization}
        crowdingInstance={crowdingInstance}
      /> */}

      <Grid container xs={12} spacing={2} style={{ padding: "12px 16px" }}>
        <Grid container item xs={12} sm={6} lg={3}>
          <Paper
            style={{ width: "100%", padding: "8px", minHeight: "280px" }}
            elevation={5}
          >
            {state.machineUtilization.loading ? (
              <Loader />
            ) : (
              <DonutChartSimple
                data={state.machineUtilization?.data}
                payload_data={3}
                link={"/stitching/violationLog"}
              />
            )}
          </Paper>
        </Grid>
        <Grid container item xs={12} sm={6} lg={3}>
          <Paper
            style={{
              width: "100%",
              padding: "8px",
              minHeight: "280px",
            }}
            elevation={5}
          >
            {state.feedUtilization.loading ? (
              <Loader />
            ) : (
              <FeedDonut
                data={state?.feedUtilization?.data}
                payload_data={0}
                link={"/stitching/violationLog"}
              />
            )}
          </Paper>
        </Grid>
        <Grid container item xs={12} sm={6} lg={3}>
          <Paper
            style={{
              width: "100%",
              padding: "8px",
              minHeight: "280px",
            }}
            elevation={5}
          >
            {state.workerUtilization.loading ? (
              <Loader />
            ) : (
              <DonutChart
                totalTime={state?.workerUtilization?.data?.totalTime}
                idleDueToWorkerUnavailable={
                  state?.workerUtilization?.data?.idleDueToWorkerUnavailable
                }
                feedUnavailibilityDuration={
                  state?.workerUtilization?.data?.feedUnavailibilityDuration
                }
                other={state?.workerUtilization?.data?.balanceHours}
                utilizationPercentage={
                  state?.workerUtilization?.data?.utilizationPercentage
                }
                payload_data={2}
                link={"/stitching/violationLog"}
              />
            )}
          </Paper>
        </Grid>
        <Grid container item xs={12} sm={6} lg={3}>
          <Paper
            elevation={5}
            style={{
              width: "100%",
              padding: "8px",
              minHeight: "280px",
              overflow: "hidden",
            }}
          >
            {state.crowdingInstance.loading ? (
              <Loader />
            ) : (
              <AreaChart
                data={state.crowdingInstance.data}
                payload_data={1}
                link={"/stitching/violationLog"}
              />
            )}
          </Paper>
        </Grid>
      </Grid>

      <TableData
        homeWorkerTable={state.homeWorkerTable.data}
        homeDateTable={state.homeDateTable.data}
        homeMachineTable={state.homeMachineTable.data}
        homeCTRTable={
          state.homeCTRTable?.data?.detailedSummaryByClpCtr
            ?.detailedSummaryByClpCtr
        }
      />
    </Grid>
  );
}

export default Home;
