import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { Portal } from 'mobx-portals';
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Stitching from "./pages/stitching/Stitching/Stitching";
import { KPLContext } from "./context/ViolationContext";
import AuthRoute from "./Auth/AuthRoute";
import Checking from "./pages/checking/Checking/Checking";
import {ViewDetails} from './pages/stitching/layoutView/viewDetails/viewDetails';

function App(props) {
  const { state, dispatch } = useContext(KPLContext);
  useEffect(() => {
    const ROLE = localStorage.getItem("ROLE");
    ROLE && dispatch({ type: "ADD_ROLE", payload: ROLE });

    const DESIGNATION = localStorage.getItem("DESIGNATION");
    DESIGNATION && dispatch({ type: "ADD_DESIGNATION", payload: DESIGNATION });

    const PROFILE = localStorage.getItem("PROFILE");
    PROFILE && dispatch({ type: "ADD_PROFILE", payload: JSON.parse(PROFILE) });
  }, []);
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <AuthRoute exact path="/menu" component={Menu} />
        <AuthRoute exact path="/stitching/:page" component={Stitching} />
        <AuthRoute exact path="/stitching/:page/:id" component={Stitching} />
        <AuthRoute exact path="/checking/:page" component={Checking} />
        <AuthRoute exact path="/checking/:page/:id" component={Checking} />
        <AuthRoute path='/viewdetails/:cameraid' component={ViewDetails} />
        <Redirect from="/stitching" to="/stitching/home" />
        <Redirect from="/checking" to="/checking/home" />
      </Switch>
    </Router>
     <Portal />
     </>
  );
}

export default App;
