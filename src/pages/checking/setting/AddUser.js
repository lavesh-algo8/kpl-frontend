import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { AddNewUser } from "../../../services/api.service";

function AddUser({ load }) {
  const [open, setOpen] = React.useState(false);

  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    designation: "supervisor",
    role: "",
    zone: "",
    wing: "",
    accessibilityCutting: false,
    accessibilityStitching: false,
    accessibilityChecking: false,
    workerID: "",
    image: "",
    department: "all",
    createdBy: "dev",
    modifiedBy: "dev",
    shiftA: false,
    shiftB: false,
    mobile: "",
    machineBreakdown: false,
    feedUnavailability: false,
    workerNotAvailable: false,
    crowding: false,
    checkerActiveMonitoring: false,
  });

  const submitUserForm = async () => {
    console.log(data);
    const DATA = {
      username: data.username,
      password: data.password,
      email: data.email,
      designation: data.designation,
      role: data.role,
      zone: data.zone,
      wing: data.wing,
      accessibilityCutting: data.accessibilityCutting ? 1 : 0,
      accessibilityStitching: data.accessibilityStitching ? 1 : 0,
      accessibilityChecking: data.accessibilityChecking ? 1 : 0,
      workerID: data.workerID,
      image: data.image,
      department: data.department,
      createdBy: data.createdBy,
      modifiedBy: data.modifiedBy,
      shiftA: data.shiftA ? 1 : 0,
      shiftB: data.shiftB ? 1 : 0,
      mobile: data.mobile,
      machineBreakdown: data.machineBreakdown ? 1 : 0,
      feedUnavailability: data.feedUnavailability ? 1 : 0,
      workerNotAvailable: data.workerNotAvailable ? 1 : 0,
      crowding: data.crowding ? 1 : 0,
      checkerActiveMonitorin: data.checkerActiveMonitoring ? 1 : 0,
    };
    try {
      // console.log(DATA);
      var txt = window.confirm("User will be added, continue?");
      if (txt) {
        await AddNewUser(DATA);
        alert("User Added");
        handleClose();
        load();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid container>
      <Grid item xs={2} style={{ marginTop: "12px" }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#0e4a7b",
            color: "#FFF",
            whiteSpace: "nowrap",
          }}
          onClick={handleClickOpen}
        >
          ADD USER
        </Button>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: "900px", margin: "auto" }}
      >
        <DialogTitle id="alert-dialog-title">{"ADD USER"}</DialogTitle>
        <DialogContentText id="alert-dialog-description">
          <Grid
            container
            xs={12}
            spacing={2}
            style={{
              alignItems: "center",
              justifyContent: "space-around",
              padding: "1.5rem 1rem",
            }}
          >
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={data.username}
                fullWidth
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={data.password}
                fullWidth
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Designation
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={data.designation}
                  onChange={(e) =>
                    setData({ ...data, designation: e.target.value })
                  }
                  label="Designation"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"helper"}>Helper</MenuItem>
                  <MenuItem value={"manager"}>Manager</MenuItem>
                  <MenuItem value={"supervisor"}>Supervisor</MenuItem>
                  <MenuItem value={"wingIncharge"}>Wing Incharge</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {data.designation === "supervisor" && (
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Supervisor Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={data.role}
                    onChange={(e) => setData({ ...data, role: e.target.value })}
                    label="Designation"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Final Area Supervisor"}>
                      Final Area Supervisor
                    </MenuItem>
                    <MenuItem value={"Kit Area Supervisor"}>
                      Kit Area Supervisor
                    </MenuItem>
                    <MenuItem value={"Line Area Supervisor"}>
                      Line Area Supervisor
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}

            {data.designation === "manager" && (
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Manager Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={data.role}
                    onChange={(e) => setData({ ...data, role: e.target.value })}
                    label="Designation"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"admin"}>Admin</MenuItem>
                    <MenuItem value={"Production Manager"}>
                      Production Manager
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}

            {data.designation === "wingIncharge" && (
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Wing Incharge Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={data.role}
                    onChange={(e) => setData({ ...data, role: e.target.value })}
                    label="Designation"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Manager"}>Manager</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}

            {data.designation === "helper" && (
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Helper Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={data.role}
                    onChange={(e) => setData({ ...data, role: e.target.value })}
                    label="Designation"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"electrician"}>Electrician</MenuItem>
                    <MenuItem value={"fitter"}>Fitter</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}

            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Line"
                variant="outlined"
                value={data.zone}
                onChange={(e) => setData({ ...data, zone: e.target.value })}
              />
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Wing"
                variant="outlined"
                value={data.wing}
                onChange={(e) => setData({ ...data, wing: e.target.value })}
              />
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Worker Id"
                variant="outlined"
                value={data.workerID}
                onChange={(e) => setData({ ...data, workerID: e.target.value })}
              />
            </Grid>

            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Mobile"
                type="number"
                variant="outlined"
                value={data.mobile}
                onChange={(e) => setData({ ...data, mobile: e.target.value })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.accessibilityCutting}
                    checked={data.accessibilityCutting}
                    color="primary"
                    onChange={(e) =>
                      setData({
                        ...data,
                        accessibilityCutting: e.target.checked,
                      })
                    }
                  />
                }
                label="Accessibility Cutting"
                labelPlacement="end"
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.accessibilityStitching}
                    checked={data.accessibilityStitching}
                    color="primary"
                    onChange={(e) =>
                      setData({
                        ...data,
                        accessibilityStitching: e.target.checked,
                      })
                    }
                  />
                }
                label="Accessibility Stitching"
                labelPlacement="end"
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.accessibilityChecking}
                    checked={data.accessibilityChecking}
                    color="primary"
                    onChange={(e) =>
                      setData({
                        ...data,
                        accessibilityChecking: e.target.checked,
                      })
                    }
                  />
                }
                label="Accessibility Checking"
                labelPlacement="end"
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" style={{ color: "#f68f1d" }}>
                SHIFT
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.shiftA}
                    checked={data.shiftA}
                    color="primary"
                    onChange={(e) =>
                      setData({
                        ...data,
                        shiftA: e.target.checked,
                      })
                    }
                  />
                }
                label="Shift A"
                labelPlacement="end"
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.shiftB}
                    checked={data.shiftB}
                    color="primary"
                    onChange={(e) =>
                      setData({
                        ...data,
                        shiftB: e.target.checked,
                      })
                    }
                  />
                }
                label="Shift B"
                labelPlacement="end"
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" style={{ color: "#f68f1d" }}>
                RESPONSIBLE FOR
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.machineBreakdown}
                    checked={data.machineBreakdown}
                    color="primary"
                    onChange={(e) =>
                      setData({
                        ...data,
                        machineBreakdown: e.target.checked,
                      })
                    }
                  />
                }
                label="Machine Breakdown"
                labelPlacement="end"
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.feedUnavailability}
                    checked={data.feedUnavailability}
                    color="primary"
                    onChange={(e) =>
                      setData({
                        ...data,
                        feedUnavailability: e.target.checked,
                      })
                    }
                  />
                }
                label="Feed Unavailability"
                labelPlacement="end"
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.workerNotAvailable}
                    checked={data.workerNotAvailable}
                    color="primary"
                    onChange={(e) =>
                      setData({
                        ...data,
                        workerNotAvailable: e.target.checked,
                      })
                    }
                  />
                }
                label="Worker Not Available"
                labelPlacement="end"
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.crowding}
                    checked={data.crowding}
                    color="primary"
                    onChange={(e) =>
                      setData({
                        ...data,
                        crowding: e.target.checked,
                      })
                    }
                  />
                }
                label="Crowding"
                labelPlacement="end"
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={data.checkerActiveMonitoring}
                    checked={data.checkerActiveMonitoring}
                    color="primary"
                    onChange={(e) =>
                      setData({
                        ...data,
                        checkerActiveMonitoring: e.target.checked,
                      })
                    }
                  />
                }
                label="Checker Active Monitoring"
                labelPlacement="end"
              />
            </Grid>
          </Grid>
        </DialogContentText>

        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            CANCEL
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={submitUserForm}
            autoFocus
          >
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default AddUser;
