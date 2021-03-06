/* eslint-disable react-hooks/exhaustive-deps */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { Portal } from "mobx-portals";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Stitching from "./pages/stitching/Stitching/Stitching";
import { KPLContext } from "./context/ViolationContext";
import AuthRoute from "./Auth/AuthRoute";
import Checking from "./pages/checking/Checking/Checking";
import SignUp from "./pages/SignUp";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import BarCodePrint from "./pages/checking/BagID/BarCodePrint";
import { ViewDetails } from "./pages/stitching/layoutView/viewDetails/viewDetails";
// import socketIOClient from "socket.io-client";
import UsedUnusedPrint from "./pages/checking/BagID/UsedUnusedPrint";
import Cutting from "./pages/cutting/Cutting/Cutting";
// import axios from "axios";
// const ENDPOINT = "http://3.23.114.42:2020/";
// const publicVapidKey = 'BM2GFExoYFS2vpAT4bc99Utb1e9MbNlZudCeiZcTa4iVIBXmtZKXMxQhnnsmo3Ab4xz_1KbRGSLIp_AXo7j6YHs'
// const socket = socketIOClient(ENDPOINT);

function App(props) {
  // console.log(props);
  const { dispatch } = useContext(KPLContext);
  // useEffect(() => {
  //   console.log("Socket");
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on("StitchingNotification", (data) => {
  //     console.log(data);
  //   });
  // }, []);
  useEffect(() => {
    // document.html.style.zoom = "75%";
    const ROLE = localStorage.getItem("ROLE");
    ROLE && dispatch({ type: "ADD_ROLE", payload: ROLE });

    const DESIGNATION = localStorage.getItem("DESIGNATION");
    DESIGNATION && dispatch({ type: "ADD_DESIGNATION", payload: DESIGNATION });

    const PROFILE = localStorage.getItem("PROFILE");
    PROFILE && dispatch({ type: "ADD_PROFILE", payload: JSON.parse(PROFILE) });

    // socket
    // socket.on("realTime-notification", (resp) => {
    //   console.log("Socket On");
    //   console.log(resp);
    //   if (window.Notification) {
    //     Notification.requestPermission(() => {
    //       if (Notification.permission === "granted") {
    //         const swUrl = `${process.env.PUBLIC_URL}/serviceWorker.js`;
    //         navigator.serviceWorker.register(swUrl).then(async (worker) => {
    //           worker.showNotification(resp.Message);
    //         });
    //       }
    //     });
    //   }
    // });
  }, []);

  // if (window.Notification) {
  //   Notification.requestPermission(() => {
  //     if (Notification.permission === "granted") {
  //       navigator.serviceWorker
  //         .register("./serviceWorker.js")
  //         .then(async (worker) => {
  //           await axios
  //             .get(`http://3.23.114.42:2020/`)
  //             .then((response) => {
  //               if (response.status == 200) {
  //                 console.log(response.data.message);
  //                 worker.showNotification(response.data.message);
  //               }
  //             })
  //             .catch((err) => {
  //               console.log(err);
  //             });
  //         });
  //     }
  //   });
  // }

  // useEffect(() => {
  //   setInterval(() => {
  //     console.log("Interval triggered");
  //     if (window.Notification) {
  //       Notification.requestPermission(() => {
  //         if (Notification.permission === "granted") {
  //           navigator.serviceWorker.register("./worker.js").then((worker) => {
  //             worker.showNotification("Socket On");
  //             const socket = socketIOClient(ENDPOINT);
  //             socket.on("StitchingNotification", (data) => {
  //               console.log(data);
  //             });
  //           });
  //         }
  //       });
  //     }
  //     return () => socket.disconnect();
  //   }, 10000);
  // }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/forget-password" component={ForgetPassword} />
          <Route
            exact
            path="/reset-password/:token"
            component={ResetPassword}
          />

          <AuthRoute exact path="/menu" component={Menu} />
          <AuthRoute exact path="/stitching/:page" component={Stitching} />
          <AuthRoute exact path="/stitching/:page/:id" component={Stitching} />
          <AuthRoute exact path="/checking/:page" component={Checking} />
          <AuthRoute exact path="/checking/:page/:id" component={Checking} />
          <AuthRoute exact path="/cutting/:page" component={Cutting} />
          <AuthRoute exact path="/cutting/:page/:id" component={Cutting} />
          <AuthRoute exact path="/print" component={BarCodePrint} />
          <AuthRoute
            exact
            path="/printUsedUnused"
            component={UsedUnusedPrint}
          />

          <AuthRoute path="/viewdetails/:cameraid" component={ViewDetails} />
          <Redirect from="/stitching" to="/stitching/home" />
          <Redirect from="/checking" to="/checking/home" />
        </Switch>
      </Router>
      <Portal />
    </>
  );
}

export default App;
