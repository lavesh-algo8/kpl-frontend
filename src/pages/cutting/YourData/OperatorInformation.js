/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { Snackbar } from "@material-ui/core";
import "./Operator.scss";
import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  AddWorkerStitching,
  getYourData,
  workerUpdateStitching,
  workerDeleteStitching,
} from "../../../services/api.service";
import { Alert } from "@material-ui/lab";
import { StitchingContext } from "../../../context/StitchingContext";
import {
  addOperatorCutting,
  cuttingOperator,
  deleteOperatorCutting,
  updateOperatorCutting,
} from "../../../services/cuttingApi.service";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function OperatorInformation(props) {
  const [workerData, setWorkerData] = useState([]);
  const [edit, setEdit] = useState(false);
  const { state, dispatch } = React.useContext(StitchingContext);
  const [operatorList, setOperatorList] = useState([]);

  const loadData = async () => {
    try {
      const { data } = await cuttingOperator();
      setOperatorList(data);
    } catch (err) {}
  };

  const refreshData = async () => {
    try {
      const x = await getYourData();
      console.log(x);
      dispatch({
        type: "WORKER_DETAILS",
        payload: { data: x.latestWorkerData, loading: false },
      });
    } catch (err) {}
  };
  useEffect(() => {
    loadData();
  }, []);
  const columns = [
    { title: "Operator ID", field: "operatorId" },
    { title: "Operator Name", field: "operatorName" },
    {
      title: "Edit",
      render: (x) => (
        <button
          style={{
            color: "#0e4a7b",
            textDecoration: "underline",
            backgroundColor: "white",
            padding: "8px 16px",
            border: "none",
            outline: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
          onClick={() => {
            setEdit(true);
            setUserData({
              ...userdata,
              name: x.operatorName,
              workerId: x.operatorId,
              workerImage: "",
            });
          }}
        >
          EDIT
        </button>
      ),
    },
  ];
  const [userdata, setUserData] = useState({
    name: "",
    workerId: "",
    workerImage: "",
  });
  const [msg, setMsg] = React.useState("");
  const [open, setOpen] = useState(false);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setUserData({ ...userdata, workerImage: base64 });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const submitImageDetails = async () => {
    try {
      const resp = await addOperatorCutting(userdata);
      console.log(resp);
      setWorkerData([...workerData, userdata]);
      setMsg(resp.msg);
      setOpen(true);
      loadData();
      setUserData({ name: "", workerId: "", workerImage: "" });
    } catch (e) {
      console.log(e.message);
    }
  };

  const updateImageDetails = async () => {
    try {
      const resp = await updateOperatorCutting(userdata);
      setMsg(resp.msg);
      setOpen(true);
      loadData();
      setUserData({ name: "", workerId: "", workerImage: "" });
    } catch (e) {}
  };

  const deleteImageDetails = async () => {
    try {
      const resp = await deleteOperatorCutting({ workerId: userdata.workerId });
      setWorkerData(
        workerData.filter((item) => item.workerId !== userdata.workerId)
      );
      setMsg("Deleted");
      setOpen(true);
      loadData();
      setUserData({ name: "", workerId: "", workerImage: "" });
    } catch (e) {}
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          style={{ marginBottom: "12px" }}
          value={userdata.name}
          fullWidth
          onChange={(e) => setUserData({ ...userdata, name: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="Operator ID"
          variant="outlined"
          style={{ marginBottom: "12px" }}
          value={userdata.workerId}
          fullWidth
          onChange={(e) =>
            setUserData({ ...userdata, workerId: e.target.value })
          }
        />
        {/* <label for="myfile" className="inputLabel">
          Select a file:
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          id="myfile"
          name="myfile"
          accept=".jpg,.png,.jpeg"
          onChange={(e) => {
            uploadImage(e);
          }}
        />
        {userdata.image && (
          <img
            style={{ width: "100%", padding: "12px" }}
            src={userdata.image}
            alt="User"
          />
        )} */}
        {edit ? (
          <Grid container xs={12}>
            <Grid container item xs={6} style={{ padding: "6px" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#fff",
                  color: "#0e4a7b",
                  whiteSpace: "nowrap",
                  width: "100%",
                  height: "fit-content",
                  border: "1px solid #0e4a7b",
                }}
                onClick={() => {
                  setEdit(false);
                  setUserData({
                    name: "",
                    workerId: "",
                    workerImage: "",
                  });

                  // setUserData({
                  //   ...userdata,
                  //   supervisorName: "",
                  //   supervisorId: "",
                  //   date: "",
                  //   shift: "",
                  //   wing: "",
                  //   line: "",
                  // });
                }}
              >
                CANCEL
              </Button>
            </Grid>
            <Grid container item xs={6} style={{ padding: "6px" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#0e4a7b",
                  color: "#FFF",
                  whiteSpace: "nowrap",
                  width: "100%",
                  height: "fit-content",
                  border: "1px solid #0e4a7b",
                }}
                onClick={updateImageDetails}
              >
                UPDATE
              </Button>
            </Grid>
            <Grid container item xs={12} style={{ padding: "6px" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#b53f3f",
                  color: "#FFF",
                  whiteSpace: "nowrap",
                  width: "100%",
                  height: "fit-content",
                  border: "1px solid #b53f3f",
                }}
                onClick={deleteImageDetails}
              >
                DELETE
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid container item xs={12} style={{ padding: "6px" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#0e4a7b",
                color: "#FFF",
                whiteSpace: "nowrap",
                width: "100%",
                height: "fit-content",
                border: "1px solid #0e4a7b",
              }}
              onClick={submitImageDetails}
            >
              {/* <FilterListIcon /> */}
              SAVE
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12} md={8}>
        <MaterialTable
          title="OPERATOR INFORMATION"
          columns={columns}
          data={operatorList}
          options={{
            exportButton: true,
            headerStyle: {
              backgroundColor: "#0e4a7b",
              color: "#FFF",
            },
            pageSizeOptions: [20, 50, 100, 200],
            pageSize: 20,
          }}
        />
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="success">
          {msg}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default OperatorInformation;
