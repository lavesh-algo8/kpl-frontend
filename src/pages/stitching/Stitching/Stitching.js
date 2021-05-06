import React from "react";
import { StitchingProvider } from "../../../context/StitchingContext";
import Home from "../Home/Home";
import {LayoutView} from '../layoutView/LayoutView';
import {ViewDetails} from '../layoutView/viewDetails/viewDetails';
import Setting from "../setting/Setting";
import VideoWall from "../videoWall/VideoWall";
import ViolationDetails from "../violationDetails/ViolationDetails";
import ViolationLog from "../violationLog/ViolationLog";
import YourData from "../yourData/YourData";
import Navigation from "./Navigation";
import {Annotation} from '../layoutView/annotation/Annotations';

function Stitching(props) {
  const pages = {
    home: <Home />,
    violationLog: <ViolationLog />,
    videoWall: <VideoWall />,
    setting: <Setting />,
    viewdetails: <ViewDetails/>,
    layoutView: <LayoutView />,
    annotation: <Annotation />,
    yourData: <YourData />,
    violationDetails: <ViolationDetails id={props.match.params.id} />,
  };

  const page = pages[props.match.params.page];
  return (
    <>
      {/* <StitchingProvider> */}
      <Navigation />
      {page}
      {/* </StitchingProvider> */}
    </>
  );
}

export default Stitching;
