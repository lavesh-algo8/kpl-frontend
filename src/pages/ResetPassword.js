import {
  Button,
  Paper,
  Snackbar,
  TextField,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import * as Styles from "./Login.module.scss";
import logo from "../images/kpl-logo.png";
import { Alert } from "@material-ui/lab";
// import { ResetPassword } from "../services/api.service";
import Blank from "./Blank";
import { updatePassword } from "../services/api.service";

const ColorButton = withStyles(() => ({
  root: {
    color: "white",
    backgroundColor: "#0e4a7b",
    padding: "12px",
    "&:hover": {
      backgroundColor: "#0e4a7b",
    },
  },
}))(Button);

function ResetPassword(props) {
  // Variables

  // states
  const [user, setUser] = useState({
    password: "",
    password2: "",
  });
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");

  // const { dispatch } = React.useContext(KPLContext);

  // Snackbar close function
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // login function
  // const submit = async () => {
  //   try {
  //     const resp = await ResetPassword(user.password, user.password);
  //     console.log(resp);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const passWordReset = async () => {
    try {
      if (user.password !== user.password2) {
        setMsg(`Password mismatched`);
        setOpen(true);
        // alert(props.match.params.token);
      } else {
        const data = {
          tokenNumber: props.match.params.token,
          password: user.password,
        };
        // const response =
        const response = await updatePassword(data);
        setMsg(`${response.data.msg}`);
        setOpen(true);
      }
    } catch (e) {}
  };

  return (
    <>
      <Blank />

      <div elevation={5} className={Styles.LoginContainer}>
        <Paper className={Styles.LoginBox} elevation={5}>
          <div className={Styles.left}></div>
          <div className={Styles.right}>
            <div className={Styles.logo}>
              <img src={logo} alt="logo" />
            </div>
            <div className={Styles.form}>
              <h3>Welcome to</h3>
              <h2>iVision</h2>
              <TextField
                label="New Password"
                variant="outlined"
                name="password"
                className={Styles.text}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <TextField
                label="Confirm Password"
                variant="outlined"
                name="password"
                className={Styles.text}
                onChange={(e) =>
                  setUser({ ...user, password2: e.target.value })
                }
              />
              {/* <TextField
                label="Password"
                variant="outlined"
                name="password"
                className={Styles.text}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              /> */}
              <ColorButton variant="contained" onClick={passWordReset}>
                Change Password
              </ColorButton>
              {/* <Typography
                component={Link}
                to="/"
                style={{
                  margin: "12px 0",
                  textDecoration: "none",
                  color: "black",
                }}
                variant="h6"
              >
                <span style={{ fontWeight: "bold", color: "#0e4a7b" }}>
                  Sign In
                </span>
              </Typography> */}
            </div>
          </div>
        </Paper>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {msg}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default ResetPassword;
